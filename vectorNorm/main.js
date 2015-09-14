require('shelljs/global');

var ip   = "127.0.0.1",
    port = 1337,
    http = require('http'),
    url = require("url"),
    path = require("path");
   // fs = require("fs");

function onRequest(request, response) {
    
	// console.log(request.method);
    // console.log(request.headers);
    // console.log(request.url);

    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");

    var queryData = url.parse(request.url, true).query;
    console.log("query data ", queryData);

    // ROUTE: api
    if(pathname == "/api"){
	    var vec = queryData && queryData["v[]"] || "";
		console.log (vec);
		
		exec('main.exe ' + Number(vec[0]) + ' ' + Number(vec[1]) + ' ' + Number(vec[2]), 
		  function(status, output) { // Async call to exec()
		    console.log('Exit status:', status);
		    console.log('Program output:', output);

          var outputStr = {
          	status: status,
          	output: output
          };

          /*
            The response header for supporting CORS:
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type"
          */

		  response.writeHead(200, {
		  	"Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type"
		  });
	
		  response.write(JSON.stringify(outputStr));
		  response.end();

		});
		
	}
    // ROUTE: 404
	else {
		response.writeHead(200);
		response.write("404 Not Found\n");
		response.end();
	}
  
}
http.createServer(onRequest).listen(port, ip);
console.log("Server has started: http://"+ip+":"+port);