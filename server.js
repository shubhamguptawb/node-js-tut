const http = require("http"); //look for a global file http
const express = require("express");
const app = express();

//add slash for path

app.use("/add-product", (req, res, next) => {
  //will send automatic header
  res.send("<h1>Add Product Page</h1>");
});

app.use("/", (req, res, next) => {
  res.send("<h1>Hello World</h1>");
});

//previous two will be done automatically
app.listen(3000);
