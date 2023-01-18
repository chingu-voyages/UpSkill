const router = require("express").Router();
const { bookLesson, cancelLesson } = require("../controllers/lessons");
// Book a lesson
router.put("/book/:id", bookLesson);

// Cancel a lesson
router.delete("/delete/:id", cancelLesson);

module.exports = router;
