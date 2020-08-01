if (process.env.NODE_ENV === "production") {
  module.exports = {
    MONGODB_URL: process.env.MONGODB_URL,
  };
} else {
  module.exports = require("./keys_dev");
}
