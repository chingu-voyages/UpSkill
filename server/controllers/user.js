const { supabase } = require("../config/supabase");

//Get user info
const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) return res.status(400).json("User ID Missing");

    const { data: User, error } = await supabase
      .from("User")
      .select("first_name, last_name, User_data(*)")
      .eq("id", id);

    if (User) {
      return res.status(200).json(User);
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
        "first_name, last_name, userId, skills, about, mission, profilePic, hobbies, occupation, location"
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
      mission,
      tokens,
      tutors,
      tutees,
    } = req.body;

    if (!id) return res.status(400).json("User ID Missing");

    const { error } = await supabase
      .from("User_data")
      .update({ profilePic, skills, about, mission, tokens, tutors, tutees })
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
};
