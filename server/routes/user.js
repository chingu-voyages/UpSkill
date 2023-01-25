const router = require("express").Router();
const {
  getUser,
  updateUserAcc,
  updateUserInfo,
  updateUserPhoto,
  deleteUser,
} = require("../controllers/user");

const upload = require("../middleware/multer");

//Get user info
router.get("/:id", getUser);

//Update User account details
router.put("/acc", updateUserAcc);

//Update user info/data
router.put("/info", updateUserInfo);

//Update user photo
router.put("/photo", upload.single("profilePic"), updateUserPhoto);

//Delete user
router.delete("/:id", deleteUser);

module.exports = router;
