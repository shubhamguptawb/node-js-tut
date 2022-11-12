const fs = require("fs");
function requestHandler(req, res) {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Enter Message </title> </head>");
    res.write(
      '<body><form action= "/message" method="POST"><input type = "text" name = "message" ><button type = "submit">Submit</input></body>'
    );
    res.write("</html >");
    return res.end();
  } else if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk, "chunk");
      body.push(chunk);
    });
    //done parsing the requests
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      fs.writeFileSync("mesage.txt", message);
    });
    res.statusCode = 302;
    res.setHeader("Location", "/");
    return res.end();
  }
}

module.exports = requestHandler;

//we can do this also module.exports =
// {
// requestHandler : requestHandler ,
// message : 'Some text'
// }

//we can write exports = requestHandler as well
