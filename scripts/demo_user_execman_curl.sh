#!/bin/bash
# Script demostration of the USE of the PHANTOM APP MANAGER from the command line using curl
#Author: J.M.Montañana HLRS 2018
# If you find any bug, please notify to hpcjmont@hlrs.de

# Copyright (C) 2018 University of Stuttgart
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
# http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License. 

#Warning seems that spaces in the parameters makes not get any reply from the server !!!
# Please replace such spaces by %20
#0. ########## GLOBAL VARIABLES ###################################
	BASE_DIR=`pwd`;
	server="localhost";
	execmanager_port="8700";
	app=`basename $0`;
	BLUE="\033[0;34m";
	LIGHT_GRAY="\033[0;37m";
	LIGHT_GREEN="\033[1;32m";
	LIGHT_BLUE="\033[1;34m";
	LIGHT_CYAN="\033[1;36m";
	yellow="\033[1;33m";
	WHITE="\033[1;37m";
	RED="\033[0;31m";
	marron="\033[2;33m";
	NO_COLOUR="\033[0m";
	white="\033[0;0m";
	nyellow=$'\E[1;33m';
	cyan=$'\E[36m';
	reset=$'\E[0m';
	BC=$'\e[4m'; #underline
	EC=$'\e[0m'; #not underline
	cd `dirname $0`;
