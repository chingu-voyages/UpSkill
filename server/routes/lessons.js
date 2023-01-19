const router = require("express").Router();
const {
  bookLesson,
  cancelLesson,
  setLessonComplete,
  getAllUserLessonsAsTutor,
  getAllUserLessonsAsTutee,
} = require("../controllers/lessons");

//Get all lessons as a tutor
router.get("/tutor/:id", getAllUserLessonsAsTutor);

//Get all lessons as a tutee
router.get("/tutee/:id", getAllUserLessonsAsTutee);

// Book a lesson
router.post("/", bookLesson);

// Cancel a lesson
router.delete("/:id", cancelLesson);

// Set lesson as complete
router.put("/complete/:id", setLessonComplete);

module.exports = router;
