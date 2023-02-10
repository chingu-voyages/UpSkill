/*For direct transfer of tokens between users

I coded this out before making changes to the way the lessons are organised in terms of token verification and transfers. So perhaps this code will not be needed any longer.

I have left it in there just in case we ever want to set up a way for users to directly transfer tokens between each other, like sharing tokens etc in the future, as that could be an interesting feature and inline with our vision of developing an open community based on sharing information and resources.
*/

const { supabase } = require("../config/supabase");

const sendTokens = async (req, res) => {
  try {
    const { recipientId, senderId } = req.body;
    let { tokensSent } = req.body;

    //If ID are missing trigger error responses
    if (!recipientId) return res.status(400).json("Recipient User ID Missing");
    if (!senderId) return res.status(400).json("Sender User ID Missing");

    //Default value of token if not specified = 1
    if (!tokensSent) {
      tokensSent = 1;
    }

    if (recipientId && senderId) {
      //Check Sender's current token count
      const { data: Sender, sendErr } = await supabase
        .from("User_data")
        .select("tokens")
        .eq("userId", senderId);

      //If Sender wasn't found in the DB trigger an error repsonse
      if (!Sender) {
        return res.status(404).json({ Sending_User_Not_Found: sendErr });
      }
      const senderTokens = Number(Sender[0].tokens);

      // Get Recipient User's current Token count
      const { data: Receiver, receiverErr } = await supabase
        .from("User_data")
        .select("tokens")
        .eq("userId", recipientId);

      //If Receiver wasn't found in the DB trigger an error repsonse
      if (!Receiver) {
        return res.status(404).json({ Receiving_User_Not_Found: receiverErr });
      }
      const receiverTokens = Number(Receiver[0].tokens);

      if (senderTokens < tokensSent) {
        return res
          .status(400)
          .json("User does not have enough tokens for this transaction");
      } else {
        const tokenCountAfterSending = senderTokens - Number(tokensSent);
        await supabase
          .from("User_data")
          .update({
            tokens: tokenCountAfterSending,
          })
          .eq("userId", senderId);
      }

      //Increment Receiving User's current token count by the tokensSent
      const tokenCountAfterReceiving = receiverTokens + Number(tokensSent);
      await supabase
        .from("User_data")
        .update({
          tokens: tokenCountAfterReceiving,
        })
        .eq("userId", recipientId);

      return res.status(200).json("Tokens sent and received");
    }
  } catch (error) {
    return res.status(500).json({ Error_sending_tokens: error });
  }
};
module.exports = { sendTokens };
