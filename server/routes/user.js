const router = require("express").Router();
const {
  getUser,
  getUsersBySkill,
  updateUserAcc,
  updateUserInfo,
  updateUserPhoto,
  setUserCalendlyLink,
  deleteUser,
  postUserReview,
  getUserReviews,
} = require("../controllers/user");
const { ensureLoggedIn } = require("../helpers/jwt");
const upload = require("../middleware/multer");

//Get user info
router.get("/id/:id", getUser);

//Get user based on skill
router.get("/skills", getUsersBySkill);

//Update User account details
router.put("/acc", updateUserAcc);

//Update user info/data
router.put("/info", ensureLoggedIn, updateUserInfo);

//Update user photo
router.put(
  "/photo",
  upload.single("profilePic"),
  ensureLoggedIn,
  updateUserPhoto
);

//Update user calendly link
router.put("/calendar", ensureLoggedIn, setUserCalendlyLink);

//Post review about user
router.post("/review", ensureLoggedIn, postUserReview);

//Get a user's reviews
router.get("/review/:id", getUserReviews);

//Delete user
router.delete("/:id", deleteUser);

module.exports = router;
