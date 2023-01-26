const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.SUPABASE_PROJECT_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const SECRET_KEY = process.env.SUPABASE_SECRET;
const BCRYPT_WF = 12;
const supabase = createClient(supabaseUrl, supabaseKey);
module.exports = { supabase, BCRYPT_WF, SECRET_KEY };
