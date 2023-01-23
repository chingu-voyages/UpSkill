const { supabase } = require("../config/supabase");
const { validationResult } = require("express-validator");

const sendMessage = async ({ messages_id, sender, content }) => {
  return supabase
    .from("Messages")
    .insert({
      messages_id,
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
 * message routes
 */

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
          messages_id: data[0].id,
          sender,
          content,
        });

        return MessageError
          ? res.status(400).json(MessageError)
          : res.status(201).json(Message);
      }

      const { data: Message, error: MessageError } = await sendMessage({
        messages_id: Check[0].id,
        sender,
        content,
      });
      return MessageError
        ? res.status(400).json(MessageError)
        : res.status(201).json(Message);
    }

    const { data: Messages, error: MessagesError } = await sendMessage({
      messages_id: User_relation[0].id,
      sender,
      content,
    });

    return MessagesError
      ? res.status(400).json(error)
      : res.status(201).json(Messages);
  } catch (e) {
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
      .select(`*, User(*)`)
      .eq("messages_id", relationId);

    return MessagesError
      ? res.status(400).json(error)
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

/**
 * chat groupes Controllers
 */

/**
 *
 * and the input should be
 * { members:string[], creator:string, name:string, description:string, message:string }
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns
 */
const createChatGroupes = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    /**
     * @typedef {Object} Body
     * @property {string[]} members Should be an UUID
     * @property {string} creator UUID of an User
     * @property {string} name
     * @property {string} description
     * @property {string} message
     *
     */

    /**
     * @type {Body}
     */
    const { members, creator, name, description, message } = req.body;

    const { data: checkUserExist, error: UserError } = await supabase
      .from("User")
      .select("id")
      .eq("id", creator);

    if (UserError) return res.status(404).json({ UserError });

    const { data: Groupe, error } = await supabase
      .from("Groupes")
      .insert({ creator: checkUserExist[0]?.id, name, description })
      .select();

    if (error) return res.status(406).json(error);

    members.forEach(async (element) => {
      const { data: User, error: userError } = await supabase
        .from("User")
        .select("*")
        .eq("id", element);

      if (User.length === 0)
        return res.status(404).json({ error: "User Not Found." });

      if (userError) return res.status(406).json(error);

      const { error } = await supabase.from("Members").insert({
        groupe_id: Groupe[0]?.id,
        user_id: User[0]?.id,
      });
      if (error) return res.status(406).json(error);
    });

    if (message) {
      const { data, error } = await supabase
        .from("GroupeMessages")
        .insert({
          groupe_id: Groupe[0]?.id,
          sender: creator,
          content: message,
        })
        .select();

      return error ? res.status(400).json(error) : res.status(201).json(data);
    }

    return res.status(201).json(Groupe);
  } catch (error) {
    return res.status(500).json({ error, message: "Verify the URL" });
  }
};

/**
 *
 * and the input should be
 * { sender: string UUID, content: string }
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns
 */
const sendMessageGroupe = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    /**
     * @type {{groupeId: string}} should be UUID
     */
    const { groupeId } = req.params;

    /**
     * sender should be an UUID of User
     * @type {{sender: string, content: string}}
     */
    const { sender, content } = req.body;

    const { data: checkUserExist, error: UserError } = await supabase
      .from("User")
      .select("id")
      .eq("id", sender);

    if (UserError) return res.status(404).json({ UserError });

    const { data: groupeExist, error: groupeError } = await supabase
      .from("Groupes")
      .select("id")
      .eq("id", groupeId);

    console.log(groupeExist);
    if (groupeExist.length === 0)
      return res.status(404).json({ error: "Groupe does not exist." });

    if (groupeError) return res.status(404).json({ groupeError });

    const { data, error } = await supabase
      .from("GroupeMessages")
      .insert({
        groupe_id: groupeExist[0]?.id,
        sender: checkUserExist[0]?.id,
        content,
      })
      .select();

    return error ? res.status(406).json(error) : res.status(201).json(data);
  } catch (error) {
    return res.status(500).json({ error, message: "Verify the URL" });
  }
};

const getAllChatGroupe = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    /**
     * sender should be an UUID of User
     * @type {{userId: string}}
     */
    const { userId } = req.params;

    const { data, error } = await supabase
      .from("Members")
      .select("*, Groupes(*)")
      .eq("user_id", userId);

    if (data.length === 0)
      return res.status(404).json({ error: "No Groupe Found." });

    if (error) return res.status(406).json(error);

    const promiseArray = [...data].map(async (value) => {
      return supabase
        .from("GroupeMessages")
        .select("*")
        .eq("groupe_id", value?.groupe_id)
        .order("created_at", { ascending: false })
        .limit(1);
    });
    Promise.all(promiseArray)
      .then((results) => {
        return res.status(200).json(
          data.map((value, index) => {
            return { ...value, groupeMessages: results[index].data[0] };
          })
        );
        //process results
      })
      .catch((error) => {
        return res.status(404).json(error);
        //handle error
      });

    // return error ? res.status(404).json(error) : res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error, message: "Verify the URL" });
  }
};

