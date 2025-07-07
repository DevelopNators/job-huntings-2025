import {
  GET_JOBS_JOB_HUNTING_ACTION,
  SET_JOBS_JOB_HUNTING_ACTION,
  GET_CATEGORIES_ACTION,
  SET_CATEGORIES_ACTION,
  SET_FEATURED_ACTION,
  GET_FEATURED_ACTION,
  SET_JOB_JOB_HUNTING_ACTION,
  GET_JOB_JOB_HUNTING_ACTION,
  GET_JOBS_BOOKJOB_HUNTING_ACTION,
  SET_JOBS_BOOKJOB_HUNTING_ACTION,
  GET_SIMILAR_JOBS_JOB_HUNTING_ACTION,
  SET_SIMILAR_JOBS_JOB_HUNTING_ACTION,
  GET_USER_POSTS_HUNTING_ACTION,
  SET_USER_POSTS_HUNTING_ACTION,
} from "../const";

const initialState = {
  jobs: [],
  featuredItems: [],
  userPosts: [],

  similarItems: [],
  categories: [],
  job: {},
  bookmarkJobs: [],
};

export function JobHuntingReducer(state = initialState, action) {
  switch (action.type) {
    case GET_JOBS_JOB_HUNTING_ACTION:
      return {
        ...state,
        jobs: [],
      };
    case SET_JOBS_JOB_HUNTING_ACTION:
      return {
        ...state,
        jobs: action.payload,
      };
    case GET_USER_POSTS_HUNTING_ACTION:
      return {
        ...state,
        userPosts: [],
      };
    case SET_USER_POSTS_HUNTING_ACTION:
      return {
        ...state,
        userPosts: action.payload,
      };
    case GET_SIMILAR_JOBS_JOB_HUNTING_ACTION:
      return {
        ...state,
        similarItems: [],
      };
    case SET_SIMILAR_JOBS_JOB_HUNTING_ACTION:
      return {
        ...state,
        similarItems: action.payload,
      };
    case GET_JOBS_BOOKJOB_HUNTING_ACTION:
      return {
        ...state,
        bookmarkJobs: [],
      };
    case SET_JOBS_BOOKJOB_HUNTING_ACTION:
      return {
        ...state,
        bookmarkJobs: action.payload,
      };
    case GET_JOB_JOB_HUNTING_ACTION:
      return {
        ...state,
        job: {},
      };
    case SET_JOB_JOB_HUNTING_ACTION:
      return {
        ...state,
        job: action.payload,
      };
    case GET_CATEGORIES_ACTION:
      return {
        ...state,
        categories: [],
      };
    case SET_CATEGORIES_ACTION:
      return {
        ...state,
        categories: action.payload,
      };
    case GET_FEATURED_ACTION:
      return {
        ...state,
        featuredItems: [],
      };
    case SET_FEATURED_ACTION:
      return {
        ...state,
        featuredItems: action.payload,
      };
    default:
      return state;
  }
}
