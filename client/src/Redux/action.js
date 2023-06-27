const { SET_TOKEN, SET_ISLOADING, SET_USERNAME } = require("./actionTypes");

export const setToken = (data) => ({
  type: SET_TOKEN,
  payload: data,
});

export const setIsLoading = (data) => ({
  type: SET_ISLOADING,
  payload: data,
});

export const setUserName = (data) => ({
  type: SET_USERNAME,
  payload: data,
});
