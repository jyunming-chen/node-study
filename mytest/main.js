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

    // USE Another Server to handle static file  (cube.html)
    /*
    // ROUTE: cube page
    if(pathname == "/"){
	    var filename = "./cube.html";
		    response.writeHead(200, {
	        "Content-Type": "text/html"
	    });
	    fs.readFile(filename, "utf8", function(err, data) {
	        if (err) throw err;
	        response.write(data);
	        response.end();
	    });
	}
	*/

    // ROUTE: api
    if(pathname == "/api"){
    // Async call to exec()
	    var argv = queryData && queryData["argv"] || "";
		
		exec('main.exe ' + argv, function(status, output) {
		  console.log('Exit status:', status);
		  console.log('Program output:', output);

          var output = {
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


		  response.write(JSON.stringify(output));
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