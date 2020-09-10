const express = require("express"),
  buildRouter = express.Router(),
  path = require("path");

  buildRouter.get("/**", (request, response) => {
    const filePath = path.join(__dirname + "/build/index.html");
    response.sendFile(filePath);
  })
module.exports = buildRouter;
