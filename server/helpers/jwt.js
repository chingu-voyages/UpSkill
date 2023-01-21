const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config/supabase");

// Create a token 🥇 and return it
function createToken(user) {
  const payload = {
    id: user.id,
    loggedIn: "success",
  };
  return jwt.sign(payload, SECRET_KEY);
}

// TODO: CREATE verifyToken function

module.exports = { createToken };
