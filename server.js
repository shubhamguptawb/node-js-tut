const express = require("express");
const app = express();
const path = require("path");
const rootDir = require("./util/path");

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
  res.status(404).sendFile(path.join(rootDir, "views", "404.html"));
});
app.listen(3000);
