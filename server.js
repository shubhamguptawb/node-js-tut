const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
//app.use will trigger for every request
//we can use app.get app.post instead for this

//get request
app.get("/add-product", (req, res, next) => {
  //will send automatic header

  res.send(
    "<form action = '/product' method = 'POST'><input type = 'text' name = 'title' / ><button type = 'submit'>Add Product</button></form>"
  );
});
//product page is post api
app.post("/product", (req, res, next) => {
  //request to don't parse body by itself
  console.log(req.body, "body");
  res.redirect("/");
});
app.get("/", (req, res, next) => {
  res.send("<h1>Hello World</h1>");
});

//previous two will be done automatically
app.listen(3000);
