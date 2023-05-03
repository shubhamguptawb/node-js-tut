const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const csrf = require("csurf");
//to display error message across app
const flash = require("connect-flash");
const multer = require("multer");

const errorController = require("./controllers/error");
const User = require("./models/user");

const MONGODB_URI =
  "mongodb+srv://scmotorsofficial:qQKODqToaRW00SEQ@cluster0.xzu3jyy.mongodb.net/test?retryWrites=true&w=majority";

require("dotenv").config();
const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});

const csrfProtection = csrf();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

// parse body as string text
//we need to change it to others to parse file
app.use(bodyParser.urlencoded({ extended: false }));
//multer is a file parser and for single upload we write single and the file name that will be imported +
// app.use(multer().single("image"));
//store  the image in path
app.use(multer({ dest: "images" }).single("image"));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use(csrfProtection);
app.use(flash());
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});
app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  // throw new Error("Dummy");
  User.findById(req.session.user._id)
    .then((user) => {
      if (!user) {
        return next();
      }
      req.session.user = user;
      next();
    })
    .catch((err) => {
      // inside of promise middleware will be called like this
      next(new Error());
      throw new Error(err);
    });
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.get("/500", errorController.get500);
app.use(errorController.get404);

app.use((error, req, res, next) => {
  console.log(error, "error");
  res.status(500).render("500", {
    pageTitle: "Error!",
    path: "/500",
    isAuthenticated: req.session.isLoggedIn,
  });
});
mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  });
