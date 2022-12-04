const express = require("express");
const app = express();
//set global settings
//setting a view engine
app.set("view engine", "pug");
//setting views folder location
app.set("views", "views");
const path = require("path");
const rootDir = require("./util/path");

const adminData = require("./routes/admin");

const shopRoute = require("./routes/shop");

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminData.routes);

app.use(shopRoute);
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(rootDir, "views", "404.html"));
});
app.listen(3000);
