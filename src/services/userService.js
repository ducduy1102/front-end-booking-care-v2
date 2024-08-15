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

const getAllCodeService = (type) => {
  return axios.get(`/api/allcode?type=${type}`);
};

const getTopDoctorHomeService = (limit) => {
  return axios.get(`/api/top-doctor-home?limit=${limit}`);
};

const getAllDoctorsService = () => {
  return axios.get("/api/get-all-doctors");
};

const saveDetailDoctorService = (data) => {
  return axios.post("/api/save-infor-doctor", data);
};

const getDetailInforDoctorService = (doctorId) => {
  return axios.get(`/api/get-detail-doctor-by-id?id=${doctorId}`);
};

const saveBulkScheduleDoctorService = (data) => {
  return axios.post("/api/bulk-create-schedule", data);
};

const getScheduleDoctorByDateService = (doctorId, date) => {
  return axios.get(
    `/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`
  );
};

const getExtraInforDoctorByIdService = (doctorId) => {
  return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`);
};

const getProfileDoctorByIdService = (doctorId) => {
  return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`);
};

const postPatientBookAppointment = (data) => {
  return axios.post("/api/patient-book-appointment", data);
};

const postVerifyBookAppointment = (data) => {
  return axios.post("/api/verify-book-appointment", data);
};

const createNewSpecialtyService = (data) => {
  return axios.post("/api/create-new-specialty", data);
};

const getAllSpecialtyService = () => {
  return axios.get("/api/get-specialty");
};

export {
  handleLogin,
  getAllUsers,
  createNewUser,
  deleteUser,
  editUser,
  getAllCodeService,
  getTopDoctorHomeService,
  getAllDoctorsService,
  saveDetailDoctorService,
  getDetailInforDoctorService,
  saveBulkScheduleDoctorService,
  getScheduleDoctorByDateService,
  getExtraInforDoctorByIdService,
  getProfileDoctorByIdService,
  postPatientBookAppointment,
  postVerifyBookAppointment,
  createNewSpecialtyService,
  getAllSpecialtyService,
};
