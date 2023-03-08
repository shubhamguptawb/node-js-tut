// create a new sequelize object
const Sequelize = require("Sequelize");

const sequelize = new Sequelize("node-complete", "root", "12345678@", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
