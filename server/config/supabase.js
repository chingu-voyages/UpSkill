const { createClient } = require("@supabase/supabase-js");
// TODO: delete these
const supabaseUrl = process.env.supabaseUrl;
const supabaseKey = process.env.supabaseKey;
// TODO: keep these
// const supabaseUrl = process.env.SUPABASE_PROJECT_URL;
// const supabaseKey = process.env.SUPABASE_ANON_KEY;
const SECRET_KEY = process.env.SECRET_KEY;
const BCRYPT_WF = 12;
const supabase = createClient(supabaseUrl, supabaseKey);
module.exports = { supabase, BCRYPT_WF, SECRET_KEY };
