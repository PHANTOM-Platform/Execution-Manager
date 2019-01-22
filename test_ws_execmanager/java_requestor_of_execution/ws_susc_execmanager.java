// Author: J.M.Montañana HLRS 2018
// If you find any bug, please notify to hpcjmont@hlrs.de
// 
// Copyright (C) 2018 University of Stuttgart
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
// 	http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package demo_websocket_execmanager;

import java.net.URI;
import java.net.URISyntaxException;
import java.net.HttpURLConnection;
import java.net.URL;
import org.java_websocket.client.WebSocketClient;
import org.java_websocket.handshake.ServerHandshake;
import org.java_websocket.exceptions.WebsocketNotConnectedException;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.File;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.nio.file.Files;

public class ws_susc_execmanager extends WebSocketClient {
// FUNCTIONS FOR GET TOKEN
	public static String request_server(String serveraddress, String serverport, String table_ini) throws IOException {
		String table=table_ini.replaceAll(" ","%20");
		String retmonmetric = new String();
		String urlString = new String();
		String responsestring = new String();
		urlString = "http://"+serveraddress+":"+serverport+table;
		URL httpurl = new URL(urlString);
		HttpURLConnection c = (HttpURLConnection)httpurl.openConnection();//connecting to url
		c.setRequestProperty( "Content-type", "application/x-www-form-urlencoded");
		c.setRequestProperty( "Accept", "*/*");
		c.setRequestMethod("GET");
		BufferedReader in = new BufferedReader(new InputStreamReader(c.getInputStream()));//stream to resource
		String str;
		while ((str = in.readLine()) != null){ //reading data
			responsestring += str;//process the response and save it in some string or so
		}
		in.close();//closing stream
		c.disconnect();
		return responsestring;
	}

// FUNCTIONS FOR THE WS-SUSCRIPTIONS
	public ws_susc_execmanager( URI serverURI) {
		super(serverURI);
	}

	boolean connection_stablished =false;
	@Override
	public void onOpen( ServerHandshake handshakedata) {
		System.out.println( "opened connection");
		connection_stablished=true;
		// if you plan to refuse connection based on ip or httpfields overload: onWebsocketHandshakeReceivedAsClient
	}

	@Override
	public void onMessage( String message ) { // THIS FUNCTION WILL RUN FOR EACH RECEIVED MESSAGE
		System.out.println( "received: " + message);
	}

	@Override
	public void onClose( int code, String reason, boolean remote ) {
		// The codecodes are documented in class org.java_websocket.framing.CloseFrame
		System.out.println("Connection closed by " + ( remote ? "remote peer" : "us" ) + " Code: " + code + " Reason: " + reason);
	}

	@Override
	public void onError( Exception ex) {
		ex.printStackTrace();
		// if the error is fatal then onClose will be called additionally
	}

	public static String process_response(BufferedReader is) {
		String result ="";
		try {
			String inputLine;
			while ((inputLine = is.readLine()) != null) {
				result=result+inputLine;
			}
			is.close();
		} catch (IOException e) {
			System.out.println("IOException: " + e);
		}
		return result;
	}

	public static void main( String[] args) throws URISyntaxException {
	// GLOBAL VARIABLES AND CONSTANTS
		final String serveraddress="localhost";
		final String serverport= "8700";//execution manager
		
		final String user_id="montana@abc.com";
		final String user_pw="new";
		final String charset = "UTF-8";
		String token="";
		String exec_id="";
		String SrcJson="execstatus.json";
		File upload_json = new File(SrcJson);
		// ***** REQUEST FOR A TOKEN **************************************
		try{
			token = request_server(serveraddress, serverport, "/login?email="+user_id+"&pw="+user_pw);
		} catch (IOException e){
			e.printStackTrace();
			System.exit(1);
		}
		System.out.println("token is :"+token+"[]\n"); //it returns the string token.
		// ***** REQUEST FOR NEW EXECUTION  **************************************
		final String LINE_FEED = "\r\n";
		final String boundary = "*****";
		String requestURL = "http://"+serveraddress+":"+serverport+"/register_new_exec";
		try {
			// Open a HTTP connection to the URL
			URL url = new URL(requestURL);
			HttpURLConnection httpConn = (HttpURLConnection) url.openConnection();
			httpConn.setUseCaches(false);
			httpConn.setDoOutput(true);
			httpConn.setDoInput(true);
			httpConn.setRequestProperty("Content-Type", "multipart/form-data;boundary=" + boundary);
			httpConn.setRequestMethod("POST");
			httpConn.setRequestProperty("Authorization", "OAuth " + token);
			OutputStream outputStream = httpConn.getOutputStream();
			PrintWriter writer = new PrintWriter(new OutputStreamWriter(outputStream, charset), true);
			// Send file.
			writer.append("--" + boundary).append(LINE_FEED);
			writer.append("Content-Disposition: form-data; name=\"UploadJSON\"; filename=\"UploadJSON\"").append(LINE_FEED);
			writer.append("Content-Type: text/plain; charset=" + charset).append(LINE_FEED); //Text file itself must be saved in this charset!
			writer.append(LINE_FEED).flush();
			Files.copy(upload_json.toPath(), outputStream);
			outputStream.flush(); // Important before continuing with writer!
			writer.append(LINE_FEED).flush(); // LINE_FEED is important! It indicates end of boundary.
			// End of multipart/form-data.
			writer.append("--" + boundary + "--").append(LINE_FEED).flush();
			BufferedReader br;
			if (200 <= httpConn.getResponseCode() && httpConn.getResponseCode() <= 299) {// this range should be for accepted request
				br = new BufferedReader(new InputStreamReader(httpConn.getInputStream()));
				exec_id=process_response(br);
				System.out.println("Received execution_id: "+exec_id+"\n");
			} else { // we got error from the execution manager
				br = new BufferedReader(new InputStreamReader(httpConn.getErrorStream()));
				String response=process_response(br);
				System.out.println("ERROR: Not received execution_id, "+response);
				System.exit(2);
			}
		} catch (IOException ex) {
			System.err.println(ex);
			System.exit(3);
		}
		System.out.println("SUSCRIPTION FOR RECEPTION OF NOTIFICATIONS FROM THE EXECUTION MANAGER");
		// ***** SUSCRIPTION FOR RECEPTION OF NOTIFICATIONS FROM THE EXECUTION MANAGER
		String serverlocation = "ws://" + serveraddress + ":" + serverport + "/";
		WebSocketClient ws_client = null;
		try {
			ws_client = new ws_susc_execmanager( new URI( serverlocation )); // We create a WS connection
		} catch (URISyntaxException e) {
			e.printStackTrace();
			System.exit(4);
		}
		try {
			ws_client.connectBlocking();
		} catch (InterruptedException exc) {
			exc.printStackTrace();
			System.exit(5);
		}
		System.out.println("\nSUSCRIBE FOR CONTENTS IN EXECUTION execution_id ("+exec_id+"):");
		try {
			ws_client.send("{\"user\":\"alice@abc.com\", \"execution_id\":\""+exec_id+"\"}"); //user is for debugging purposes, it may help to find lost connections
		} catch (WebsocketNotConnectedException ex) {
			System.out.println("Websocket not connected: " + ex);
			System.exit(6);
		}
	}
}
