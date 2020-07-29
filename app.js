const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const db = require("./config/keys").mongoURI

app.get("/", (req, res) => {
  res.send("working" );
});

//db connection
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successful"))
  .catch((err) => console.log(err));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
