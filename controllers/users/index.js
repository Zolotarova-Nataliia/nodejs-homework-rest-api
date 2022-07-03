const signup = require("./signup");
const login = require("./login");
const getCurrent = require("./getCurrent");
const logout = require("./logout");
const subscriptionUpdate = require("./subscriptionUpdate");
const updateAvatar = require("./updateAvatar");
const verifyEmail = require("./verifyEmail");
const resendEmail = require("./resendEmail");

module.exports = {
  signup,
  login,
  getCurrent,
  logout,
  subscriptionUpdate,
  updateAvatar,
  verifyEmail,
  resendEmail,
};
