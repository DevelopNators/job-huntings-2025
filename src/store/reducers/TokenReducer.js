// reducers/TokenReducer.js

export const SET_TOKEN = 'SET_TOKEN';
export const CLEAR_TOKEN = 'CLEAR_TOKEN';
export const SET_DECODED_TOKEN = 'SET_DECODED_TOKEN';
export const SET_AUTHENTICATED = 'SET_AUTHENTICATED';
export const GET_TOKEN = 'GET_TOKEN';

const initialState = {
  token: null,
  decodedToken: null,
  isAuthenticated: false, // Track if the user is authenticated
};

const TokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case SET_DECODED_TOKEN:
      return {
        ...state,
        decodedToken: action.payload,
      };
    case SET_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: action.payload,
      };
    case CLEAR_TOKEN:
      return {
        ...state,
        token: null,
        decodedToken: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default TokenReducer;
