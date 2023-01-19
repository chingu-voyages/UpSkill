const router = require("express").Router();
const { bookLesson, cancelLesson } = require("../controllers/lessons");
// Book a lesson
router.post("/", bookLesson);

// Cancel a lesson
router.delete("/:id", cancelLesson);

// Set lesson as complete
router.put("/", cancelLesson);

module.exports = router;
