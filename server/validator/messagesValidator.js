const { body, param } = require("express-validator");

const postAMessagesValidator = () => [
  param("relationId")
    .notEmpty()
    .isUUID(4)
    .withMessage(
      "Verify the Url params. It should be an UUID of user relation"
    ),
  body("sender").notEmpty().isUUID(4).withMessage("The value should be UUID"),
  body("recever").notEmpty().isUUID(4).withMessage("The value should be UUID"),
  body("content").notEmpty().withMessage("the message should not empty"),
];

const getAllMessageValidator = () => [
  param("relationId")
    .notEmpty()
    .isUUID(4)
    .withMessage(
      "Verify the Url params. It should be an UUID of user relation"
    ),
];

const updateAMessageValidator = () => [
  param("messageId")
    .notEmpty()
    .isUUID(4)
    .withMessage("Verify the Url params. It should be an UUID of the Messages"),
  body("content").notEmpty().withMessage("the message should not empty"),
];

const deleteAMessageValidator = () => [
  param("messageId")
    .notEmpty()
    .isUUID(4)
    .withMessage("Verify the Url params. It should be an UUID of the Messages"),
];

const createChatGroupesValidator = () => [
  body("members")
    .isArray({ min: 2 })
    .isUUID(4)
    .withMessage("The members should be in minimum 2 user."),
  body("creator").notEmpty().isUUID(4).withMessage("The value should be UUID"),
  body("name").notEmpty().withMessage("the name should not empty"),
  body("description")
    .optional()
    .notEmpty()
    .withMessage("the description should not empty"),
  body("message")
    .optional()
    .notEmpty()
    .withMessage("the message should not empty"),
];

const sendMessageGroupeValidator = () => [
  param("messageId")
    .notEmpty()
    .isUUID(4)
    .withMessage(
      "Verify the Url params. It should be an UUID of the Groupe id"
    ),
  body("sender").notEmpty().isUUID(4).withMessage("The value should be UUID"),
  body("content").notEmpty().withMessage("the message should not empty"),
];

const getAllChatGroupeValidator = () => [
  param("userId")
    .notEmpty()
    .isUUID(4)
    .withMessage("Verify the Url params. It should be an UUID of the user"),
];

const getAllMessageGroupeValidator = () => [
  param("relationId")
    .notEmpty()
    .isUUID(4)
    .withMessage("Verify the Url params. It should be an UUID of Groupes id."),
];

const updateAGroupeValidator = () => [
  param("groupeId")
    .notEmpty()
    .isUUID(4)
    .withMessage("Verify the Url params. It should be an UUID of user id."),
  param("userId")
    .notEmpty()
    .isUUID(4)
    .withMessage("Verify the Url params. It should be an UUID of Groupes id."),
  body("members")
    .optional()
    .isArray({ min: 1 })
    .isUUID(4)
    .withMessage("The members add should be in minimum 1 user."),
  body("name").optional().notEmpty().withMessage("the name should not empty"),
  body("description")
    .optional()
    .notEmpty()
    .withMessage("the description should not empty"),
];

const deleteAGroupeMessagesValidator = () => [
  param("userId")
    .notEmpty()
    .isUUID(4)
    .withMessage("Verify the Url params. It should be an UUID of user id."),
  param("groupeMessageId")
    .notEmpty()
    .isUUID(4)
    .withMessage(
      "Verify the Url params. It should be an UUID of GroupeMessages id."
    ),
];

const deleteChatGroupeValidator = () => [
  param("groupeId")
    .notEmpty()
    .isUUID(4)
    .withMessage("Verify the Url params. It should be an UUID of Groupe id."),
];

const leaveChatGroupeValidator = () => [
  param("memberId")
    .notEmpty()
    .isUUID(4)
    .withMessage("Verify the Url params. It should be an UUID of Members id."),
];

module.exports = {
  updateAMessageValidator,
  postAMessagesValidator,
  getAllMessageValidator,
  deleteAMessageValidator,
  createChatGroupesValidator,
  sendMessageGroupeValidator,
  getAllChatGroupeValidator,
  getAllMessageGroupeValidator,
  updateAGroupeValidator,
  deleteAGroupeMessagesValidator,
  deleteChatGroupeValidator,
  leaveChatGroupeValidator,
};
