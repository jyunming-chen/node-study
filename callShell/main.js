require('shelljs/global');

// Sync call to exec()
//var version = exec('node --version', {silent:true}).output;

var argv = "5";

// Async call to exec()
exec('main.exe ' + argv, function(status, output) {
  console.log('Exit status:', status);
  console.log('5! =', output);
});
