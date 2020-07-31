const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
//const path = require("path");

const app = express();
const db = require("./config/keys").mongoURI;
require("./config/passport")(passport);

//load routes
const auth = require("./routes/api/auth");

app.use("/api/auth", auth);
//db connection
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successful"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("working");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
