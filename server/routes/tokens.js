const router = require("express").Router();
const { sendTokens } = require("../controllers/tokens");

//confirm lesson completed => on confirmation tokens are sent to the tutor from the tutee
router.put("/", sendTokens);

module.exports = router;
