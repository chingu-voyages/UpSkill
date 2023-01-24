const router = require("express").Router();
const {
  getUser,
  updateUserAcc,
  updateUserInfo,
  deleteUser,
} = require("../controllers/user");

const upload = require("../middleware/multer");

//Get user info
router.get("/:id", getUser);

//Update User account details
router.put("/acc", updateUserAcc);

//Update user info/data
router.put("/info", upload.single("profilePic"), updateUserInfo);

//Delete user
router.delete("/:id", deleteUser);

module.exports = router;
