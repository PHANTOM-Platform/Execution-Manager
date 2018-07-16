#!/bin/bash
	SERVER_DIR=~/phantom_servers/;
	BASE_DIR=`pwd`;
	TMP_DIR=${SERVER_DIR}/tmp;
	DIST_DIR=${SERVER_DIR}/dist;
app=`basename $0`;
cd `dirname $0`;
cd server_code;
echo "> node";
if [ -f "${TMP_DIR}/execmanager.pid" ]; then
    PID=$(cat ${TMP_DIR}/execmanager.pid)
    kill ${PID}
    rm -f execmanager.pid;
else
    echo "Couldn't find PID associated with node process.";
    echo "Please kill the service manually.";
fi;
echo -e "Done.\n";
