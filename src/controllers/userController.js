const userService = require("../services/userService");

module.exports.getAllUsers = async (req, res) => {
  const usersRes = await userService.getAllUsers();
  res.send({
    code: 200,
    msg: "success",
    data: usersRes,
  });
};
