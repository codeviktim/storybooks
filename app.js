const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const session = required("express-session");
const passport = require("passport");

const app = express();
const db = require("./config/keys").MONGODB_URL;
require("./config/passport")(passport);

//load routes
const auth = require("./routes/auth");

app.use(cookieParser);
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialiazed: false,
  })
);

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

//Set local vars
app.use((req, res, next) => {
  res.locals.user = req.user || null;
});

app.use("/auth", auth);

//Map global promises
mongoose.Promise = global.Promise;

//db connection
mongoose
  .connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
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
