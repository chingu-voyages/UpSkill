const router = require("express").Router();
const { signup, login, authO } = require("../controllers/auth");

//Create a user
router.post("/signup", signup);

//Signin user
router.post("/login", login);

//authO authentification
router.post("/auth0", authO);

module.exports = router;
