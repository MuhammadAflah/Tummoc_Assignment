import { SET_ISLOADING, SET_TOKEN, SET_USERNAME } from "./actionTypes";

const initState = {
  token: null,
  isLoading: false,
  username: null,
};

export const reducer = (state = initState, { type, payload }) => {
  switch (type) {
    case SET_TOKEN:
      return {
        ...state,
        token: payload,
      };

    case SET_ISLOADING:
      return {
        ...state,
        isLoading: payload,
      };
    case SET_USERNAME:
      return {
        ...state,
        username: payload,
      };

    default:
      return state;
  }
};
