const { supabase } = require("../config/supabase");

// Book a lesson
const bookLesson = async (req, res) => {
  try {
    const { tuteeId, tutorId, date, time } = req.body;

    if (!date) {
      return res.status(400).json("Booking requires a Date");
    }
    if (!time) {
      return res.status(400).json("Booking requires a Time");
    }
    if (!tutorId) {
      return res.status(400).json("Booking requires a TutorId");
    }
    if (!tuteeId) {
      return res.status(400).json("Booking requires a TuteeId");
    }

    const { data, error } = await supabase
      .from("Lesson")
      .insert({ date, time, tutor: tutorId, tutee: tuteeId });

    if (!error) {
      return res.status(204).json("Lesson Booked");
    } else {
      return res.status(500).json({ Error_booking_lesson: error });
    }
  } catch (error) {
    return res.status(500).json({ Error_booking_lesson: error });
  }
};

// Cancel a lesson
const cancelLesson = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json("No Lesson ID provided");
    }

    const { error } = await supabase.from("Lesson").delete().eq("id", id);

    if (!error) {
      return res.status(204).json("Lesson cancelled successfully");
    } else if (error) {
      return res.status(500).json({ Error_Cancelling_Lesson: error });
    }
  } catch (error) {
    return res.status(500).json({ Error_cancelling_lesson: error });
  }
};

const setLessonComplete = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json("No LessonId provided");
    }

    if (id) {
      const { error } = await supabase
        .from("Lesson")
        .update({ completed: true })
        .eq("id", id);
      if (!error) {
        return res.status(200).json("Lesson completed");
      } else if (error) {
        return res.status(500).json({ Error_Setting_Complete: error });
      }
    }
  } catch (error) {
    return res.status(500).json({ Error_Setting_Complete: error });
  }
};

module.exports = { bookLesson, cancelLesson, setLessonComplete };
