const router = require("express").Router();
const {
  getUser,
  getUsersBySkill,
  updateUserAcc,
  updateUserInfo,
  deleteUser,
} = require("../controllers/user");

//Get user info
router.get("/id/:id", getUser);

//Get user based on skill
router.get("/skills", getUsersBySkill);

//Update User account details
router.put("/acc", updateUserAcc);

//Update user info/data
router.put("/info", updateUserInfo);

//Delete user
router.delete("/:id", deleteUser);

module.exports = router;
