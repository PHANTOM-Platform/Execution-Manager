#!/bin/bash
#Author: J.M. Montañana 2019

#1-first we COMPILE the Java client files
	if [ -e demo_websocket_execmanager ]; then
		rm -fr demo_websocket_execmanager;
	fi;
	if [ ! -d demo_websocket_execmanager ]; then
		mkdir demo_websocket_execmanager;
	fi;
	javac -classpath org.json.jar:java_websocket.jar:. ws_susc_execmanager.java -d .;

#2-RUN a client 'alice' to be suscribed, on second terminal
	java -classpath org.json.jar:apache-httpcomponents-httpcore.jar:java_websocket.jar:.  demo_websocket_execmanager/ws_susc_execmanager
