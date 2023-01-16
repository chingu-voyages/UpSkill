const { supabase } = require("../config/supabase");

// Book a lesson
const bookLesson = async (req, res) => {
  return res(200).json({ testing });
};

// Cancel a lesson
const cancelLesson = async (req, res) => {
  return res(200).json({ testing });
};

module.exports = { bookLesson, cancelLesson };
