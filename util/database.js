//mongo db

const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://scmotorsofficial:AAGR2vWjNkHYQqkN@cluster0.cujoghp.mongodb.net/?retryWrites=true&w=majority"
  )
    .then((client) => {
      console.log("Connected");
      callback(client);
    })
    .catch((err) => console.log(err));
};

module.exports = mongoConnect;
