define({ "api": [
  {
    "type": "get",
    "url": "/_flush",
    "title": "It makes sure the data is stored in the database.",
    "version": "1.0.0",
    "name": "_flush",
    "group": "Administration",
    "permission": [
      {
        "name": "user at localhost"
      }
    ],
    "description": "<p>It makes sure the data is stored in the database, then responses from other requests executed immediately after it will return data consistent with any update done before the flush.</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -s -H \"Authorization: OAuth ${mytoken}\" -XGET http://${server}:${port}/_flush\nor alternatively use service at https when available SSL certificates.",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTPS 200 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Report error message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 400 Bad Request",
          "type": "json"
        }
      ]
    },
    "filename": "/home/jmontana/apidocs/server_code/execmanager_app.js",
    "groupTitle": "Administration"
  },
  {
    "type": "get",
    "url": "/drop_db",
    "title": "drops the database of the server",
    "version": "1.0.0",
    "name": "drop_db",
    "group": "Administration",
    "permission": [
      {
        "name": "user at localhost"
      }
    ],
    "description": "<p>Deletes completely all the information stored at the database of server, it returns error if not exists the database to drop. Its use is restricted to request from the same machine where is running the server.</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -s -H \"Authorization: OAuth ${mytoken}\" -XGET http://${server}:${port}/drop_db\nor alternatively use service at https when available SSL certificates.",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTPS 200 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Report error message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 400 Bad Request",
          "type": "json"
        }
      ]
    },
    "filename": "/home/jmontana/apidocs/server_code/execmanager_app.js",
    "groupTitle": "Administration"
  },
  {
    "type": "get",
    "url": "/get_log_list",
    "title": "get_log_list",
    "version": "1.0.0",
    "name": "get_log_list",
    "group": "Administration",
    "permission": [
      {
        "name": "user"
      }
    ],
    "description": "<p>Returns shorted registered logs, where the shorting criteria depends on the  provided &quot;sorttype&quot; parameter.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "sorttype",
            "description": "<p>Shorting criteria (OPTIONAL PARAMETER): 1: sort by id 2: sort by error code 3: sort by user 4: sort by IP address 5: sort by Message 0: sort by Date: default if not provided code</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pretty",
            "description": "<p>For tabulate the json response and make it more human readable.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -XGET http://serveraddress:server:port/get_log_list?sorttype=\"XXX\"\\&pretty=\"true\"\nor alternatively use service at https when available SSL certificates.",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response",
            "description": "<p>JSON structure</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTPS 200 OK\n{....}",
          "type": "json"
        }
      ]
    },
    "filename": "/home/jmontana/apidocs/server_code/execmanager_app.js",
    "groupTitle": "Administration"
  },
  {
    "type": "get",
    "url": "/new_db",
    "title": "Registers a new database of the server",
    "version": "1.0.0",
    "name": "new_db",
    "group": "Administration",
    "permission": [
      {
        "name": "user at localhost"
      }
    ],
    "description": "<p>Registers a new database of the server, it may return error if already exists. Its use is restricted to request from the same machine where is running the server.</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -s -H \"Authorization: OAuth ${mytoken}\" -XGET http://${server}:${port}/new_db\nor alternatively use service at https when available SSL certificates.",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTPS 200 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Report error message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 400 Bad Request",
          "type": "json"
        }
      ]
    },
    "filename": "/home/jmontana/apidocs/server_code/execmanager_app.js",
    "groupTitle": "Administration"
  },
  {
    "type": "post",
    "url": "/new_log",
    "title": "Registers a log.",
    "version": "1.0.0",
    "name": "new_log",
    "group": "Administration",
    "permission": [
      {
        "name": "user"
      }
    ],
    "description": "<p>Registers a log with the provided input parameters.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>sucecss/error HTML code of the event.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user_id",
            "description": "<p>Id of the user responsible of the event.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ip",
            "description": "<p>The ip from where the user ran the event. If not provided will store the ip from where is requested the new log.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>The description of the event.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -H \"Content-Type: text/plain\" -XPOST http://${server}:port/new_log?code=111\\&ip=\"10.11.12.13\"\\&message=\"Some description\"\\&user=\"jaja@abc.com\"\nor alternatively use service at https when available SSL certificates.",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response",
            "description": "<p>JSON structure</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTPS 200 OK\nregistered log",
          "type": "json"
        }
      ]
    },
    "filename": "/home/jmontana/apidocs/server_code/execmanager_app.js",
    "groupTitle": "Administration"
  },
  {
    "type": "post",
    "url": "/update_user",
    "title": "Update the password of an user",
    "version": "1.0.0",
    "name": "update_user",
    "group": "Administration",
    "permission": [
      {
        "name": "user"
      }
    ],
    "description": "<p>Update the password of an user</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>MANDATORY this is the user_id.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pw",
            "description": "<p>MANDATORY it is the password of the user</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -H \"Content-Type: text/plain\" -XPOST http://server:port/update_user?name=\"bob\"\\&email=\"bob@abc.commm\"\\&pw=\"1234\";\n \nor alternatively use service at https when available SSL certificates.",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTPS 200 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Response when missing mandatory parameters:",
          "content": "HTTP/1.1 400 Bad Request",
          "type": "json"
        },
        {
          "title": "Response when not valid user/password:",
          "content": "HTTP/1.1 401 Not Authenticated",
          "type": "json"
        }
      ]
    },
    "filename": "/home/jmontana/apidocs/server_code/execmanager_app.js",
    "groupTitle": "Administration"
  },
  {
    "type": "post",
    "url": "/register_new_exec",
    "title": "register_new_exec",
    "version": "1.0.0",
    "name": "register_new_exec",
    "group": "Register_Info",
    "permission": [
      {
        "name": "user"
      }
    ],
    "description": "<p>Registers a log with the provided input parameters.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "xxx",
            "description": "<p>...</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -H \"Content-Type: text/plain\" -XPOST http://${server}:port/register_new_exec\nor alternatively use service at https when available SSL certificates.",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response",
            "description": "<p>JSON structure</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTPS 200 OK\nregistered log",
          "type": "json"
        }
      ]
    },
    "filename": "/home/jmontana/apidocs/server_code/execmanager_app.js",
    "groupTitle": "Register_Info"
  },
  {
    "type": "post",
    "url": "/reject_exec",
    "title": "reject_exec",
    "version": "1.0.0",
    "name": "reject_exec",
    "group": "Register_Info",
    "permission": [
      {
        "name": "user"
      }
    ],
    "description": "<p>Registers a log with the provided input parameters.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "xxx",
            "description": "<p>...</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -H \"Content-Type: text/plain\" -XPOST http://${server}:port/reject_exec\nor alternatively use service at https when available SSL certificates.",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response",
            "description": "<p>JSON structure</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTPS 200 OK\nregistered log",
          "type": "json"
        }
      ]
    },
    "filename": "/home/jmontana/apidocs/server_code/execmanager_app.js",
    "groupTitle": "Register_Info"
  },
  {
    "type": "post",
    "url": "/started_exec",
    "title": "started_exec",
    "version": "1.0.0",
    "name": "started_exec",
    "group": "Register_Info",
    "permission": [
      {
        "name": "user"
      }
    ],
    "description": "<p>Registers a log with the provided input parameters.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "xxx",
            "description": "<p>...</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -H \"Content-Type: text/plain\" -XPOST http://${server}:port/started_exec\nor alternatively use service at https when available SSL certificates.",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response",
            "description": "<p>JSON structure</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTPS 200 OK\nregistered log",
          "type": "json"
        }
      ]
    },
    "filename": "/home/jmontana/apidocs/server_code/execmanager_app.js",
    "groupTitle": "Register_Info"
  },
  {
    "type": "post",
    "url": "/update_exec",
    "title": "update_exec",
    "version": "1.0.0",
    "name": "update_exec",
    "group": "Register_Info",
    "permission": [
      {
        "name": "user"
      }
    ],
    "description": "<p>Registers a log with the provided input parameters.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "xxx",
            "description": "<p>...</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -H \"Content-Type: text/plain\" -XPOST http://${server}:port/update_exec\nor alternatively use service at https when available SSL certificates.",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response",
            "description": "<p>JSON structure</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTPS 200 OK\nregistered log",
          "type": "json"
        }
      ]
    },
    "filename": "/home/jmontana/apidocs/server_code/execmanager_app.js",
    "groupTitle": "Register_Info"
  },
  {
    "type": "get",
    "url": "/count_executions",
    "title": "count_executions",
    "version": "1.0.0",
    "name": "count_executions",
    "group": "Retrieve_Info",
    "permission": [
      {
        "name": "user"
      }
    ],
    "description": "<p>count_executions</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "appid",
            "description": "<p>...</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "execfile",
            "description": "<p>...</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "experimentid",
            "description": "<p>...</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "taskid",
            "description": "<p>...</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -s -XGET http://${server}:${port}/count_executions?execfile=...;\nor alternatively use service at https when available SSL certificates.",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTPS 200 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequestt",
            "description": "<p>Error message .</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 400 Bad Request",
          "type": "json"
        }
      ]
    },
    "filename": "/home/jmontana/apidocs/server_code/execmanager_app.js",
    "groupTitle": "Retrieve_Info"
  },
  {
    "type": "get",
    "url": "/count_experiments_metrics",
    "title": "count_experiments_metrics",
    "version": "1.0.0",
    "name": "count_experiments_metrics",
    "group": "Retrieve_Info",
    "permission": [
      {
        "name": "user"
      }
    ],
    "description": "<p>count_experiments_metrics</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "appid",
            "description": "<p>...</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "execfile",
            "description": "<p>...</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "experimentid",
            "description": "<p>...</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "taskid",
            "description": "<p>...</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -s -XGET http://${server}:${port}/count_experiments_metrics?execfile=...;\nor alternatively use service at https when available SSL certificates.",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTPS 200 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequestt",
            "description": "<p>Error message .</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 400 Bad Request",
          "type": "json"
        }
      ]
    },
    "filename": "/home/jmontana/apidocs/server_code/execmanager_app.js",
    "groupTitle": "Retrieve_Info"
  },
  {
    "type": "get",
    "url": "/es_query_exec",
    "title": "es_query_exec.",
    "version": "1.0.0",
    "name": "es_query_exec",
    "group": "Retrieve_Info",
    "permission": [
      {
        "name": "user"
      }
    ],
    "description": "<p>Returns shorted registered logs, where the shorting criteria depends on the  provided &quot;sorttype&quot; parameter.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pretty",
            "description": "<p>For tabulate the json response and make it more human readable.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -XGET  http://serveraddress:server:port/es_query_exec?...\nor alternatively use service at https when available SSL certificates.",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response",
            "description": "<p>JSON structure</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTPS 200 OK\n{....}",
          "type": "json"
        }
      ]
    },
    "filename": "/home/jmontana/apidocs/server_code/execmanager_app.js",
    "groupTitle": "Retrieve_Info"
  },
  {
    "type": "get",
    "url": "/get_combined_json",
    "title": "get_combined_json",
    "version": "1.0.0",
    "name": "get_combined_json",
    "group": "Retrieve_Info",
    "permission": [
      {
        "name": "user"
      }
    ],
    "description": "<p>get_combined_json</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "exec_id",
            "description": "<p>...</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -s -XGET http://${server}:${port}/get_combined_json?exec_id=\"abvczsa\";\nor alternatively use service at https when available SSL certificates.",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTPS 200 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequestt",
            "description": "<p>Error message .</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 400 Bad Request",
          "type": "json"
        }
      ]
    },
    "filename": "/home/jmontana/apidocs/server_code/execmanager_app.js",
    "groupTitle": "Retrieve_Info"
  },
  {
    "type": "get",
    "url": "/get_component_timing",
    "title": "get_component_timing",
    "version": "1.0.0",
    "name": "get_component_timing",
    "group": "Retrieve_Info",
    "permission": [
      {
        "name": "user"
      }
    ],
    "description": "<p>get_component_timing</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "appid",
            "description": "<p>...</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "execfile",
            "description": "<p>...</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "experimentid",
            "description": "<p>...</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "taskid",
            "description": "<p>...</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -s -XGET http://${server}:${port}/get_component_timing?execfile=...;\nor alternatively use service at https when available SSL certificates.",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTPS 200 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequestt",
            "description": "<p>Error message .</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 400 Bad Request",
          "type": "json"
        }
      ]
    },
    "filename": "/home/jmontana/apidocs/server_code/execmanager_app.js",
    "groupTitle": "Retrieve_Info"
  },
  {
    "type": "get",
    "url": "/get_exec_list",
    "title": "get_exec_list.",
    "version": "1.0.0",
    "name": "get_exec_list",
    "group": "Retrieve_Info",
    "permission": [
      {
        "name": "user"
      }
    ],
    "description": "<p>Returns shorted registered logs, where the shorting criteria depends on the  provided &quot;sorttype&quot; parameter.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "sorttype",
            "description": "<p>Shorting criteria (OPTIONAL PARAMETER): 1: sort by id 2: sort by error code 3: sort by user 4: sort by IP address 5: sort by Message 0: sort by Date: default if not provided code</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pretty",
            "description": "<p>For tabulate the json response and make it more human readable.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -XGET  http://serveraddress:server:port/get_exec_list?sorttype=\"XXX\"\\&pretty=\"true\"\nor alternatively use service at https when available SSL certificates.",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response",
            "description": "<p>JSON structure</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTPS 200 OK\n{....}",
          "type": "json"
        }
      ]
    },
    "filename": "/home/jmontana/apidocs/server_code/execmanager_app.js",
    "groupTitle": "Retrieve_Info"
  },
  {
    "type": "get",
    "url": "/get_experiments_stats",
    "title": "get_experiments_stats",
    "version": "1.0.0",
    "name": "get_experiments_stats",
    "group": "Retrieve_Info",
    "permission": [
      {
        "name": "user"
      }
    ],
    "description": "<p>get_experiments_stats</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "appid",
            "description": "<p>...</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "execfile",
            "description": "<p>...</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "experimentid",
            "description": "<p>...</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "taskid",
            "description": "<p>...</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -s -XGET http://${server}:${port}/get_experiments_stats?execfile=...;\nor alternatively use service at https when available SSL certificates.",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTPS 200 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequestt",
            "description": "<p>Error message .</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 400 Bad Request",
          "type": "json"
        }
      ]
    },
    "filename": "/home/jmontana/apidocs/server_code/execmanager_app.js",
    "groupTitle": "Retrieve_Info"
  },
  {
    "type": "get",
    "url": "/get_user_defined_metrics",
    "title": "get_user_defined_metrics",
    "version": "1.0.0",
    "name": "get_user_defined_metrics",
    "group": "Retrieve_Info",
    "permission": [
      {
        "name": "user"
      }
    ],
    "description": "<p>get_user_defined_metrics</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "appid",
            "description": "<p>...</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "execfile",
            "description": "<p>...</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "taskid",
            "description": "<p>...</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -s -XGET http://${server}:${port}/get_user_defined_metrics?execfile=...;\nor alternatively use service at https when available SSL certificates.",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTPS 200 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequestt",
            "description": "<p>Error message .</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 400 Bad Request",
          "type": "json"
        }
      ]
    },
    "filename": "/home/jmontana/apidocs/server_code/execmanager_app.js",
    "groupTitle": "Retrieve_Info"
  },
  {
    "type": "get",
    "url": "/list_executions",
    "title": "list_executions",
    "version": "1.0.0",
    "name": "list_executions",
    "group": "Retrieve_Info",
    "permission": [
      {
        "name": "user"
      }
    ],
    "description": "<p>list_executions</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "appid",
            "description": "<p>...</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "execfile",
            "description": "<p>...</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "experimentid",
            "description": "<p>...</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "taskid",
            "description": "<p>...</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -s -XGET http://${server}:${port}/list_executions?execfile=...;\nor alternatively use service at https when available SSL certificates.",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTPS 200 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequestt",
            "description": "<p>Error message .</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 400 Bad Request",
          "type": "json"
        }
      ]
    },
    "filename": "/home/jmontana/apidocs/server_code/execmanager_app.js",
    "groupTitle": "Retrieve_Info"
  },
  {
    "type": "get",
    "url": "/older_pending_execution",
    "title": "older_pending_execution",
    "version": "1.0.0",
    "name": "older_pending_execution",
    "group": "Retrieve_Info",
    "permission": [
      {
        "name": "user"
      }
    ],
    "description": "<p>older_pending_execution</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "project",
            "description": "<p>...</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -s -XGET http://${server}:${port}/older_pending_execution?project=...;\nor alternatively use service at https when older_pending_execution SSL certificates.",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTPS 200 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequestt",
            "description": "<p>Error message .</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 400 Bad Request",
          "type": "json"
        }
      ]
    },
    "filename": "/home/jmontana/apidocs/server_code/execmanager_app.js",
    "groupTitle": "Retrieve_Info"
  },
  {
    "type": "get",
    "url": "/query_exec",
    "title": "query_exec.",
    "version": "1.0.0",
    "name": "query_exec",
    "group": "Retrieve_Info",
    "permission": [
      {
        "name": "user"
      }
    ],
    "description": "<p>Returns shorted registered logs, where the shorting criteria depends on the  provided &quot;sorttype&quot; parameter.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pretty",
            "description": "<p>For tabulate the json response and make it more human readable.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -XGET  http://serveraddress:server:port/query_exec?...\nor alternatively use service at https when available SSL certificates.",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response",
            "description": "<p>JSON structure</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTPS 200 OK\n{....}",
          "type": "json"
        }
      ]
    },
    "filename": "/home/jmontana/apidocs/server_code/execmanager_app.js",
    "groupTitle": "Retrieve_Info"
  },
  {
    "type": "post",
    "url": "/login",
    "title": "Returns a new token",
    "version": "1.0.0",
    "name": "login",
    "group": "Security",
    "permission": [
      {
        "name": "user"
      }
    ],
    "description": "<p>Returns a new encrypted token, with a limited lifetime, for the user_id if the user_id/password provided are valid.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>MANDATORY this is the user_id.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pw",
            "description": "<p>MANDATORY it is the password of the user</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -H \"Content-Type: text/plain\" -XGET http://server:port/login?email=\"bob\"\\&pw=\"1234\" --output token.txt;\n \nor alternatively use service at https when available SSL certificates.",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response",
            "description": "<p>token which consists on a encrypted text string.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTPS 200 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Response when missing mandatory parameters:",
          "content": "HTTP/1.1 400 Bad Request",
          "type": "json"
        },
        {
          "title": "Response when not valid user/password:",
          "content": "HTTP/1.1 401 Not Authenticated",
          "type": "json"
        }
      ]
    },
    "filename": "/home/jmontana/apidocs/server_code/execmanager_app.js",
    "groupTitle": "Security"
  },
  {
    "type": "get",
    "url": "/verifytoken",
    "title": "Returns if the provided Token is valid or not",
    "version": "1.0.0",
    "name": "verifytoken",
    "group": "Security",
    "permission": [
      {
        "name": "user"
      }
    ],
    "description": "<p>Verifies of the provided token is valid. Authorization Tokens are generated when user autenticates with an id and a password, the tokens are required for accessing to private content only if autenticated.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "the",
            "description": "<p>token.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -s -H \"Authorization: OAuth ${mytoken}\" -XGET http://${server}:${port}/verifytoken\nor alternatively when available SSL certificates:\ncurl -s -H \"Authorization: OAuth ${mytoken}\" -XGET https://${server}:${port}/verifytoken",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "reponse",
            "description": "<p>The token is valid !!!.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidToken",
            "description": "<p>Invalid token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 401 Not Authenticated\n  Invalid token",
          "type": "json"
        }
      ]
    },
    "filename": "/home/jmontana/apidocs/server_code/execmanager_app.js",
    "groupTitle": "Security"
  },
  {
    "type": "get",
    "url": "/verify_es_connection",
    "title": "Returns success (200) when the Server has connection or server-error(503) in other case",
    "version": "1.0.0",
    "name": "verify_es_connection",
    "group": "Testing_Functionality",
    "permission": [
      {
        "name": "user"
      }
    ],
    "description": "<p>The purpose is use for verifying the connectivity of the server with the ElasticSearch Database.</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -s -XGET http://${server}:${port}/verify_es_connection\nor alternatively use service at https when available SSL certificates.",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTPS 200 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 503 Service Unavailable",
          "type": "json"
        }
      ]
    },
    "filename": "/home/jmontana/apidocs/server_code/execmanager_app.js",
    "groupTitle": "Testing_Functionality"
  }
] });
