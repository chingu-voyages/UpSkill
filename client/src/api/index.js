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

export const updateBio = (id, about, hobbies, mission) => {
  return instance.put("/user/info", {
    id,
    about,
    hobbies,
    mission,
  });
};

export const updateSkills = (id, skills) => {
  return instance.put("/user/info", {
    id,
    skills,
  });
};
