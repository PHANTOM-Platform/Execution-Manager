// Author: J.M.Montañana HLRS 2018
// If you find any bug, please notify to hpcjmont@hlrs.de
// 
// Copyright (C) 2018 University of Stuttgart
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
// http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

const CommonModule 	= require('./support-common');

function getType(p) {
	if (Array.isArray(p)) return 'array';
	else if (typeof p == 'string') return 'string';
	else if (p != null && typeof p == 'object') return 'object';
	else return 'other';
}


function pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}


function calculate_date( input) {
	var current = input;
	current = Math.floor(current /1000000);
	var tempstr="";
	var months=[31, 28, 31, 30, 31, 30, 31, 31, 30 ,31 ,30 ,31 ];
	var exampledate_msec =Math.floor(current % 1000);
	current= Math.floor(current /1000);
	var exampledate_sec = Math.floor(current %60);
	current =Math.floor(current / 60);
	var exampledate_min = Math.floor(current % 60);
	current = Math.floor(current /60);
	var exampledate_hour = Math.floor(current %24);
	current = Math.floor(current /24);
	var exampledate_year=0;
// 	var exampledate_name_day = current % 7;
	if(current > 365+365+366){
		exampledate_year=3;
		current -= (365+365+366);
	}
	if(current > 1461){
		exampledate_year+=(4*Math.floor(current / 1461));
		current = Math.floor(current % 1461);
	}
	exampledate_year+=Math.floor(current / 365);
	current = Math.floor(current % 365);
	var leap_year;
	if (exampledate_year %4==2){
		leap_year=1;
	}else{
		leap_year=0;
	}
	if (leap_year==1) months[1]=29;
	var exampledate_month=0;
	while(current> months[exampledate_month]){
		current -= months[exampledate_month];
		exampledate_month++;
	}
	exampledate_year= 1970+ Math.floor(exampledate_year);
	var exampledate_day= 1+ current;
	exampledate_month=1+exampledate_month;
	tempstr=exampledate_year+"-"+pad(exampledate_month,2)+"-"+pad(exampledate_day,2)+"T"+pad(exampledate_hour,2)+":"+pad(exampledate_min,2)+":"+pad(exampledate_sec,2)+"."+pad(exampledate_msec,2);
	return tempstr;
}


function debugjson(jsonobj) {
	var keys = Object.keys(jsonobj); 
	var i=0;
	while (i < keys.length) {
		console.log("  #" +i+" LABEL " +Object.getOwnPropertyNames(jsonobj)[i] + " VALUE ");
		var value=jsonobj[keys[i]];
		if (getType(value) == "string" || getType(jsonobj[keys[i]]) == "other"){
			console.log(value+"\n");
		}else if (getType(value) == "array" ) {
			//may something to do
			console.log("ARRAY\n");
		}else if (getType(value) == "object" ) {
			var jsonobj_b = jsonobj[keys[i]];
			var keys_b = Object.keys(jsonobj_b);
			var i_b=0;
			while (i_b < keys_b.length) {
				var mylabel=Object.getOwnPropertyNames(jsonobj_b)[i_b];
				var myvalue_b=jsonobj_b[keys_b[i_b]];  
				if( mylabel !=null){
					if (getType(myvalue_b) == "string" || getType(myvalue_b) == "other" ){
// 						if( mylabel.localeCompare(label)==0 ){
							console.log("\t\t"+mylabel+" : "+myvalue_b+"");
// 						}
					}else if (getType(myvalue_b) == "array" ) {
						//may something to do
						console.log("\t\t"+mylabel+" : "+"ARRAY");
						var jsonobj_f =  jsonobj_b[keys_b[i_b]];  
						var keys_f = Object.keys(jsonobj_f);
						var i_f=0;
						while (i_f < keys_f.length) {
							var mylabel_f=Object.getOwnPropertyNames(jsonobj_f)[i_f];
							var myvalue_f=jsonobj_f[keys_f[i_f]];
// 								if( mylabel !=null){
								if (getType(myvalue_f) == "string" || getType(myvalue_f) == "other" ){
			// 						if( mylabel.localeCompare(label)==0 ){
										console.log("\t\t\t"+mylabel_f+" : "+myvalue_f+"");
			// 						}
								}else if (getType(myvalue_f) == "array" ) {
									//may something to do
									console.log("\t\t\t"+mylabel_f+" : "+"ARRAY3");
								}else if (getType(myvalue_f) == "object" ) {
									console.log("\t\t\t"+mylabel_f+" : "+"object3");
									var jsonobj_z =  jsonobj_f[keys_f[i_f]];  
									var keys_z = Object.keys(jsonobj_z);
									var i_z=0;
									while (i_z < keys_z.length) {
										var mylabel_z=Object.getOwnPropertyNames(jsonobj_z)[i_z];
										var myvalue_z=jsonobj_z[keys_z[i_z]];
// 										if( mylabel !=null){
											if (getType(myvalue_z) == "string" || getType(myvalue_z) == "other" ){
						// 						if( mylabel.localeCompare(label)==0 ){
													console.log("\t\t\t\t"+mylabel_z+" : "+myvalue_z+"");
						// 						}
											}else if (getType(myvalue_z) == "array" ) {
												//may something to do
												console.log("\t\t\t\t"+mylabel_z+" : "+"ARRAY4");
											}else if (getType(myvalue_z) == "object" ) {
												console.log("\t\t\t\t"+mylabel_z+" : "+"object4");
											};
// 										};
										i_z++;
									};
								};
// 								};
							i_f++;
						};
					}else if (getType(myvalue_b) == "object" ) {
						console.log("\t\t"+mylabel+" : ");
						var jsonobj_c =  jsonobj_b[keys_b[i_b]];
						var keys_c = Object.keys(jsonobj_c);
						var i_c=0;
						while (i_c < keys_c.length) {
							var mylabel_c=Object.getOwnPropertyNames(jsonobj_c)[i_c];
							var myvalue_c=jsonobj_c[keys_c[i_c]];
							if( mylabel_c !=null){
								if (getType(myvalue_c) == "string" || getType(myvalue_c) == "other" ){
			// 						if( mylabel.localeCompare(label)==0 ){
										console.log("\t\t\t"+mylabel_c+" : "+myvalue_c+"");
			// 						}
								}else if (getType(myvalue_c) == "array" ) {
									//may something to do
									console.log("\t\t\t"+mylabel_c+" : "+"ARRAY2");
								}else if (getType(myvalue_c) == "object" ) {
									console.log("\t\t\t"+mylabel_c+" : "+"object2");
								};
							};
							i_c++;
						};
					};
				};
				i_b++;
			};
		}
		i++;
	}
}


