const express = require("express");
const router = express.Router();
const passport = require("passport");

//@ROUTE /auth/google
//@DESCRIPTION google auth api
//@ACCESS Public
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/dashboard");
  }
);

router.get("/verifyUser", (req, res) => {
  if (req.user) {
    console.log(req.user);
  } else {
    console.log("not authenticated");
  }
});

//@ROUTE /auth/logout
//@DESCRIPTION logout User
//@ACCESS Private
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
