const { supabase } = require("../config/supabase");

const sendTokens = async (req, res) => {
  try {
    return res.status(200).json({ testing });
  } catch (error) {
    return res.status(500).json({ Error_sending_tokens: error });
  }
};
module.exports = { sendTokens };
