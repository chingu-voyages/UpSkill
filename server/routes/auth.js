const router = require("express").Router();
const { signup, login } = require("../controllers/auth");

//Create a user
router.post("/signup", signup);

//Signin user
router.post("/login", login);

module.exports = router;
