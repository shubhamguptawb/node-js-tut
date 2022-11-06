const http = require("http"); //look for a global file http

function reqListener(req, res) {
  console.log(req);
}

//tell node js to listen this function for every single request
const server = http.createServer(reqListener);

//node js will keep on running this code

server.listen(3000);
