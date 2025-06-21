import { GET_PROFILE_ACTION, SET_PROFILE_ACTION } from "../const";

const initialState = {
  profile: null,
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE_ACTION:
      return {
        ...state,
        profile: action.payload,
      };
    case SET_PROFILE_ACTION:
      return {
        ...state,
        profile: action.payload,
      };

    default:
      return state;
  }
};

export default AuthReducer;
