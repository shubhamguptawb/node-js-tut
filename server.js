const express = require("express");
const app = express();

//router object becomes as a middleware
const adminRoutes = require("./routes/admin");

const shopRoute = require("./routes/shop");

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));

//order of routes matter
//only accept request starting with admin
app.use("/admin", adminRoutes);

app.use(shopRoute);
app.use((req, res, next) => {
  res.status(404).send("<h1>Page not Found</h1>");
});
app.listen(3000);
