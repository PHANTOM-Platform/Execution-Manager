# Example in Java of requesting the execution of an APP, and requesting to be notified of the end of the execution

## 1 Requesting for an execution

The requester must know the address of the servers:

1. **Address of the Monitoring Server**, for instance "localhost:3033"

2. **Address of the Execution Manager**, for instance "localhost:8700"

3. **Address of the Resource Manager**, for instance  "localhost:8600"

The provided example performs an http request to ***http://${exec_manager_address}:${execmanager_port}/register_new_exec***

The **Input Parameters** provided with the request are: **(1)** the authentication token, **(2)** the JSON file with the information required by the Deploy Manager.

```bash
curl -s -H "Authorization: OAuth ${mytoken}" -H "Content-Type: multipart/form-data" \
    -XPOST -F "UploadJSON=@start_exec.json" \
    http://${execmanager_address}:${execmanager_port}/register_new_exec;
```

The **Response** is:

* when succeed: a header code "**200**" and the body response contains the **execution_id**, such "AWSsuxtcSdlX_Zkd11AX".
* when error: a heade code containing the error code, and the body response contains a description of the error.

### 1.1 The authentication token

   It is mandatory to provide a **TOKEN** !!  The token is a text string, its length in the current implementation is about 162 characters.

   In the example is generated a new token from a user id, such "bob@abc.com" and password "1234".

   BUT it is expected that users will provide a token, and NOT provide their id neither their password.


### 1.2. JSON contained the requested information by the Deploy Manager

And information for the Deploy Manager in a JSON file, which at least has to contain:

   * **Identification of the application** to be requested, for instance "montanana_demo"

   * **Identification of the device** where will be run the application, for instance "node01"

It is still pending to be defined, the current structure is:

```json
{
	"app": "HPC USE CASE",
	"device": "HLRS Raspberry pi3"
}
```

## 2 Subscription for Notifications

NOTICE: Who suscribes will get ONLY notifications from the server of the NEW updates. If you suscribe later than some updates, then you will not get those corresponding notifications.

WARNING: If the websocket connection is broken, then the notifications will be lost. The subscriber needs to perform a new connection and new subscription.

NOTICE: In case of doubt if a notification is lost, the subscriber can always possible to query the status of any particular execution.

NOTICE: The Application has to be instrumented with the MF-Library in order to report of the completion to the Execution Manager.


The provided example performs:

The subscription in done by a websocket connection to ***ws://serveraddress:serverport/***

and sending a message for each subscription like ***{"user":"bob@abc.com","execution_id":"AWSsuxtcSdlX_Zkd11AX"}***
where it is identified the user and on which execution to be notified.

It can be performed as many subscriptions as wished on the same websocket connection.

### 2.1 The notification

The notification is in JSON format, it is in format like the JSON file at [example_of_notification][output].
It is responsibility of the receiver to parse the JSON data.

## 3 Running the example

After you update the appropriate paths of the servers in the java file,
you can compile and run it with the script

```bash
bash test_client_ws_suscriber_execmanager.sh;
```

The demonstratione example requires, after that, that be started the requested execution.
Please, refer to [app_to_be_executed][app]
That will allow to recieve the notitication of the completion of the requested task.

### 3.1 VIDEO

Video demo avaiblable at  [https://youtu.be/6s6AOytHV6I][video]

<a href="http://www.youtube.com/watch?feature=player_embedded&v=6s6AOytHV6I
" target="_blank"><img src="http://img.youtube.com/vi/6s6AOytHV6I/0.jpg" 
alt="IMAGE ALT TEXT HERE" width="240" height="180" border="10" /></a>


## Acknowledgment
This project is realized through [PHANTOM][phantom].
The PHANTOM project receives funding under the European Union's Horizon 2020 Research and Innovation Programme under grant agreement number 688146.


## Main Contributors
 
**Montanana, Jose Miguel, HLRS**
+ [github/jmmontanana](https://github.com/jmmontanana)
 


## Release History

| Date        | Version | Comment          |
| ----------- | ------- | ---------------- |
| 19-01-2019  | 1.01    | Current version  |

## License
Copyright (C) 2014,2019 University of Stuttgart

[Apache License v2](LICENSE).

[app]: https://github.com/PHANTOM-Platform/Execution-Manager/tree/master/test_ws_execmanager/app_to_be_executed
[output]: https://github.com/PHANTOM-Platform/testing_integration/blob/master/app_output/exec_stats.json
[video]: https://youtu.be/6s6AOytHV6I
[phantom]: http://www.phantom-project.org
