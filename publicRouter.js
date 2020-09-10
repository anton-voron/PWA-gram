const express = require("express");
const path = require("path");
const publicRouter = express.Router();
const bodyParser = require("body-parser");

publicRouter.get("/service-worker.js", (request, response) => {
  const filePath = path.join(__dirname + "public/service-worker.js");
  response.sendFile(filePath);
});

publicRouter.get("/manifest.json", (request, response) => {
  const filePath = path.join(__dirname + "public/manifest.json");
  response.sendFile(filePath);
});

publicRouter.get("/assets/logo.svg", (request, response) => {
  const filePath = path.join(__dirname + "public/assets/logo.svg");
  response.sendFile(filePath);
});

const urlEncoderParser = bodyParser.urlencoded({ extended: false });
publicRouter.get("/register", urlEncoderParser, (request, response) => {
  const filePath = path.join(__dirname + "/public/register.html");
  response.sendFile(filePath);
});

publicRouter.post("/register", urlEncoderParser, (request, response) => {
  if (!request.body) return response.status(404).send(`Форма не заполнена`);
  console.log(request.body);
  response.send(`${request.body.userName} - ${request.body.userAge}`);
});

publicRouter.get("/about", (request, response) => {
  response.send("<h1>About page</h1>");
});

module.exports = publicRouter;
