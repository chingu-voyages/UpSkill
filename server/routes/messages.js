const router = require("express").Router();

const {
  postAMessage,
  getAllMessage,
  updateAMessage,
  deleteAMessage,
} = require("../controllers/messages");
const {
  postAMessagesValidator,
  getAllMessageValidator,
  updateAMessageValidator,
  deleteAMessageValidator,
} = require("../validator/messagesValidator");

/**
 * Message private
 */

router.post("/q/:relationId?", postAMessagesValidator(), postAMessage);

router.get("/:reationId", getAllMessageValidator(), getAllMessage);

router.put("/:messageId", updateAMessageValidator(), updateAMessage);

router.delete("/:messageId", deleteAMessageValidator(), deleteAMessage);

module.exports = router;