const getAllMessageGroupe = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    /**
     * sender should be an UUID of User
     * @type {{groupeId: string}}
     */
    const { groupeId } = req.params;

    const { data, error } = await supabase
      .from("GroupeMessages")
      .select("*")
      .eq("groupe_id", groupeId)
      .order("created_at", { ascending: false })
      .limit(30);

    if (data.length === 0)
      return res
        .status(404)
        .json({ error: `No groupe founds for id : ${groupeId}` });

    return error ? res.status(404).json(error) : res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error, message: "Verify the URL" });
  }
};

/**
 *
 * and the input should be
 * { members: string[], name: string, description: string }
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns
 */
const updateAGroupe = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    /**
     * sender should be an UUID of User
     * @type {{groupeId: string, userId: string}}
     */
    const { userId, groupeId } = req.params;

    /**
     * @typedef {Object} Body
     * @property {string[]} members Should be an UUID
     * @property {string} name
     * @property {string} description
     *
     */

    /**
     * @type {Body}
     */
    const { members, name, description } = req.body;

    const { data, error } = await supabase
      .from("Groupes")
      .select("*")
      .eq("id", groupeId);

    if (data.length === 0)
      return res.status(404).json({ error: "Groupe not found." });

    if (error) return res.status(404).json(error);

    const { data: User, error: UserError } = await supabase
      .from("User")
      .select("first_name, last_name")
      .eq("id", userId);

    if (User.length === 0)
      return res.status(404).json({ error: "User not found." });

    if (UserError) return res.status(404).json(UserError);

    if (name) {
      const { error } = await supabase
        .from("Groupes")
        .update({ name })
        .eq("id", data[0].id);
      if (error) return res.status(406).json(error);
    }

    if (description) {
      const { error } = await supabase
        .from("Groupes")
        .update({ description })
        .eq("id", data[0].id);
      if (error) return res.status(406).json(error);
    }

    if (members) {
      members.forEach(async (element) => {
        const { data: User, error: userError } = await supabase
          .from("User")
          .select("*")
          .eq("id", element);

        if (data.length === 0)
          return res.status(404).json({ error: "User Not Found." });

        if (userError) return res.status(406).json(error);

        const { error } = await supabase.from("Members").insert({
          groupe_id: data[0]?.id,
          user_id: User[0]?.id,
        });
        if (error) return res.status(406).json(error);
      });
    }

    return res.status(200).json({
      data: "Updated successfully.",
      message: `${User[0].first_name} ${User[0].first_name} update the groupe chat.`,
    });
  } catch (error) {
    return res.status(500).json({ error, message: "Verify the URL" });
  }
};

const deleteAGroupeMessages = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    /**
     * @type {{ userId: string, groupeMessagesId: string}}
     */
    const { userId, groupeMessageId } = req.params;

    const { data: User, error: UserError } = await supabase
      .from("User")
      .select("id")
      .eq("id", userId);

    if (User.length === 0)
      return res.status(404).json({ error: "Verify the Url." });

    if (UserError) return res.status(406).json(error);
    console.log(req.params);
    const { error } = await supabase
      .from("GroupeMessages")
      .delete()
      .eq("id", groupeMessageId);

    return error
      ? res.status(406).json({ error })
      : res.status(204).json({ success: "Deleted successfully." });
  } catch (error) {
    return res.status(500).json({ error, message: "Verify the URL" });
  }
};

const deleteChatGroupe = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    /**
     * @type {{groupeId: string}}
     */
    const { groupeId } = req.params;
    const { data: groupe, error: groupeError } = await supabase
      .from("Groupes")
      .select("id")
      .eq("id", groupeId);

    if (groupe.length === 0)
      return res.status(404).json({ error: "Groupe NOt Found." });

    if (groupeError) return res.status(406).json(groupeError);

    const { error } = await supabase
      .from("Groupes")
      .delete()
      .eq("id", groupeId);

    return error
      ? res.status(406).json(error)
      : res.status(204).json({ success: "Delete successfully." });
  } catch (error) {
    return res.status(500).json({ error, message: "Verify the URL" });
  }
};

/**
 *
 * and the input should be
 * {user_id: string} UUID
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns
 */
const leaveChatGroupe = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    /**
     * @type {{memberId: string}}
     */
    const { memberId } = req.params;

    const { error } = await supabase
      .from("Members")
      .delete()
      .eq("id", memberId);
    return error ? res.status(406).json(error) : res.status(204).json();
  } catch (error) {
    return res.status(500).json({ error, message: "Verify the URL" });
  }
};

module.exports = {
  postAMessage,
  getAllMessage,
  updateAMessage,
  deleteAMessage,
  createChatGroupes,
  getAllMessageGroupe,
  getAllChatGroupe,
  updateAGroupe,
  deleteAGroupeMessages,
  deleteChatGroupe,
  leaveChatGroupe,
  sendMessageGroupe,
};
