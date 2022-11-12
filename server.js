const http = require("http"); //look for a global file http

function reqListener(req, res) {
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My Fi rst Page</title> </head>");
  res.write("<body><h1>Hello from my first Node js server </h1></body>");
  res.write("</html >");
  res.end();
}

//tell node js to listen this function for every single request
const server = http.createServer(reqListener);

//node js will keep on running this code

server.listen(3000);
