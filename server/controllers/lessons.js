const { supabase } = require("../config/supabase");

// Get all user's booked lessons

const getAllUserLessonsAsTutor = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json("User ID Missing");

    const { data: User, error } = await supabase
      .from("Lesson")
      .select("*")
      .eq("tutor", id);

    if (User) {
      return res.status(200).json(User);
    } else {
      return res.status(404).json({ User_not_found: error });
    }
  } catch (error) {
    return res.status(500).json({ Error_Fetching_lessons: error });
  }
};

//Get all user's booked lessons as a tutee
const getAllUserLessonsAsTutee = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json("User ID Missing");

    const { data: User, error } = await supabase
      .from("Lesson")
      .select("*")
      .eq("tutee", id);

    if (User) {
      return res.status(200).json(User);
    } else {
      return res.status(404).json({ User_not_found: error });
    }
  } catch (error) {
    return res.status(500).json({ Error_Fetching_lessons: error });
  }
};

// Book a lesson/create a lesson and dedcut the tokens from the tutee
const bookLesson = async (req, res) => {
  try {
    const { tuteeId, tutorId, date, time, cost } = req.body;

    if (!date) {
      return res.status(400).json("Booking requires a Date");
    }
    if (!time) {
      return res.status(400).json("Booking requires npma Time");
    }
    if (!tutorId) {
      return res.status(400).json("Booking requires a TutorId");
    }
    if (!tuteeId) {
      return res.status(400).json("Booking requires a TuteeId");
    }

    //Check the tutee has enough tokens
    if (cost) {
      const { data: Sender, error: sendErr } = await supabase
        .from("User_data")
        .select("tokens")
        .eq("userId", tuteeId);

      //If Sender wasn't found in the DB, trigger an error repsonse
      if (!Sender) {
        return res.status(404).json({ Sending_User_Not_Found: sendErr });
      }

      const senderTokens = Number(Sender[0].tokens);

      if (senderTokens < Number(cost)) {
        return res
          .status(400)
          .json("User does not have enough tokens for this transaction");
      } else {
        const tokenCountAfterSending = senderTokens - Number(cost);
        const { error } = await supabase
          .from("User_data")
          .update({
            tokens: tokenCountAfterSending,
          })
          .eq("userId", tuteeId);

        if (error) {
          return res.status(500).json({ Error_sending_tokens: error });
        }
      }
    }

    //Create the lesson
    const { data, error } = await supabase
      .from("Lesson")
      .insert({ date, time, tutor: tutorId, tutee: tuteeId, cost });

    if (!error) {
      return res.status(200).json("Lesson Booked");
    } else {
      return res.status(500).json({ Error_booking_lesson: error });
    }
  } catch (error) {
    return res.status(500).json({ Error_booking_lesson: error });
  }
};

// Cancel lesson and return tokens to the tutee
const cancelLesson = async (req, res) => {
  try {
    //Lesson Id comes in
    const { id } = req.params;

    if (!id) {
      return res.status(400).json("No Lesson ID provided");
    }

    //Retrieve the tutee's id and the token amount they need to receive back
    const { data: Lesson, error: tuteeErr } = await supabase
      .from("Lesson")
      .select("tutee, cost")
      .eq("id", id);

    if (!Lesson) {
      return res.status(404).json({ Tutee_not_found: tuteeErr });
    }
    const tuteeId = Lesson[0].tutee;
    const tokensToReturn = Number(Lesson[0].cost);

    //Execute the following code only if there are tokens to return
    if (tokensToReturn > 0) {
      const { data: Sender, error: sendErr } = await supabase
        .from("User_data")
        .select("tokens")
        .eq("userId", tuteeId);

      //If Sender wasn't found in the DB, trigger an error repsonse
      if (!Sender) {
        return res.status(404).json({ Tutee_Not_Found: sendErr });
      }

      const senderTokens = Number(Sender[0].tokens);
      const tokenCountAfterReturn = senderTokens + tokensToReturn;

      const { error } = await supabase
        .from("User_data")
        .update({
          tokens: tokenCountAfterReturn,
        })
        .eq("userId", tuteeId);

      if (error) {
        return res.status(500).json({ Error_returning_tokens: token });
      }
    }
    // Delete the lesson after returning the user tokens to the tutee.
    const { error } = await supabase.from("Lesson").delete().eq("id", id);

    if (!error) {
      return res.status(200).json("Lesson cancelled successfully");
    } else if (error) {
      return res.status(500).json({ Error_Cancelling_Lesson: error });
    }
  } catch (error) {
    return res.status(500).json({ Error_cancelling_lesson: error });
  }
};

// Set lesson as complete and transfer the tokens to the tutor
const setLessonComplete = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json("No LessonId provided");
    }

    //Retrieve the tutor's id and the token amount they need to receive
    const { data: Lesson, error: tutorErr } = await supabase
      .from("Lesson")
      .select("tutor, cost")
      .eq("id", id);

    if (!Lesson) {
      return res.status(404).json({ Tutor_not_found: tutorErr });
    }

    const tutorId = Lesson[0].tutor;
    const tokensToSend = Number(Lesson[0].cost);

    if (tokensToSend > 0) {
      const { data: Receiver, error: receiverErr } = await supabase
        .from("User_data")
        .select("tokens")
        .eq("userId", tutorId);

      //If Tutor wasn't found in the DB, trigger an error repsonse
      if (!Receiver) {
        return res.status(404).json({ Tutor_Not_Found: receiverErr });
      }

      const receiverCurrentTokens = Number(Receiver[0].tokens);
      const tokenCountAfterReceiving = receiverCurrentTokens + tokensToSend;

      const { error } = await supabase
        .from("User_data")
        .update({
          tokens: tokenCountAfterReceiving,
        })
        .eq("userId", tutorId);

      if (error) {
        return res.status(500).json({ Error_returning_tokens: error });
      }
    }

    // Mark the lesson as complete
    const { error } = await supabase
      .from("Lesson")
      .update({ completed: true })
      .eq("id", id);
    if (!error) {
      return res.status(200).json("Lesson completed");
    } else if (error) {
      return res.status(500).json({ Error_Setting_Complete: error });
    }
  } catch (error) {
    return res.status(500).json({ Error_Setting_Complete: error });
  }
};

module.exports = {
  bookLesson,
  cancelLesson,
  setLessonComplete,
  getAllUserLessonsAsTutor,
  getAllUserLessonsAsTutee,
};
