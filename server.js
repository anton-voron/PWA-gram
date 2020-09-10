const express = require("express");
const path = require("path");
const app = express();
const publicRouter = require("./publicRouter");
const buildRouter = require("./buildRouter");

app.use(express.static(path.join(__dirname + "/public")), publicRouter);
app.use(express.static(path.join(__dirname + "/build")), buildRouter);

app.listen(8080, () => console.log(`Server started at http://localhost:8080`));
