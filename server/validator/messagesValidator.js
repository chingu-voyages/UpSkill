const { body, param } = require("express-validator");

const postAMessagesValidator = () => [
  param("relationId")
    .optional()
    .isUUID(4)
    .withMessage(
      "Verify the Url params. It should be an UUID of user relation"
    ),
  body("sender")
    .notEmpty()
    .isUUID(4)
    .withMessage("The value should be UUID"),
  body("recever")
    .optional()
    .isUUID(4)
    .withMessage("The value should be UUID"),
  body("content")
    .notEmpty()
    .withMessage("the message should not empty"),
];

const getAllMessageValidator = () => [
  param("relationId")
    .notEmpty()
    .isUUID(4)
    .withMessage(
      "Verify the Url params. It should be an UUID of user relation"
    ),
];

const getAllConversationValidator = () => [
  param("userId")
    .notEmpty()
    .isUUID(4)
    .withMessage("Verify the Url params. It should be an UUID of User"),
];

const updateAMessageValidator = () => [
  param("messageId")
    .notEmpty()
    .isUUID(4)
    .withMessage("Verify the Url params. It should be an UUID of the Messages"),
  body("content")
    .notEmpty()
    .withMessage("the message should not empty"),
];

const deleteAMessageValidator = () => [
  param("messageId")
    .notEmpty()
    .isUUID(4)
    .withMessage("Verify the Url params. It should be an UUID of the Messages"),
];

module.exports = {
  updateAMessageValidator,
  postAMessagesValidator,
  getAllMessageValidator,
  getAllConversationValidator,
  deleteAMessageValidator,
};
