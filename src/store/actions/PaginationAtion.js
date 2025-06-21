

import { PAGECONFIG_CURRENT_PAGE, PAGECONFIG_PAGINATION_RESET, PAGECONFIG_RECORDS_PER_PAGE, PAGECONFIG_TOTAL_RECORDS,PAGECONFIG_GET_CONfIG } from "../const";

export function setCurrentPageConfigAction(data) {
    return {
      type: PAGECONFIG_CURRENT_PAGE,
      payload: data,
    };
  }

  export function setPageConfigRecordPerPageAction(data) {
    return {
      type: PAGECONFIG_RECORDS_PER_PAGE,
      payload: data,
    };
  }
  export function setPageConfigTotalRecordsAction(data) {
    return {
      type: PAGECONFIG_TOTAL_RECORDS,
      payload: data,
    };
  }

  export function setPageConfigResetAction(data) {
    return {
      type: PAGECONFIG_PAGINATION_RESET,
      payload: data,
    };
  }

  export function setRecordsConfigAction(data) {
    return {
      type: PAGECONFIG_GET_CONfIG,
      payload: data,
    };
  }