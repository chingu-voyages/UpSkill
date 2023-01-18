const router = require("express").Router();
const { sendTokens } = require("../controllers/tokens");

//confirm lesson completed => on confirmation tokens are sent to the tutor from the tutee
router.put("/send/:id", sendTokens);

module.exports = router;
