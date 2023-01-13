const router = require("express").Router();
const { bookLesson, cancelLesson } = require("../controllers/lessons");
// Book a lesson
router.put("/lesson/book/:id", bookLesson);

// Cancel a lesson
router.delete("/lesson/delete/:id", cancelLesson);

module.exports = router;
