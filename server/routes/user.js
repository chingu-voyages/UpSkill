const router = require("express").Router();
const { getUser, updateUser, deleteUser } = require("../controllers/user");

//Get user info
router.post("/", getUser);

//Update user info
router.put("/user/update/", updateUser);

//Delete user
router.delete("/user/delete/:id", deleteUser);

module.exports = router;
