const path = require("path");
const express = require("express");

const router = express.Router();

//send html files
//we need to put project location for file not the os location so path module will be used
router.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "../", "views", "shop.html"));
});
//dirname will refer to location  of directory we  are in  i.e. address of routes folder  '//join is used because linus use \ window use /
module.exports = router;