module.exports = {
compose_query: function(app){
	var mquery=undefined;
	if(app != undefined)
	if(app.length > 0){
		mquery=[{"match_phrase":{"app":app}},{"term":{"app_length":app.length}}];
	}
	if(mquery!=undefined ){
		mquery={"query":{"bool":{"must": mquery }}};
	}else{
		mquery={"query":{"match_all": {} }, "sort": { "app": { "order": "asc" }}};
	}
	return mquery;
},
compose_query_id: function(id_string){
	var mquery;
	if(id_string != undefined) {
		mquery={"query":{"match":{"_id":id_string}}};
	}else{ 
		mquery={"query":{"match_all": {} }, "sort": { "app": { "order": "asc" }}};
	}
	return mquery;
},
register_json: function(es_server, my_index, body, remoteAddress, my_type) {
	return new Promise((resolve,reject) => {
		var size=0;
		var elasticsearch = require('elasticsearch');
		var client = new elasticsearch.Client({
			host: es_server,
			log: 'error'
		});
		var myres = { code: "", text: "" };
		client.index({
			index: my_index,
			type: my_type,
			body: body // contains the json
		}, function(error, response){
			if(error){
				myres.code="400";
				myres.text="Could not register the json."+error;
				reject (myres);
			}else if(!error){
				var verify_flush = CommonModule.my_flush(remoteAddress ,es_server, my_index);
				verify_flush.then((resolve_result) => {
					myres.code="200";
					myres.text=JSON.stringify(response);
					resolve(myres);
				},(reject_result)=> {
					myres.code=reject_result.code;
					myres.text=reject_result.text+JSON.stringify(response);
					reject(myres);
				});
			}
		});
	});
}, //end register_json
//****************************************************
//This function is used to confirm that a app exists or not in the DataBase.
//We first counted if existence is >0
find_exec: function(es_server, my_index, app, pretty){
	const my_type = 'executions_status';
	return new Promise( (resolve,reject) => {
		var elasticsearch = require('elasticsearch');
		var client = new elasticsearch.Client({
			host: es_server,
			log: 'error'
		});
		if(app==undefined){
			resolve({});
		}else if(app.length==0){
			client.search({
				index: my_index,
				type: my_type,
				size: 10000,
				body:{"query":{"match_all": {} }}
			}, function(error, response) {
				if(error){
					reject("search error: "+error)
				}else {
					var result="";
					var keys = Object.keys(response.hits.hits);
					keys.forEach(function(key) {
						item = JSON.parse(JSON.stringify(response.hits.hits[key]._source));
						if(result!=""){
							result+=",";
						}
						if((pretty=="true")||(pretty=="TRUE")){
							result+=" "+(JSON.stringify(item, null, 4));
						}else{
							result+=" "+(JSON.stringify(item));
						}
					});
				};
				resolve("{\"hits\" :["+result+"]}");
			});
		}else{
			client.search({
				index: my_index,
				type: my_type,
				body: {
					"query":{"bool":{"must":[
						{"match_phrase":{"app": app }}, {"term":{"app_length": app.length}}
					]}}
				}
			}, function(error, response) {
				if(error) {
					reject ("error: "+error);
				}else{
					item = JSON.parse(JSON.stringify(response.hits.hits[0]._source));
					if((pretty=="true")||(pretty=="TRUE")){
						resolve(" "+(JSON.stringify(item, null, 4)));
					}else{
						resolve(" "+(JSON.stringify(item)));
					}
				}
			});
		}
	});
},
//***************************************************
register_exec_json: function(es_server, my_index, body, remoteAddress) {
	const my_type = 'executions_status';
	return new Promise((resolve,reject) => {
		var result = this.register_json (es_server, my_index, body, remoteAddress, my_type);
		result.then((resultResolve) => {
			resolve (resultResolve); //the result is a string which consists on the _id of the execution
		},(resultReject)=> {
			reject (resultReject);
		});
	});
}, //end register_exec_json 
//***************************************************
//This function is used to confirm that a app exists or not in the DataBase.
//We first counted if existence is >0
find_exec_id_from_appname: function(es_server, my_index, app){
	const my_type = 'executions_status';
	return new Promise( (resolve,reject) => {
		var elasticsearch = require('elasticsearch');
		var client = new elasticsearch.Client({
			host: es_server,
			log: 'error'
		});
		client.search({
			index: my_index,
			type: my_type,
			body: {
				"query":{"bool":{"must":[
					{"match_phrase":{"app": app }}, {"term":{"app_length": app.length}}
				]}}
			}
		}, function(error, response) {
			if(error) {
				reject ("error: "+error);
			}else{
				resolve (CommonModule.remove_quotation_marks(JSON.stringify(response.hits.hits[0]._id)));
			}
		});
	});
},//find_exec_id_from_appname

//****************************************************
//This function is used to confirm that an user exists or not in the DataBase.
get_user_defined_metrics: function(es_server, appid, taskid, experimentid){
	const my_index = appid+'_'+ taskid;
	return new Promise( (resolve,reject) => {
		var elasticsearch = require('elasticsearch');
		var client = new elasticsearch.Client({
			host: es_server,
			log: 'error'
		});
		client.search({
			index: my_index,
			body: {
				"query": {
					"terms": {
						"type" : ["user_defined"]
					}
				} 
			}
		}, function(error, response) {
			if(error) {
				reject ("error"+error+"\n for index "+my_index);
			}
			if(response !== undefined) {
				resolve(JSON.stringify( response.hits, null, 4));
			}else{
				resolve ("unexpected error, for index "+my_index);//size
			}
		});
	});
}, //end get_user_defined_metrics
//****************************************************
//This function is used to confirm that an user exists or not in the DataBase.
get_component_timing: function(es_server, appid, taskid, experimentid){
	const my_index = appid+'_'+ taskid;
	return new Promise( (resolve,reject) => {
		var elasticsearch = require('elasticsearch');
		var client = new elasticsearch.Client({
			host: es_server,
			log: 'error'
		});
		client.search({
			index: my_index,
			body: {
				"query": {
					"exists" : { "field" : "component_duration" }
				}
			}
		}, function(error, response) {
			if(error) {
				reject ("error"+error+"\n for index "+my_index);
			}
			if(response !== undefined) {
				resolve(JSON.stringify( response.hits, null, 4));
			}else{
				resolve ("unexpected error, for index "+my_index);//size
			}
		});
	});
}, //end get_component_timing
//****************************************************
//This function is used to confirm that an user exists or not in the DataBase.

get_all_stats: function(es_server, exec_id){ //"AWmwAaLAZpi43u_W9jze"
	const my_index = "exec_manager_db";
	const my_type = "executions_status";
	return new Promise( (resolve,reject) => {
		var elasticsearch = require('elasticsearch');
		var client = new elasticsearch.Client({
			host: es_server,
			log: 'error'
		});

		client.search({
			index: my_index,
			type: my_type,
			body: { "query":{"bool":{"must": [
					{"match_phrase":{"execution_id" : exec_id }} 
					]}},
					"size":30
				}
		}, function(error, response) {
			if(error) {
				reject ("error"+error+"\n for index "+my_index);
			}
			if(response !== undefined) {
				var total=response.hits.total;

	var jsonobj=response.hits.hits.map(hit => hit._source);
	var super_new_stats={};
	var keys = Object.keys(jsonobj);
	var max_end_time;
	var min_start_time;
	
	var count_reports=keys.length;// num_of_processes
	
	var tempstr="";
	var i=0;
	while (i < keys.length) {
// 		console.log("  #" +i+" LABEL " +Object.getOwnPropertyNames(jsonobj)[i] + " VALUE ");
		var value=jsonobj[keys[i]];
		if (getType(value) == "object" ) {
			var jsonobj_b = jsonobj[keys[i]];
			var keys_b = Object.keys(jsonobj_b);
			var i_b=0;
			while (i_b < keys_b.length) {
				var mylabel=Object.getOwnPropertyNames(jsonobj_b)[i_b];
				var myvalue_b=jsonobj_b[keys_b[i_b]];  
				if( mylabel !=null){
					if (getType(myvalue_b) == "string" || getType(myvalue_b) == "other" ){
// 						console.log("\t\t"+mylabel+" : "+myvalue_b+"");
						if((mylabel=="start_timestamp")||(mylabel=="start_timestamp_length")||(mylabel=="end_timestamp")
							||(mylabel=="end_timestamp_length") ||(mylabel=="total_time_ns") ||(mylabel=="total_time_length")
							||(mylabel=="start_timestamp_ns_length") ||(mylabel=="end_timestamp_ns_length")
						){
							// do nothing, we will generate new ones later, based on the largest interval
						}else if((mylabel=="start_timestamp_ns")){
							if(i==0){
								min_start_time=parseInt(myvalue_b);
							}else if( min_start_time <parseInt(myvalue_b)){
								min_start_time=parseInt(myvalue_b);
							}
							
							tempstr=calculate_date((min_start_time));
							super_new_stats['start_timestamp']=tempstr;
							super_new_stats[mylabel]=min_start_time;
							
							if(max_end_time!=undefined)
							if(max_end_time>min_start_time)
							super_new_stats['total_time_ns']=max_end_time-min_start_time;
							
						}else if ((mylabel=="end_timestamp_ns") ){

							if(i==0){
								max_end_time=parseInt(myvalue_b);
							}else if( max_end_time >parseInt(myvalue_b)){
								max_end_time=parseInt(myvalue_b);
							}
							tempstr=calculate_date((max_end_time));
							super_new_stats['end_timestamp']=tempstr;
							super_new_stats[mylabel]=max_end_time;
							if(min_start_time!=undefined)
							if(max_end_time>min_start_time)
							super_new_stats['total_time_ns']=max_end_time-min_start_time;
							
						}else if((mylabel=="energy")||(mylabel=="cpu_power_consumption")||(mylabel=="io_power_consumption")
							||(mylabel=="mem_power_consumption")||(mylabel=="net_power_consumption")
						){
							if(super_new_stats[mylabel]!=undefined){
								super_new_stats[mylabel]=parseFloat(super_new_stats[mylabel])+parseFloat(myvalue_b);
							}else{
								super_new_stats[mylabel]=myvalue_b;
							}
						}else if((mylabel!="energy_length")&&(mylabel!="cpu_power_consumption_length")&&(mylabel!="io_power_consumption_length")
							&&(mylabel!="mem_power_consumption_length")&&(mylabel!="net_power_consumption")
						){
							super_new_stats[mylabel]=myvalue_b;
						}
							
						super_new_stats['count_reports']=count_reports;
							
							
// 					}else if (getType(myvalue_b) == "array" ) {
// 						console.log("\t\t"+mylabel+" : "+"ARRAY1");
// 						var jsonobj_f =  jsonobj_b[keys_b[i_b]];  
// 						var keys_f = Object.keys(jsonobj_f);
// 						var i_f=0;
// 						var component_stats=[];
// 						while (i_f < keys_f.length) {
// 							var mylabel_f=Object.getOwnPropertyNames(jsonobj_f)[i_f];
// 							var myvalue_f=jsonobj_f[keys_f[i_f]];
// 							if (getType(myvalue_f) == "string" || getType(myvalue_f) == "other" ){
// 								console.log("\t\t\t"+mylabel_f+" : "+myvalue_f+"");
// 							}else if (getType(myvalue_f) == "object" ) {
// 								console.log("\t\t\t"+mylabel_f+" : "+"object3");
// 								var component_stats={};
// 								var jsonobj_z =  jsonobj_f[keys_f[i_f]];  
// 								var keys_z = Object.keys(jsonobj_z);
// 								var i_z=0;
// 								while (i_z < keys_z.length) {
// 									var mylabel_z=Object.getOwnPropertyNames(jsonobj_z)[i_z];
// 									var myvalue_z=jsonobj_z[keys_z[i_z]];
// 									if (getType(myvalue_z) == "string" || getType(myvalue_z) == "other" ){
// 										console.log("\t\t\t\t"+mylabel_z+" : "+myvalue_z+"");
// 										component_stats[mylabel_z]=  myvalue_z;
// 									}else if (getType(myvalue_z) == "object" ) {
// 										console.log("\t\t\t\t"+mylabel_z+" : "+"object4");
// 										var new_object={};
// 										var jsonobj_rs =  jsonobj_z[keys_z[i_z]];  
// 										var keys_rs = Object.keys(jsonobj_rs);
// 										var i_rs=0;
// 										while (i_rs < keys_rs.length) {
// 											var mylabel_rs=Object.getOwnPropertyNames(jsonobj_rs)[i_rs];
// 											var myvalue_rs=jsonobj_rs[keys_rs[i_rs]];
// 											if (getType(myvalue_rs) == "string" || getType(myvalue_rs) == "other" ){
// 												console.log("\t\t\t\t\t"+mylabel_rs+" : "+myvalue_rs+"");
// 												new_object[mylabel_rs]=myvalue_rs;
// 											}else if (getType(myvalue_rs) == "array" ) {
// 												console.log("\t\t\t\t\y"+mylabel_rs+" : "+"ARRAY5");
// 											}else if (getType(myvalue_z) == "object" ) {
// 												console.log("\t\t\t\t\t"+mylabel_z+" : "+"object5");
// 											};
// 											i_rs++;
// 										};
// 										component_stats[mylabel_z]= new_object;
// 									};
// 									i_z++;
// 								};
// 								super_new_stats['component_stats'].push( component_stats);
// 							};
// 							i_f++;
// 						};
					};
				};
				i_b++;
			};
		}
		i++;
	}
	
	
	
//divided in two parts because we wish the component_stats appear at the end of the json
	super_new_stats['component_stats']=[];
	var i=0;
	while (i < keys.length) {
		var value=jsonobj[keys[i]];
		if (getType(value) == "object") {
			var jsonobj_b = jsonobj[keys[i]];
			var keys_b = Object.keys(jsonobj_b);
			var i_b=0;
			while (i_b < keys_b.length) {
				var mylabel=Object.getOwnPropertyNames(jsonobj_b)[i_b];
				var myvalue_b=jsonobj_b[keys_b[i_b]];  
				if( mylabel !=null){
					if (getType(myvalue_b) == "string" || getType(myvalue_b) == "other" ){
// 						console.log("\t\t"+mylabel+" : "+myvalue_b+"");
// 						super_new_stats[mylabel]=myvalue_b;
					}else if (getType(myvalue_b) == "array" ) {
// 						console.log("\t\t"+mylabel+" : "+"ARRAY1");
						var jsonobj_f =  jsonobj_b[keys_b[i_b]];  
						var keys_f = Object.keys(jsonobj_f);
						var i_f=0;
						var component_stats=[];
						while (i_f < keys_f.length) {
							var mylabel_f=Object.getOwnPropertyNames(jsonobj_f)[i_f];
							var myvalue_f=jsonobj_f[keys_f[i_f]];
							if (getType(myvalue_f) == "string" || getType(myvalue_f) == "other" ){
// 								console.log("\t\t\t"+mylabel_f+" : "+myvalue_f+"");
							}else if (getType(myvalue_f) == "object" ) {
// 								console.log("\t\t\t"+mylabel_f+" : "+"object3");
								var component_stats={};
								var jsonobj_z =  jsonobj_f[keys_f[i_f]];  
								var keys_z = Object.keys(jsonobj_z);
								var i_z=0;
								while (i_z < keys_z.length) {
									var mylabel_z=Object.getOwnPropertyNames(jsonobj_z)[i_z];
									var myvalue_z=jsonobj_z[keys_z[i_z]];
									if (getType(myvalue_z) == "string" || getType(myvalue_z) == "other" ){
// 										console.log("\t\t\t\t"+mylabel_z+" : "+myvalue_z+"");
										component_stats[mylabel_z]=  myvalue_z;
									}else if (getType(myvalue_z) == "object" ) {
// 										console.log("\t\t\t\t"+mylabel_z+" : "+"object4");
										var new_object={};
										var jsonobj_rs =  jsonobj_z[keys_z[i_z]];  
										var keys_rs = Object.keys(jsonobj_rs);
										var i_rs=0;
										while (i_rs < keys_rs.length) {
											var mylabel_rs=Object.getOwnPropertyNames(jsonobj_rs)[i_rs];
											var myvalue_rs=jsonobj_rs[keys_rs[i_rs]];
											if (getType(myvalue_rs) == "string" || getType(myvalue_rs) == "other" ){
// 												console.log("\t\t\t\t\t"+mylabel_rs+" : "+myvalue_rs+"");
												new_object[mylabel_rs]=myvalue_rs;
// 											}else if (getType(myvalue_rs) == "array" ) {
// 												console.log("\t\t\t\t\y"+mylabel_rs+" : "+"ARRAY5");
// 											}else if (getType(myvalue_z) == "object" ) {
// 												console.log("\t\t\t\t\t"+mylabel_z+" : "+"object5");
											};
											i_rs++;
										};
										component_stats[mylabel_z]= new_object;
									};
									i_z++;
								};
								super_new_stats['component_stats'].push( component_stats);
							};
							i_f++;
						};
					};
				};
				i_b++;
			};
		}
		i++;
	}

// 				resolve(JSON.stringify(response.hits.hits, null, 4));
				resolve(JSON.stringify(super_new_stats, null, 4));
			}else{
				resolve ("unexpected error, for index "+my_index);//size
			}
		});
	});
}, //end get_all_stats

//****************************************************
//This function is used to confirm that an user exists or not in the DataBase.
get_exp_stats: function(es_server, appid, taskid, experimentid){
	const my_index = appid+'_'+ taskid;
	const my_type = experimentid;
	return new Promise( (resolve,reject) => {
		var elasticsearch = require('elasticsearch');
		var client = new elasticsearch.Client({
			host: es_server,
			log: 'error'
		});
		client.search({
			index: my_index,
			body: {
				"query": {
					"terms": {
						"_type": [my_type ]
					}
				},
				"aggs": {
					"cpu_load_average": {
					"avg": {
						"field": "CPU_usage_rate"
					} },
					"cpu_load_count": {
					"value_count": {
						"field": "CPU_usage_rate"
					} },
					"cpu_load_max": {
					"max": {
						"field": "CPU_usage_rate"
					} },
					"cpu_load_min": {
					"min": {
						"field": "CPU_usage_rate"
					} },
					"RAM_load_average": {
					"avg": {
						"field": "RAM_usage_rate"
					} },
					"swap_load_average": {
					"avg": {
						"field": "swap_usage_rate"
					} },
					"disk_read_average": {
					"avg": {
						"field": "disk_read"
					} },
					"average_disk_write": {
					"avg": {
						"field": "disk_write"
					} },
					"disk_throughput_average": {
					"avg": {
						"field": "disk_throughput"
					} },
					"example_of_undefined_value": {
					"avg": {
						"field": "undefined"
					} }
				},
				"size": 0
			}
		}, function(error, response) {
			if(error){
				reject("error"+error+"\n for index "+my_index);
			}
			if(response !== undefined) {
				resolve(JSON.stringify(response.aggregations, null, 4));
			}else{
				resolve("unexpected error, for index "+my_index);//size
			}
		});
	});
}, //end get_exp_stats

//****************************************************
//This function is used to confirm that an user exists or not in the DataBase.
count_exp_metrics: function(es_server, appid, taskid, experimentid){
	const my_index = appid+'_'+ taskid;
	return new Promise( (resolve,reject) => {
		var elasticsearch = require('elasticsearch');
		var client = new elasticsearch.Client({
			host: es_server,
			log: 'error'
		});
		client.search({
			index: my_index,
			body: {
				"aggs": {
					"typesAgg": {
						"terms": {
							"field": "_type",
							"size": 200
				}	},
				"count":{
					"cardinality": {
					"field": "_type"
					}
				}
				},
				"size": 0
			}
		}, function(error, response) {
			if(error) {
				reject ("error"+error+"\n for index "+my_index);
			}
			if(response !== undefined) {
				resolve(JSON.stringify( response.aggregations.count.value, null, 4));
			}else{
				resolve ("unexpected error, for index "+my_index);//size
			}
		});
	});
}, //end count_exp_metrics
//****************************************************

//This function is used to confirm that an user exists or not in the DataBase.
count_search_agg_id: function(es_server, appid, taskid){
	const my_index = appid+'_'+ taskid;
	return new Promise( (resolve,reject) => {
		var elasticsearch = require('elasticsearch');
		var client = new elasticsearch.Client({
			host: es_server,
			log: 'error'
		});
		client.search({
			index: my_index,
			body: {
				"aggs": {
					"typesAgg": {
						"terms": {
							"field": "_type",
							"size": 200
				}	},
				"count":{
					"cardinality": {
					"field": "_type"
					}
				}
				},
				"size": 0
			}
		}, function(error, response) {
			if(error) {
				reject ("error"+error+"\n for index "+my_index);
			}
			if(response !== undefined) {
				resolve(JSON.stringify( response.aggregations.count.value, null, 4));
			}else{
				resolve ("unexpected error, for index "+my_index);//size
			}
		});
	});
}, //end count_search_agg_id
//****************************************************
//This function is used to confirm that an user exists or not in the DataBase.
query_search_agg_id: function(es_server, appid, exec_id){
	const my_index = appid+'_'+ exec_id;
	return new Promise( (resolve,reject) => {
		var elasticsearch = require('elasticsearch');
		var client = new elasticsearch.Client({
			host: es_server,
			log: 'error'
		});
		client.search({
			index: my_index,
			body: {
				"aggs": {
					"typesAgg": {
						"terms": {
							"field": "_type",
							"size": 200
				}	}	},
				"size": 0
			}
		}, function(error, response) {
			if(error) {
				reject ("error"+error+"\n for index "+my_index);
			}
			if(response !== undefined) {
				resolve(JSON.stringify(response.aggregations.typesAgg.buckets, null, 4));
			}else{
				resolve ("unexpected error, for index "+my_index);//size
			}
		});
	});
}, //end query_search_agg_id
// ----------------------------------------
count_search_pending_execs: function(es_server, project){
	const my_index = "exec_manager_db";
	const my_type = "executions_status";
	return new Promise( (resolve,reject) => {
		var elasticsearch = require('elasticsearch');
		var mytype_exec="pending";
		var client = new elasticsearch.Client({
			host: es_server,
			log: 'error'
		});
		if(project!=undefined){
		client.search({
			index: my_index,
			type: my_type,
			body: { "query":{"bool":{"must": [
					{"match_phrase": {"req_status":mytype_exec}}, {"term": {"req_status_length":mytype_exec.length}}, { "match_phrase": {"project":project }}
					]}},
					"size":0
				}
		}, function(error, response) {
			if(error) {
				reject ("error"+error+"\n for index "+my_index);
			}
			if(response !== undefined) {
				resolve(JSON.stringify(response.hits.total, null, 4));
			}else{
				resolve ("unexpected error, for index "+my_index);//size
			}
		});
		}else{
		client.search({
			index: my_index,
			type: my_type,
			body: { "query":{"bool":{"must": [
					{"match_phrase": {"req_status":mytype_exec}}, {"term": {"req_status_length":mytype_exec.length}}
					]}},
					"size":0
				}
		}, function(error, response) {
			if(error) {
				reject ("error"+error+"\n for index "+my_index);
			}
			if(response !== undefined) {
				resolve(JSON.stringify(response.hits.total, null, 4));
			}else{
				resolve ("unexpected error, for index "+my_index);//size
			}
		});
		}
	});
}, //count_search_pending_execs

// ----------------------------------------
query_search_older_pending_exec: function(es_server, project){
	const my_index = "exec_manager_db";
	const my_type = "executions_status";
	return new Promise( (resolve,reject) => {
		var elasticsearch = require('elasticsearch');
		var mytype_exec="pending";
		var client = new elasticsearch.Client({
			host: es_server,
			log: 'error'
		});
		if(project!=undefined){
		client.search({
			index: my_index,
			type: my_type,
			body: { "query":{"bool":{"must": [
					{"match_phrase": {"req_status":mytype_exec}}, {"term": {"req_status_length":mytype_exec.length}}, { "match_phrase": {"project":project }}
					]}},
					"sort": { "req_date": { "order": "asc" }},
					"size":1
				}
		}, function(error, response) {
			if(error) {
				reject ("error"+error+"\n for index "+my_index);
			}
			if(response !== undefined) {
				var newArray = response.hits.hits.map(function(hit) {
					return hit._source;
				});
				resolve(JSON.stringify(newArray, null, 4));
			}else{
				resolve ("unexpected error, for index "+my_index);//size
			}
		});
		}else{
		client.search({
			index: my_index,
			type: my_type,
			body: { "query":{"bool":{"must": [
					{"match_phrase": {"req_status":mytype_exec}}, {"term": {"req_status_length":mytype_exec.length}}
					]}},
					"sort": { "req_date": { "order": "asc" }},
					"size":1
				}
		}, function(error, response) {
			if(error) {
				reject ("error"+error+"\n for index "+my_index);
			}
			if(response !== undefined) {
				var newArray = response.hits.hits.map(function(hit) {
					return hit._source;
				});
				resolve(JSON.stringify(newArray, null, 4));
			}else{
				resolve ("unexpected error, for index "+my_index);//size
			}
		});
		}
	});
}, //query_search_older_pending_exec

//****************************************************
//This function is used to confirm that an user exists or not in the DataBase.
query_count_exec_doc_id: function(es_server, my_index, doc_id){
	const my_type = 'executions_status';
	return new Promise( (resolve,reject) => {
		var elasticsearch = require('elasticsearch');
		var client = new elasticsearch.Client({
			host: es_server,
			log: 'error'
		});
		if(exec_id==undefined){
			resolve(0);
		}else{
			client.count({
				index: my_index,
				type: my_type,
				body: {
					"query":{"bool":{"must":[
						{"match_phrase":{"_id": doc_id }}
					]}}
				}
			}, function(error, response){
				if(error){
					reject (error);
				}
				if(response.count !== undefined){
					resolve (response.count);//size
				}else{
					resolve (0);//size
				}
			});
		}
	});
}, //end query_count_exec_doc_id
//****************************************************
//This function is used to confirm that an user exists or not in the DataBase.
query_count_exec_app_name: function(es_server, my_index, app){
	const my_type = 'executions_status';
	return new Promise( (resolve,reject) => {
		var elasticsearch = require('elasticsearch');
		var client = new elasticsearch.Client({
			host: es_server,
			log: 'error'
		});
		if(app==undefined){
			resolve(0);
		}else if(app.length==0){
			client.count({
				index: my_index,
				type: my_type,
				body:{"query":{"match_all": {} }}
			}, function(error, response){
				if(error){
					reject(error);
				}
				if(response.count !== undefined){
					resolve(response.count);//size
				}else{
					resolve(0);//size
				}
			});
		}else{
			client.count({
				index: my_index,
				type: my_type,
				body: {
					"query":{"bool":{"must":[
						{"match_phrase":{"app": app }}, {"term":{"app_length": app.length}}
					]}}
				}
			}, function(error, response){
				if(error){
					reject (error);
				}
				if(response.count !== undefined){
					resolve (response.count);//size
				}else{
					resolve (0);//size
				}
			});
		}
	});
}, //end query_count_exec_app_name
//****************************************************
//This function is used to confirm that an user exists or not in the DataBase.
query_count_exec_exec_id: function(es_server, my_index, exec_id){
	const my_type = 'executions_status';
	return new Promise( (resolve,reject) => {
		var elasticsearch = require('elasticsearch');
		var client = new elasticsearch.Client({
			host: es_server,
			log: 'error'
		});
		if(exec_id==undefined){
			resolve(0);
		}else if(exec_id.length==0){
			client.count({
				index: my_index,
				type: my_type,
				body:{"query":{"match_all": {} }}
			}, function(error, response) {
				if(error) {
					reject (error);
				}
				if(response.count !== undefined) {
					resolve (response.count);//size
				}else{
					resolve (0);//size
				}
			});
		}else{
			client.count({
				index: my_index,
				type: my_type,
				body: {
					"query":{"bool":{"must":[
						{"match_phrase":{"_id": exec_id }}
					]}}
				}
			}, function(error, response){
				if(error){
					reject (error);
				}
				if(response.count !== undefined){
					resolve (response.count);//size
				}else{
					resolve (0);//size
				}
			});
		}
	});
}, //end query_count_exec_exec_id
//**************************************************** 
query_exec: function(es_server, my_index, bodyquery, pretty){
	const my_type = 'executions_status';
	return new Promise( (resolve,reject) => {
		var elasticsearch = require('elasticsearch');
		var client = new elasticsearch.Client({
			host: es_server,
			log: 'error'
		});
		var result="";
		var item = "";
		client.search({
			index: my_index,
			type: my_type,
			size: 10,
			body: bodyquery
		},function (error, response,status) {
			if(error){
				reject("search error: "+error)
			}else {
				var keys = Object.keys(response.hits.hits);
				keys.forEach(function(key) { 
					item = JSON.parse(JSON.stringify(response.hits.hits[key]._source));
					if(result!=""){
						result+=",";
					}
					if((pretty=="true")||(pretty=="TRUE")){
						result+=" "+(JSON.stringify(item, null, 4));
					}else{
						result+=" "+(JSON.stringify(item));
					}
				});
			};
			resolve("{\"hits\" :["+result+"]}");
		});
	});
}//end query_exec
}//end module.exports
