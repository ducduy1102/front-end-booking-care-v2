import actionTypes from "./actionTypes";
import {
  getAllCodeService,
  createNewUser,
  getAllUsers,
  deleteUser,
} from "../../services/userService";
import { toast } from "react-toastify";

// Gender
export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_GENDER_START,
      });
      let res = await getAllCodeService("GENDER");
      if (res && res.errCode === 0) {
        dispatch(fetchGenderSuccess(res.data));
      } else {
        dispatch(fetchGenderFailed());
      }
    } catch (error) {
      dispatch(fetchGenderFailed());
      console.log("fetchGenderFailed", error);
    }
  };
};

export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData,
});

export const fetchGenderFailed = () => ({
  type: actionTypes.FETCH_GENDER_FAILED,
});

// Position
export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("POSITION");
      if (res && res.errCode === 0) {
        dispatch(fetchPositionSuccess(res.data));
      } else {
        dispatch(fetchPositionFailed());
      }
    } catch (error) {
      dispatch(fetchPositionFailed());
      console.log("fetchPositionFailed", error);
    }
  };
};

export const fetchPositionSuccess = (positionData) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: positionData,
});

export const fetchPositionFailed = () => ({
  type: actionTypes.FETCH_POSITION_FAILED,
});

// Role
export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("ROLE");
      if (res && res.errCode === 0) {
        dispatch(fetchRoleSuccess(res.data));
      } else {
        dispatch(fetchRoleFailed());
      }
    } catch (error) {
      dispatch(fetchRoleFailed());
      console.log("fetchRoleFailed", error);
    }
  };
};

export const fetchRoleSuccess = (roleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: roleData,
});

export const fetchRoleFailed = () => ({
  type: actionTypes.FETCH_ROLE_FAILED,
});

export const createNewUserStart = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewUser(data);
      if (res && res.errCode === 0) {
        dispatch(saveUserSuccess());
        toast.success("Create new user successfully!");
        dispatch(fetchAllUserStart());
      } else {
        toast.error("Create user failed!");
        dispatch(saveUserFailed());
      }
    } catch (error) {
      toast.error("Create user failed!");
      dispatch(saveUserFailed());
      console.log("createNewUserFailed", error);
    }
  };
};

export const saveUserSuccess = (roleData) => ({
  type: actionTypes.CREATE_USER_SUCCESS,
});

export const saveUserFailed = () => ({
  type: actionTypes.CREATE_USER_FAILED,
});

// Fetch all user
export const fetchAllUserStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllUsers("ALL");
      if (res && res.errCode === 0) {
        dispatch(fetchAllUserSuccess(res.users.reverse()));
      } else {
        toast.error("Fetch all users error!");
        dispatch(fetchAllUserFailed());
      }
    } catch (error) {
      toast.error("Fetch all users error!");
      dispatch(fetchAllUserFailed());
      console.log("fetchAllUserFailed", error);
    }
  };
};

export const fetchAllUserSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_USER_SUCCESS,
  users: data,
});

export const fetchAllUserFailed = () => ({
  type: actionTypes.FETCH_ALL_USER_FAILED,
});

// Delete user
export const deleteUserStart = (userId) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteUser(userId);
      if (res && res.errCode === 0) {
        dispatch(deleteUserSuccess());
        toast.success("Delete user successfully!");
        dispatch(fetchAllUserStart());
      } else {
        dispatch(deleteUserFailed());
      }
    } catch (error) {
      toast.error("Delete user failed!");
      dispatch(deleteUserFailed());
      console.log("deleteNewUserFailed", error);
    }
  };
};

export const deleteUserSuccess = (roleData) => ({
  type: actionTypes.DELETE_USER_SUCCESS,
});

export const deleteUserFailed = () => ({
  type: actionTypes.DELETE_USER_FAILED,
});
