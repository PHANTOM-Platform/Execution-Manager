# DEMONSTRATION AND TESTING OF INTEGRATION OF PHANTOM TOOLS

> PHANTOM technologies enable the development of next generation heterogeneous, parallel and low-power computing systems through innovative tools that hide the complexity of computing hardware from the programme.

## Introduction

Thr purpose of the files here are for provide a description and examples of the integration and interaction between the PHANTOM tools, as well as within the users and instrumented applications.

<p align="center">
<a href="https://github.com/PHANTOM-Platform/testing_integration/blob/master/interaction_tool-em-dm-app.png">
<img src="https://github.com/PHANTOM-Platform/testing_integration/blob/master/interaction_tool-em-dm-app.png" align="middle" width="70%" height="70%" title="Schema" alt="interaction between requesting tool + Exec Manager + Deploy Manager + Application">
</a> </p>

## Downloading this example

It can be retrieved running:

```bash
git clone https://github.com/PHANTOM-Platform/testing_integration.git;
```

## Request of Execution of an instrumented Application, and suscription to nitification of its completion

In this folder there are:
* Example in Java of requesting the execution of an APP, and requesting to be notified of the execution. files are in the folder "java_requestor_of_execution" [See the files][java_app]
* Instrumented application in C, the application sends monitoring metrics to the Monitoring Framework, and at its ending the  global statistics to the Execution Manager as a notification of its completion.
The application which is instrumented with additional code for monnitoring, and reporting to the Execution Manager is on the folder "app_to_be_executed". [See the files][pi_app]
* The notification of the completion of an app consists of a JSON file, which is the same as the one send by the application to the Execution Manager whent its ends.

A video of these examples running is available at [https://youtu.be/6s6AOytHV6I][video]


<a href="http://www.youtube.com/watch?feature=player_embedded&v=6s6AOytHV6I
" target="_blank"><img src="http://img.youtube.com/vi/6s6AOytHV6I/0.jpg" 
alt="IMAGE ALT TEXT HERE" width="240" height="180" border="10" /></a>


More detailed description is available on the respective folders.

## Acknowledgment
This project is realized through [PHANTOM][phantom].
The PHANTOM project receives funding under the European Union's Horizon 2020 Research and Innovation Programme under grant agreement number 688146.

## Main Contributors
 
**Montanana, Jose Miguel, HLRS**
+ [github/jmmontanana](https://github.com/jmmontanana)
 


## Release History

| Date        | Version | Comment          |
| ----------- | ------- | ---------------- |
| 19-01-2019  | 1.01     | Current version  |

## License
Copyright (C) 2014,2019 University of Stuttgart

[Apache License v2](LICENSE).
 
[pi_outputs]: https://github.com/PHANTOM-Platform/testing_integration/tree/master/app_output
[pi_app]: https://github.com/PHANTOM-Platform/testing_integration/tree/master/app_to_be_executed
[java_app]: https://github.com/PHANTOM-Platform/testing_integration/tree/master/java_requestor_of_execution
[video]: https://youtu.be/6s6AOytHV6I
[videob]: https://youtu.be/n7GHXamoIcg
[phantom]: http://www.phantom-project.org

