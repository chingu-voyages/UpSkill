const router = require("express").Router();
const { signup, login } = require("../controllers/auth");

//Create a user
router.post("/auth/signup", signup);

//Signin user
router.post("/auth/login", login);

module.exports = router;
