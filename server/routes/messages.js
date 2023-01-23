const router = require("express").Router();

const {
  postAMessage,
  getAllMessage,
  updateAMessage,
  deleteAMessage,
  createChatGroupes,
  getAllChatGroupe,
  sendMessageGroupe,
  getAllMessageGroupe,
  updateAGroupe,
  deleteAGroupeMessages,
  leaveChatGroupe,
  deleteChatGroupe,
} = require("../controllers/messages");
const {
  postAMessagesValidator,
  getAllMessageValidator,
  updateAMessageValidator,
  createChatGroupesValidator,
  sendMessageGroupeValidator,
  getAllChatGroupeValidator,
  getAllMessageGroupeValidator,
  updateAGroupeValidator,
  deleteAGroupeMessagesValidator,
  leaveChatGroupeValidator,
  deleteChatGroupeValidator,
} = require("../validator/messagesValidator");

/**
 * Message private
 */

router.post("/q/:relationId?", postAMessagesValidator(), postAMessage);

router.get("/:reationId", getAllMessageValidator(), getAllMessage);

router.put("/:messageId", updateAMessageValidator(), updateAMessage);

router.delete("/:messageId", deleteAMessage(), deleteAMessage);

/**
 * groupe chat
 */

router.post("/chatgroupe", createChatGroupesValidator(), createChatGroupes);

router.post(
  "/q/groupes/:groupeId",
  sendMessageGroupeValidator(),
  sendMessageGroupe
);

router.get("/groupes/:userId", getAllChatGroupeValidator(), getAllChatGroupe);

/**
 * to get all messages from a specific groupe
 */
router.get(
  "/groupemessages/:groupeId",
  getAllMessageGroupeValidator(),
  getAllMessageGroupe
);

/**
 * to add members or update groupe name/description
 */
router.put(
  "/groupemessages/:userId/:groupeId",
  updateAGroupeValidator(),
  updateAGroupe
);

/**
 * delete a message from a groupe
 */
router.delete(
  "/groupemessages/delete/:userId/:groupeMessageId",
  deleteAGroupeMessagesValidator(),
  deleteAGroupeMessages
);

/**
 * when members want to leave groupe
 */
router.get(
  "/groupe/leave/:memberId",
  leaveChatGroupeValidator(),
  leaveChatGroupe
);

/**
 * when groupe was deleted, all of his members and all the messages from that
 * groupe is also delete
 */
router.delete(
  "/groupe/delete/:groupeId",
  deleteChatGroupeValidator(),
  deleteChatGroupe
);

module.exports = router;
