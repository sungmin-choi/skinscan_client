const http = require("http");
const express = require("express");
const path = require("path");

const app = express();

const port = 8001;

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.use(express.static(path.join(__dirname, "build")));

app.get("/ads.txt", (req, res) => {
  // ads.txt 파일을 읽어서 응답으로 전송
  res.sendFile(__dirname + "/public/ads.txt");
});

app.get("/*", (req, res) => {
  res.set({
    "Cache-Control": "no-cache, no-store, must-revalidate",
    Pragma: "no-cache",
    Date: Date.now(),
  });
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

http.createServer(app).listen(port, () => {
  console.log(`app listening at ${port}`);
});
