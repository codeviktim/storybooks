const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET} = require("./keys");

//Load user model
const User = require("../models/User");

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "api/auth/google/callback",
        proxy: true,
      },
      (accessToken, refreshToken, profile, done) => {
        // console.log(accessToken);
        // console.log(profile);
        const image = profile.photos[0].value.substring(
          0,
          profile.photos[0].value.indexOf("?")
        );
        //create User
        const newUser = {
          googleID: profile.id,
          firstname: profile.name.givenName,
          lastname: profile.name.familyName,
          email: profile.emails[0].value,
          image,
        };
        //Check if user exists
        User.findOne({ googleID: profile.id }).then((user) => {
          if (user) {
            //Return user
            done(null, user);
          } else {
            //Create user
            new User(newUser).save().then((user) => done(null, user));
          }
        });
      }
    )
  );
};
