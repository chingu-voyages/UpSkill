import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getConversation, getMessages, getUserInfo } from "../../api";

export const conversations = createAsyncThunk(
  "messages/conversations",
  async (credential, thunkAPI) => {
    try {
      const response = await getConversation(credential);
      const conversationList = await Promise.all(
        response?.data.map(async (value) => {
          let res;
          if (value.user1_id === credential) {
            res = await getUserInfo(value.user2_id);
          } else {
            res = await getUserInfo(value.user1_id);
          }
          return {
            conversation_id: value.id,
            user: res.data,
          };
        })
      );
      return conversationList;
    } catch (error) {
      if (error.response) {
        throw new Error(JSON.stringify(error.response?.data));
      }
      throw new Error(JSON.stringify({ Error: "Network error!" }));
    }
  }
);

const messageSlice = createSlice({
  name: "messages",
  initialState: {
    conversations: [],
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(conversations.fulfilled, (state, action) => {
        state.conversations = action.payload;
      })
      .addCase(conversations.rejected, (state, action) => {
        state.error = JSON.parse(action.error.message)?.Error;
      });
  },
});

export const {} = messageSlice.actions;

export default messageSlice.reducer;
