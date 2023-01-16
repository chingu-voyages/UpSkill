const { supabase } = require("../config/supabase");

const sendTokens = async (req, res) => {
  return res.status(200).json({ testing });
};
module.exports = { sendTokens };
