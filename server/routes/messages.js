const router = require("express").Router();

const {
  postAMessage,
  getAllMessage,
  updateAMessage,
  deleteAMessage,
  getAllConversation,
} = require("../controllers/messages");
const {
  postAMessagesValidator,
  getAllMessageValidator,
  updateAMessageValidator,
  deleteAMessageValidator,
  getAllConversationValidator,
} = require("../validator/messagesValidator");

/**
 * Message private
 */

router.post("/q/:relationId?", postAMessagesValidator(), postAMessage);

router.get("/:relationId", getAllMessageValidator(), getAllMessage);

router.get(
  "/conversation/:userId",
  getAllConversationValidator(),
  getAllConversation
);

router.put("/:messageId", updateAMessageValidator(), updateAMessage);

router.delete("/:messageId", deleteAMessageValidator(), deleteAMessage);

module.exports = router;
