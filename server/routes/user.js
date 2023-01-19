const router = require("express").Router();
const {
  getUser,
  updateUserAcc,
  updateUserInfo,
  deleteUser,
} = require("../controllers/user");

//Get user info
router.get("/:id", getUser);

//Update User account details
router.put("/acc", updateUserAcc);

//Update user info/data
router.put("/info", updateUserInfo);

//Delete user
router.delete("/:id", deleteUser);

module.exports = router;
