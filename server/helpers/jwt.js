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

// Middleware : Ensure user is logged in
function ensureLoggedIn(req, res, next) {
  try {
    // expect token to be in request body

    const { token } = req.body;
    jwt.verify(token, SECRET_KEY);
    return next();
  } catch (err) {
    // If no/invalid token 🚫
    return res.status(400).json({ Error: "Must be logged in." });
  }
}

module.exports = { createToken, ensureLoggedIn };
