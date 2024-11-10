const express = require("express");
const userControllers = require("../controllers/userController");

const router = express.Router();
router.get("/getAll", userControllers.getAllUsers);

module.exports = router;
