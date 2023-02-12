const { supabase } = require("../config/supabase");
const cloudinary = require("../config/cloudinaryConfig");
//Get user info
const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) return res.status(400).json("User ID Missing");

    const { data: User, error } = await supabase
      .from("User_data")
      .select("*")
      .eq("userId", id);
    if (User) {
      return res.status(200).json(User[0]);
    } else {
      return res.status(404).json({ User_not_found: error });
    }
  } catch (error) {
    return res.status(500).json({ Error_fetching_user_data: error });
  }
};

// Get user based on skill
const getUsersBySkill = async (req, res) => {
  try {
    const { skill } = req.query;
    // Query user(s) by skill
    const { data } = await supabase
      .from("User_data")
      .select(
        "first_name, last_name, userId, skills, about, mission, profilePic, hobbies, learning, occupation, location"
      )
      .ilike("skills", `%${skill}%`);

    if (!data[0]) {
      return res.status(404).json({ Message: "No mentors with that skill." });
    }
    return res.status(200).json({ users: data });
  } catch (error) {
    return res.status(404).json({ Users_not_found: error });
  }
};

//Update user Account
const updateUserAcc = async (req, res) => {
  try {
    const { id, first_name, last_name, email, password } = req.body;

    //declaring a hashPassword to later hold the value of the hashed and salted password
    let hashPassword;

    if (!id) return res.status(400).json("User ID Missing");

    //TODO!!!
    //if password add password salting and hashing will generate using the  same method as used for auth.
    // if(password){}
    // const

    const { error } = await supabase
      .from("User")
      .update({ id, first_name, last_name, email, password: hashPassword })
      .eq("id", id);

    if (!error) {
      return res.status(200).json("User updated");
    } else {
      return res.status(500).json({ Error_Updating_User: error });
    }
  } catch (error) {
    return res.status(500).json({ Error_updating_user_data: error });
  }
};

//Update the user info/data
const updateUserInfo = async (req, res) => {
  try {
    const {
      id,
      profilePic,
      skills,
      about,
      hobbies,
      mission,
      tokens,
      learning,
      occupation,
      location,
    } = req.body;

    if (!id) return res.status(400).json("User ID Missing");

    const { error } = await supabase
      .from("User_data")
      .update({
        skills,
        about,
        hobbies,
        mission,
        tokens,
        profilePic,
        learning,
        occupation,
        location,
      })
      .eq("userId", id);

    if (!error) {
      return res.status(200).json("User updated");
    } else {
      return res.status(500).json({ Error_Updating_User: error });
    }
  } catch (error) {
    return res.status(500).json({ Error_updating_user_data: error });
  }
};

// Update userPhoto
const updateUserPhoto = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json("User ID Missing");
    }
    if (!req.file) {
      return res.status(400).json("Image Missing");
    }

    const { data, error: userErr } = await supabase
      .from("User_data")
      .select("profilePic, profilePicId")
      .eq("userId", id);
    const { profilePicId } = data[0];
    if (profilePicId) {
      //delete previous photo from Cloudinary Storage
      await cloudinary.uploader.destroy(profilePicId);
    }

    let cloudinaryId, img;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      if (result) {
        cloudinaryId = result.public_id;
        img = result.secure_url;
      }
    }
    const { error } = await supabase
      .from("User_data")
      .update({
        profilePic: img,
        profilePicId: cloudinaryId,
      })
      .eq("userId", id);

    if (!error) {
      return res.status(200).json({ Photo_updated: img });
    } else {
      return res.status(500).json({ Error_Updating_User_Image: error });
    }
  } catch (error) {
    return res.status(500).json({ Error_updating_User_Image: error });
  }
};

//Set user calendly account link
const setUserCalendlyLink = async (req, res) => {
  try {
    const { id, calendly } = req.body;

    if (!id) {
      return res.status(400).json("User ID Missing");
    }
    if (!calendly) {
      return res.status(400).json("Calendly Link Missing");
    }

    const { error } = await supabase
      .from("User_data")
      .update({
        calendly_link: calendly,
      })
      .eq("userId", id);

    if (!error) {
      return res.status(200).json("User Calendly Link Updated");
    } else {
      return res.status(500).json({ Error_Updating_Calendly_Link: error });
    }
  } catch (error) {
    return res.status(500).json({ Error_updating_user_data: error });
  }
};

const postUserReview = async (req, res) => {
  try {
    const { recevierId, reviewerId, starRating, review } = req.body;
    if (!reviewerId || !recevierId) {
      return res.status(400).json("User ID Missing");
    }
    if (reviewerId === recevierId) {
      return res.status(403).json("User cannot review own profile");
    }

    const { data, error } = await supabase
      .from("Reviews")
      .insert([{ userId: recevierId, reviewerId, review, stars: starRating }])
      .select();

    if (!error) {
      return res.status(200).json({ review_Posted: data });
    } else {
      return res.status(500).json({ Error_Updating_User: error });
    }
  } catch (error) {
    return res.status(500).json({ Error_updating_user_data: error });
  }
};

const getUserReviews = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json("User ID Missing");

    let { data: Reviews, error } = await supabase
      .from("Reviews")
      .select(" reviewerId, review, stars, created_at ")
      .eq("userId", id);

    if (Reviews) {
      return res.status(200).json(Reviews);
    } else {
      return res.status(404).json({ Reviews_not_found: error });
    }
  } catch (error) {
    return res.status(500).json({ Error_fetching_review_data: error });
  }
};

//Delete user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) return res.status(400).json("User ID Missing");

    //Must follow this order as the User info from "User_data" must be deleted first
    const { error: infoErr } = await supabase
      .from("User_data")
      .delete()
      .eq("userId", id);

    const { error: accountErr } = await supabase
      .from("User")
      .delete()
      .eq("id", id);

    if (accountErr || infoErr) {
      return res.status(404).json({ User_not_deleted: error });
    } else {
      return res.status(204).json("User and user data deleted successfully");
    }
  } catch (error) {
    return res.status(500).json({ Error_deleting_user_data: error });
  }
};

module.exports = {
  getUser,
  getUsersBySkill,
  updateUserAcc,
  updateUserInfo,
  deleteUser,
  updateUserPhoto,
  setUserCalendlyLink,
  postUserReview,
  getUserReviews,
};
