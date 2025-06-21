import {
  GET_JOBS_JOB_HUNTING_ACTION,
  SET_JOBS_JOB_HUNTING_ACTION,
  GET_CATEGORIES_ACTION,
  SET_CATEGORIES_ACTION,
  SET_FEATURED_ACTION,
  SET_JOB_JOB_HUNTING_ACTION,
  SET_JOBS_BOOKJOB_HUNTING_ACTION,
  SET_SIMILAR_JOBS_JOB_HUNTING_ACTION,
} from "../const";

import { toast } from "react-toastify";

import {
  setPageConfigTotalRecordsAction,
  setRecordsConfigAction,
} from "./PaginationAtion";
import api from "../../services/api";
import { Controllers } from "../../enums/Controllers";
import AlertPopUp from "../../utils/AlertPopUp";

export function getFeaturedAction(data) {
  return (dispatch, getState) => {
    api
      .getAll(Controllers.JobHunting, { ...data, pageSize: 10 }, "GetNewJobs")
      .then((response) => {
        dispatch(setFeaturedAction(response.data?.jobs));
      })
      .catch((err) => {
        toast.error(err.message + "!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };
}
export function getSimilarJobsAction(data) {
  return (dispatch, getState) => {
    api
      .getAll(Controllers.JobHunting, { ...data, pageSize: 5 }, "GetNewJobs")
      .then((response) => {
        dispatch(setSimilarAction(response.data?.jobs));
      })
      .catch((err) => {
        toast.error(err.message + "!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };
}
export function getAllJobsAction(data) {
  return (dispatch, getState) => {
    api
      .getAll(Controllers.JobHunting, data, "GetNewJobs")
      .then((response) => {
        dispatch(setJobsAction(response.data?.jobs));
        dispatch(setRecordsConfigAction(response.data?.config));
        dispatch(
          setPageConfigTotalRecordsAction(response.data?.config?.recordsCount)
        );
      })
      .catch((err) => {
        toast.error(err.message + "!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };
}
export function getSingleJobAction(data) {
  return (dispatch, getState) => {
    api
      .getAll(Controllers.JobHunting, data, "GetNewJob")
      .then((response) => {
        dispatch(setJobAction(response.data?.job));
      })
      .catch((err) => {
        toast.error(err.message + "!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };
}
export function bookmarkedJobsAction(data = null) {
  return (dispatch, getState) => {
    api
      .getAll(Controllers.JobHunting, null, "GetBookMarkedJobs")
      .then((response) => {
        dispatch(setBookmarkedJobsAction(response.data?.jobs));
      })
      .catch((err) => {
        return handleError(err, "getProfileDetailsAction");
      });
  };
}
export function jobBookmarkAction(data = null) {
  return (dispatch, getState) => {
    api
      .add(Controllers.JobHunting, null, "BookMarkPost", data)
      .then((response) => {
        AlertPopUp(response.status, response.message, "", "Bookmard add");
        dispatch(bookmarkedJobsAction()); // Store token in Redux and localStorage
      })
      .catch((err) => {
        return handleError(err, "getProfileDetailsAction");
      })
      .finally(() => {
        if (callback !== null && callback && typeof callback === "function") {
          callback();
        }
      });
  };
}
export function removeJobBookmarkAction(data = null) {
  return (dispatch, getState) => {
    api
      .remove(Controllers.Auth, null, "DeleteBookMarkPost", data)
      .then((response) => {
        AlertPopUp(response.status, response.message, "", "Bookmard add");
        dispatch(bookmarkedJobsAction()); // Store token in Redux and localStorage
      })
      .catch((err) => {
        return handleError(err, "getProfileDetailsAction");
      })
      .finally(() => {
        if (callback !== null && callback && typeof callback === "function") {
          callback();
        }
      });
  };
}
export function getJobCategoryAction(data) {
  return (dispatch, getState) => {
    api
      .getAll(Controllers.JobHunting, data, "GetNewJobCategories")
      .then((response) => {
        dispatch(getFeaturedJobsAction(response.data?.jobs));
      })
      .catch((err) => {
        toast.error(err.message + "!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };
}

export function setJobsAction(data) {
  return {
    type: SET_JOBS_JOB_HUNTING_ACTION,
    payload: data,
  };
}
export function setJobAction(data) {
  return {
    type: SET_JOB_JOB_HUNTING_ACTION,
    payload: data,
  };
}

export function setJobsCategoryAction(data) {
  return {
    type: SET_CATEGORIES_ACTION,
    payload: data,
  };
}
export function setFeaturedAction(data) {
  return {
    type: SET_FEATURED_ACTION,
    payload: data,
  };
}
export function setSimilarAction(data) {
  return {
    type: SET_SIMILAR_JOBS_JOB_HUNTING_ACTION,
    payload: data,
  };
}
export function setBookmarkedJobsAction(data) {
  return {
    type: SET_JOBS_BOOKJOB_HUNTING_ACTION,
    payload: data,
  };
}
