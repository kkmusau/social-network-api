const express = require("express");
const db = require("./config/connection");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(require('./routes'));

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server for Social Network running on http://localhost:${PORT}`)
  });
});