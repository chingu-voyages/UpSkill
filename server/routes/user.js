const router = require("express").Router();
const {
  getUser,
  updateUserAcc,
  updateUserInfo,
  deleteUser,
} = require("../controllers/user");

//Get user info
router.post("/", getUser);

//Update User account details
router.put("/acc", updateUserAcc);

//Update user info/data
router.put("/info", updateUserInfo);

//Delete user
router.delete("/delete/:id", deleteUser);

module.exports = router;
