/**
 * This is the dispatcher module for this example.
 *
 * It create a http web server and listen on port 8888.
 *
 * When client send request, it will dispatch the request to different module by request url path.
 */

var http = require('http');

var http_util = require('./util/http_util');

var home_module = require('./home');

var login_module = require('./login');

var register_module = require('./register');

var http_server_port = 8888;


/* This is the callback function which will be used by http web server.
*
*  This function will process client request.
* */
var http_server_callback_function = function(req, resp){

   // Parse query strings.
   http_util.getUrlParams(req, resp);

   // Get request url path value.
   var url_path = req.query_url.pathname;

   // Invoke different module's function by different request path.
    if(url_path === '/')
    {
        home_module.showHomePage(req, resp);
    }else if(url_path === '/login' )
   {
      login_module.showLoginPage(req, resp);
   }else if(url_path === '/check-login')
   {
        login_module.checkLoginAccount(req, resp);
   }else if(url_path === '/register')
    {
        register_module.showRegisterPage(req, resp);
    }else if(url_path === '/register-submit')
    {
        register_module.registerSubmit(req, resp);
    }else
   {
      resp.writeHead(404, {'Content-Type' : 'text/html'});
      resp.end("Request url is not valid : " + req.url.toString());
   }
}

// Create a http web server use above callback function.
var http_server = http.createServer(http_server_callback_function);

// Server is listen on port 8888.
http_server.listen(http_server_port);

// Print log data in console.
console.log('http server lisetning on port ' + http_server_port);