const { supabase, BCRYPT_WF, SECRET_KEY } = require("../config/supabase");
const { createToken } = require("../helpers/jwt");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Check for duplicate user
    const { data: duplicateUser } = await supabase
      .from("User")
      .select("email")
      .eq("email", email);
    if (duplicateUser[0]) {
      return res
        .status(500)
        .json({ Error: "User with this email already exists." });
    }

    // Hash password & insert user credentials in User table
    const hashedPw = await bcrypt.hash(password, BCRYPT_WF);
    const { data, error } = await supabase
      .from("User")
      .insert({
        email: email,
        password: hashedPw,
      })
      .select("email, id");
    const user = data[0];
    // Handle missing inputs
    if (error && error.code === "23502") {
      return res.status(500).json({ Error: "Missing Credentials." });
    }

    // Create JWT 🥇
    const token = createToken(user);

    /*
      Subsequently insert same id
      from new user to userId column in User_data table
    */
    await supabase.from("User_data").insert({
      first_name: firstName,
      last_name: lastName,
      userId: user.id,
    });
    return res.status(203).json({ Message: "Successfully registered.", token });
  } catch (err) {
    return next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 🔎 locate user
    const { data } = await supabase
      .from("User")
      .select("email, password, id")
      .eq("email", email);
    const user = data[0];

    // if user not found
    if (!user) {
      return res.status(404).json({ Error: "User does not exist." });
    }

    // Validate password ✅
    const validPw = await bcrypt.compare(password, user.password);
    if (validPw) {
      // Create JWT 🥇
      const token = createToken(user);

      return res.status(200).json({ Message: "Successfully logged in", token });
    } else {
      return res.status(404).json({ Error: "Invalid username/password." });
    }
  } catch (err) {
    return next(err);
  }
};

module.exports = { signup, login };
