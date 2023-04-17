const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const errorController = require("./controllers/error");
const User = require("./models/user");
const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("643b65e1f682e365ca762e19")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});
app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    "mongodb+srv://scmotorsofficial:AAGR2vWjNkHYQqkN@cluster0.cujoghp.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: "Shubham",
          email: "shub@gmail.com",
          cart: {
            items: [],
          },
        });
        user
          .save()
          .then((result) => console.log(result))
          .catch((err) => console.log(err));
      }
    });

    console.log("connected to database");
    app.listen(3000);
  })
  .catch((err) => console.log(err));

// mongoose provide built in functions so not to write syntaxes
