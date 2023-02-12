import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_SERVER,
});

export const loginAPI = credentials =>
  instance.post("/auth/login", credentials);

export const signupAPI = credentials =>
  instance.post("/auth/signup", credentials);

export const getUserInfo = id => {
  return instance.get(`/user/id/${id}`);
};

export const getConversation = userid =>
  instance.get(`messages/conversation/${userid}`);

export const getMessages = relationId => instance.get(`messages/${relationId}`);

export const postAMessage = (relationId, credentials) =>
  instance.post(`/messages/q/${relationId}`, credentials);

export const updateBio = (id, about, hobbies, mission, token) => {
  return instance.put("/user/info", {
    id,
    about,
    hobbies,
    mission,
    token,
  });
};

export const updateSkills = (id, skills, token) => {
  return instance.put("/user/info", {
    id,
    skills,
    token,
  });
};

export const updatePhoto = formData => {
  return instance.put("/user/photo", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
