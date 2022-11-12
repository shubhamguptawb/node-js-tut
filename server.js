const http = require("http"); //look for a global file http
const express = require("express");
//express execute a construction and create a object
const app = express();
//use allows us to use a middleware accepts 3 arguments req, res , next
app.use((req, res, next) => {
  console.log("In the middleware");
  next();
});

app.use((req, res, next) => {
  console.log("In another Middleware");
});

const server = http.createServer(app);

server.listen(3000);

//server response
