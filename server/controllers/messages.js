const { supabase } = require("../config/supabase");
const { validationResult } = require("express-validator");

const sendMessage = async ({ relation_id, sender, content }) => {
  return supabase
    .from("Messages")
    .insert({
      relation_id,
      sender,
      content,
    })
    .select();
};

const checkrelation = async (user1, user2) => {
  return supabase
    .from("User_relation")
    .select("id")
    .or(
      `and(user1_id.eq.${user1},user2_id.eq.${user2}),and(user1_id.eq.${user2},user2_id.eq.${user1})`
    );
};

/**
 *
 * the input should be:
 * {sender: string, recever: string, content: string}
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns
 */
const postAMessage = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { relationId } = req.params;
    /**
     * @type {{sender: string, recever: string, content: string}}
     * sender and recever should be an UUID of an User
     */
    const { sender, recever, content } = req.body;

    /**
     * User_relation: {id: string}[] | null
     * UserRelatio_error: PostgrestError | null
     */
    const { data: User_relation, error: UserRelation_error } = await supabase
      .from("User_relation")
      .select("id")
      .eq("id", relationId);

    if (UserRelation_error && UserRelation_error.code === "22P02") {
      /**
       * chech if there are yet a relation between them
       */
      const { data: Check, error: chekcError } = await checkrelation(
        sender,
        recever
      );

      if (chekcError) return res.status(400).json(chekcError);

      if (!Check.length) {
        const { data, error } = await supabase
          .from("User_relation")
          .insert({ user1_id: sender, user2_id: recever })
          .select("id");

        if (error) return res.status(400).json(error);

        const { data: Message, error: MessageError } = await sendMessage({
          relation_id: data[0].id,
          sender,
          content,
        });

        return MessageError
          ? res.status(400).json(MessageError)
          : res.status(201).json(Message);
      }

      const { data: Message, error: MessageError } = await sendMessage({
        relation_id: Check[0].id,
        sender,
        content,
      });
      return MessageError
        ? res.status(400).json(MessageError)
        : res.status(201).json(Message);
    }

    const { data: Messages, error: MessagesError } = await sendMessage({
      relation_id: User_relation[0].id,
      sender,
      content,
    });

    return MessagesError
      ? res.status(400).json(MessagesError)
      : res.status(201).json(Messages);
  } catch (error) {
    return res.status(500).json({ error, message: "Verify the URL" });
  }
};

const getAllConversation = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { userId } = req.params;

    const { data, error } = await supabase
      .from("User_relation")
      .select(`*`)
      .or(`user1_id.eq.${userId},user2_id.eq.${userId}`);

    if (!data.length)
      return res.status(404).json({ message: "No conversation found." });

    return error ? res.status(400).json(error) : res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error, message: "Verify the URL" });
  }
};

const getAllMessage = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { relationId } = req.params;
    /**
     * Messages: {id: string}[] | null
     * MessagesError: PostgrestError | null
     */
    const { data: Messages, error: MessagesError } = await supabase
      .from("Messages")
      .select(`*`)
      .eq("relation_id", relationId)
      .order("created_at", { ascending: true })
      .limit(30);

    return MessagesError
      ? res.status(400).json(MessagesError)
      : res.status(200).json(Messages);
  } catch (error) {
    return res.status(500).json({ error, message: "Verify the URL" });
  }
};

/**
 *
 * and the input should be
 * {content:string}
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns
 */
const updateAMessage = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    /**
     * @type {{messageId: string}}
     * UUID of the message
     */
    const { messageId } = req.params;

    /**
     * @type {{content:string}}
     */
    const { content } = req.body;

    const { data, error } = await supabase
      .from("Messages")
      .update({ content })
      .eq("id", messageId)
      .select();
    return error ? res.status(406).json(error) : res.status(202).json(data);
  } catch (error) {
    return res.status(500).json({ error, message: "Verify the URL" });
  }
};

const deleteAMessage = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { messageId } = req.params;

    const { error } = await supabase
      .from("Messages")
      .delete()
      .eq("id", messageId);

    return error
      ? res.status(406).json(error)
      : res.status(200).json({ data: "Message deleted" });
  } catch (error) {
    return res.status(500).json({ error, message: "Verify the URL" });
  }
};

module.exports = {
  postAMessage,
  getAllMessage,
  getAllConversation,
  updateAMessage,
  deleteAMessage,
};
