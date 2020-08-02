if (process.env.NODE_ENV === "production") {
  module.exports = {
    MONGODB_URL: process.env.MONGODB_URL,
    GOOGLE_CLIENT_ID: require("./keys_dev").GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: require("./ keys_dev").GOOGLE_CLIENT_SECRET,
  };
} else {
  module.exports = require("./keys_dev");
}
