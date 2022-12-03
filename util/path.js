const path = require("path");

//gives the path to the directory where file is running the server
module.exports = path.dirname(process.mainModule.filename);
