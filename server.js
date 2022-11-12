const express = require("express");
const app = express();
const bodyParser = require("body-parser");

//add slash for path
//do not parse file , json etc only string
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/add-product", (req, res, next) => {
  //will send automatic header

  res.send(
    "<form action = '/product' method = 'POST'><input type = 'text' name = 'title' / ><button type = 'submit'>Add Product</button></form>"
  );
});

app.use("/product", (req, res, next) => {
  //request to don't parse body by itself
  console.log(req.body, "body");
  res.redirect("/");
});
app.use("/", (req, res, next) => {
  res.send("<h1>Hello World</h1>");
});

//previous two will be done automatically
app.listen(3000);
