import axios from "../axios";

const handleLogin = (email, password) => {
  return axios.post("/api/login", { email, password });
};

const getAllUsers = (inputId) => {
  return axios.get(`/api/get-all-users?id=${inputId}`);
};

const createNewUser = (userData) => {
  return axios.post("/api/create-new-user", {
    ...userData,
  });
};

const deleteUser = (userId) => {
  return axios.delete("/api/delete-user", { data: { id: userId } });
};

const editUser = (userData) => {
  return axios.put("/api/edit-user", userData);
};

export { handleLogin, getAllUsers, createNewUser, deleteUser, editUser };