#0. #### Function Scripts definition ################################
	verify_reponse()
	{
		# $1 server
		# $2 port
		echo "Checking Response on port ${2} ...";
		let "j=0";
		HTTP_STATUS=$(curl --silent --output /dev/null --write-out "%{http_code}" http://${1}:${2});
		while [[ ${HTTP_STATUS} != "200" ]] && [ ${j} -lt 1 ] ; do
			let "j += 1 "; sleep 1;
			HTTP_STATUS=$(curl --silent --output /dev/null --write-out "%{http_code}" http://${1}:${2});
		done;
		if [[ ${HTTP_STATUS} != "200" ]]; then
			echo "> Server is unreachable on port ${2}. Aborting."
			exit 1;
		fi;
		echo "Done. Response successfully found on port ${2}.";
		echo ;
	}
# 1. ################# CHECK if APP MANAGER server is running ###############
	echo "Checking Exec MANAGER server ...";
	verify_reponse ${server} ${execmanager_port};
# 2. ################## CHECK if Elasticsearch is running ###############
	echo "Checking ElasticSearch ...";
	HTTP_STATUS=$(curl -s http://${server}:${execmanager_port}/verify_es_connection);
	if [[ ${HTTP_STATUS} != "200" ]]; then
		echo "> Not Response from the ElasticSearch Server. Aborting.";
		exit 1;
	fi;
	echo "Done. Response successfully found on ElasticSearch-server address.";
# 6. ################## GET A NEW TOKEN FOR A REGISTERED USER ###################################
	echo -e "\n${LIGHT_BLUE}";
	echo "curl -s -H \"Content-Type: text/plain\" -XGET http://${server}:${execmanager_port}/login?email=\"montana@abc.com\"\&pw=\"new\" --output token.txt\"";
	read -p $'Press [Enter] key to get an authentication \033[1;37mNEW TOKEN\033[1;34m for the example user'; echo -ne "${NO_COLOUR}";
	curl -s -H "Content-Type: text/plain" -XGET http://${server}:${execmanager_port}/login?email="montana@abc.com"\&pw="new" --output token.txt;
# 7. ################## SHOW THE TOKEN IN THE SCREEN ###################################
	echo -e "\n${LIGHT_BLUE}";
	echo "mytoken=\`cat token.txt\`; echo \${mytoken}";
	read -p $'Press [Enter] key to \033[1;37mSEE\033[1;34m the received \033[1;37mTOKEN\033[1;34m'; echo -ne "${NO_COLOUR}";
	mytoken=`cat token.txt;`; echo ${mytoken};
# 8. ################## TEST IF A TOKEN IS VALID OR NOT, this is useful when we not know if the token expired ####### 
	echo -e "\n${LIGHT_BLUE}";
	echo "curl -s -H \"Authorization: OAuth \${mytoken}\" -XGET ${server}:${execmanager_port}/verifytoken";
	read -p $'Press [Enter] key to \033[1;37mCHECK\033[1;34m if the \033[1;37mTOKEN\033[1;34m is valid or not'; echo -ne "${NO_COLOUR}";
	curl -s -H "Authorization: OAuth ${mytoken}" -XGET ${server}:${execmanager_port}/verifytoken;
# 12. ################## TEST OF register new execution ######## 
	echo -e "\n${LIGHT_BLUE}";
	echo "curl -s -H \"Authorization: OAuth \${mytoken}\" -H \"Content-Type: multipart/form-data\" -XPOST -F \"UploadJSON=@../web-execmanager/execstatus.json\" http://${server}:${execmanager_port}/register_new_exec;";
	read -p $'Press [Enter] key to register_new_exec'; echo -e "${NO_COLOUR}";
	curl -s -H "Authorization: OAuth ${mytoken}" -H "Content-Type: multipart/form-data" -XPOST -F "UploadJSON=@../web-execmanager/execstatus.json" http://${server}:${execmanager_port}/register_new_exec;
	#We sync, because it may start the next command before this operation completes.
	curl -s -XGET ${server}:${execmanager_port}/_flush > /dev/null;
# 12. ################## TEST OF UPDATE a execution ########
	echo -e "\n${LIGHT_BLUE}";
	echo "curl -s -H \"Authorization: OAuth \${mytoken}\" -H \"Content-Type: multipart/form-data\" -XPOST -F \"UploadJSON=@../web-execmanager/execstatus_mod.json\" http://${server}:${execmanager_port}/update_exec;";
	read -p $'Press [Enter] key to update_exec'; echo -e "${NO_COLOUR}";
	curl -s -H "Authorization: OAuth ${mytoken}" -H "Content-Type: multipart/form-data" -XPOST -F "UploadJSON=@../web-execmanager/execstatus_mod.json" http://${server}:${execmanager_port}/update_exec;
	#We sync, because it may start the next command before this operation completes.
	curl -s -XGET ${server}:${execmanager_port}/_flush > /dev/null;
# 17. ######## TEST OF Query for a execution ######## 
	echo -e "\n${LIGHT_BLUE}";
	echo "Now only QUERY on the filepath";
	echo "curl -s -H \"Authorization: OAuth \${mytoken}\" -XGET http://${server}:${execmanager_port}/query_exec?app=\"HPC%20USE%20CASE\"";
	read -p $'Press [Enter] key to \033[1;37mRETRIEVE execution\033[1;34m with \033[1;37mVALID TOKEN\033[1;34m'; echo -e "${NO_COLOUR}" ;
	curl -s -H "Authorization: OAuth ${mytoken}" -XGET http://${server}:${execmanager_port}/query_exec?app="HPC%20USE%20CASE" ;
# 18. ################## TEST USER DEFINED QUERY ##########################
	echo -e "\n${LIGHT_BLUE}";
	echo "Now only QUERY on the filepath, we EXPLICITLY provide the query";
	echo "curl -s -H \"Authorization: OAuth \${mytoken}\" -H \"Content-Type: multipart/form-data\" -XGET http://${server}:${execmanager_port}/es_query_exec?QueryBody=\"\\{\\\"query\\\":\\{\\\"bool\\\":\\{\\\"must\\\":\\[\\{\\\"match\\\":\\{\\\"app\\\":\\\"HPC%20USE%20CASE\\\"\\}\\}\\]\\}\\}\\}\"";
	read -p $'Press [Enter] key to \033[1;37mRETRIEVE execution\033[1;34m with \033[1;37mVALID TOKEN\033[1;34m'; echo -ne "${NO_COLOUR}" ;
	curl -s -H "Authorization: OAuth ${mytoken}" -H "Content-Type: multipart/form-data" -XGET http://${server}:${execmanager_port}/es_query_exec?QueryBody="\{\"query\":\{\"bool\":\{\"must\":\[\{\"match\":\{\"app\":\"HPC%20USE%20CASE\"\}\}\]\}\}\}";

# XX. ################## TEST get_component_timing ##########################
	echo -e "\n${LIGHT_BLUE}";
	echo "TEST get_component_timing";
	echo "curl -s -H \"Authorization: OAuth ${mytoken}\" -H \"Content-Type: multipart/form-data\" -XGET http://${server}:${execmanager_port}/get_component_timing?appid=\"demo\"\\&taskid=\"pthread-example\"";
	read -p $'Press [Enter] key to \033[1;37mRUN THE REQUEST\033[1;34m with \033[1;37mVALID TOKEN\033[1;34m'; echo -e "${NO_COLOUR}" ;
	# deprecated, execfile param is replaced by taskid
	#curl -s -H "Authorization: OAuth ${mytoken}" -H "Content-Type: multipart/form-data" -XGET http://${server}:${execmanager_port}/get_component_timing?appid="demo"\&execfile="pthread-example"
	curl -s -H "Authorization: OAuth ${mytoken}" -H "Content-Type: multipart/form-data" -XGET http://${server}:${execmanager_port}/get_component_timing?appid="demo"\&taskid="pthread-example"

# XX. ################## TEST count_executions ##########################
	echo -e "\n${LIGHT_BLUE}";
	echo "TEST count_executions";
	echo "curl -s -H \"Authorization: OAuth ${mytoken}\" -H \"Content-Type: multipart/form-data\" -XGET http://${server}:${execmanager_port}/count_executions?appid=\"demo\"\\&taskid=\"pthread-example\"";
	read -p $'Press [Enter] key to \033[1;37mRUN THE REQUEST\033[1;34m with \033[1;37mVALID TOKEN\033[1;34m'; echo -e "${NO_COLOUR}" ;
	# deprecated, execfile param is replaced by taskid
	# curl -s -H "Authorization: OAuth ${mytoken}" -H "Content-Type: multipart/form-data" -XGET http://${server}:${execmanager_port}/count_executions?appid="demo"\&execfile="pthread-example"
	curl -s -H "Authorization: OAuth ${mytoken}" -H "Content-Type: multipart/form-data" -XGET http://${server}:${execmanager_port}/count_executions?appid="demo"\&taskid="pthread-example"

# XX. ################## TEST get_user_defined_metrics ##########################
	echo -e "\n${LIGHT_BLUE}";
	echo "TEST get_user_defined_metrics";
	echo "curl -s -H \"Authorization: OAuth ${mytoken}\" -H \"Content-Type: multipart/form-data\" -XGET http://${server}:${execmanager_port}/get_user_defined_metrics?appid=\"demo\"\\&taskid=\"pthread-example\"";
	read -p $'Press [Enter] key to \033[1;37mRUN THE REQUEST\033[1;34m with \033[1;37mVALID TOKEN\033[1;34m'; echo -e "${NO_COLOUR}" ;
	curl -s -H "Authorization: OAuth ${mytoken}" -H "Content-Type: multipart/form-data" -XGET http://${server}:${execmanager_port}/get_user_defined_metrics?appid="demo"\&taskid="pthread-example"

	# XX. ################## TEST get_user_defined_metrics ##########################
	echo -e "\n${LIGHT_BLUE}";
	echo "TEST get_user_defined_metrics";
	echo "curl -s -H \"Authorization: OAuth ${mytoken}\" -H \"Content-Type: multipart/form-data\" -XGET http://${server}:${execmanager_port}/get_user_defined_metrics?appid=\"demo\"\\&taskid=\"pthread-example\"";
	read -p $'Press [Enter] key to \033[1;37mRUN THE REQUEST\033[1;34m with \033[1;37mVALID TOKEN\033[1;34m'; echo -e "${NO_COLOUR}" ;
	curl -s -H "Authorization: OAuth ${mytoken}" -H "Content-Type: multipart/form-data" -XGET http://${server}:${execmanager_port}/get_user_defined_metrics?appid="demo"\&taskid="pthread-example"\&experimentid="AWU87m3quRkaX6JeceE9"

if [ -e token.txt ]; then rm token.txt; fi;
exit

Query:
curl -XGET 'localhost:9400/mf/experiments/_search?size=100&pretty="true"' -d '{"query": { "term": { "_id": "AWU87m3quRkaX6JeceE9" }}}'

update (it is merging):
curl -XPOST localhost:9400/mf/experiments/AWU87m3quRkaX6JeceE9/_update?routing="demo" -d '{
"doc":{ "domain" : "domain_gmv" } }'
}, {
	"_index" : "mf",
	"_type" : "experiments",
	"_id" : "AWU87m3quRkaX6JeceE9",
	"_score" : 1.0,
	"_routing" : "demo",
	"_parent" : "demo",
	"_source" : {
		"application" : "demo",
		"task" : "pthread-example",
		"host" : "node01",
		"@timestamp" : "2018-08-15T11:33:03.330"
	}
