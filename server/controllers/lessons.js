const { supabase } = require("../config/supabase");

// Book a lesson
const bookLesson = async (req, res) => {
  try {
    return res.status(200).json({ testing });
  } catch (error) {
    return res.status(500).json({ Error_booking_lesson: error });
  }
};

// Cancel a lesson
const cancelLesson = async (req, res) => {
  try {
    return res.status(200).json({ testing });
  } catch (error) {
    return res.status(500).json({ Error_cancelling_lesson: error });
  }
};

module.exports = { bookLesson, cancelLesson };
