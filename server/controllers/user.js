const { supabase } = require("../config/supabase");

//Get user info
const getUser = async (req, res) => {
  return res(200).json({ testing });
};

//Update user info
const updateUser = async (req, res) => {
  return res(200).json({ testing });
};

//Delete user
const deleteUser = async (req, res) => {
  return res(200).json({ testing });
};

module.exports = { getUser, updateUser, deleteUser };
