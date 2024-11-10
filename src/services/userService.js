const User = require("../models/User");

module.exports.getAllUsers = async () => {
  return await User.findAll();
};
