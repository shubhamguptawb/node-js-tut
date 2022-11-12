const http = require("http"); //look for a global file http
const fs = require("fs");
function reqListener(req, res) {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Enter Message </title> </head>");
    res.write(
      '<body><form action= "/message" method="POST"><input type = "text" name = "message" ><button type = "submit">Submit</input></body>'
    );
    res.write("</html >");
    res.end();
  } else if (url === "/message" && method === "POST") {
    //on allows to listen message because it is a buffer chunk
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk, "chunk");
      //  <Buffer 6d 65 73 73 61 67 65 3d 6d 65 73 73 61 67 65> chunk
      body.push(chunk);
    });
    //done parsing the requests
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log(parsedBody, "parsed");
      // message=message parsed
      const message = parsedBody.split("=")[1];
      fs.writeFileSync("mesage.txt", message);
    });
    res.statusCode = 302;
    res.setHeader("Location", "/");
    return res.end();
  }
}

//tell node js to listen this function for every single request
const server = http.createServer(reqListener);

//node js will keep on running this code

server.listen(3000);
