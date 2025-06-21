import { PAGECONFIG_CURRENT_PAGE, PAGECONFIG_PAGINATION_RESET, PAGECONFIG_RECORDS_PER_PAGE, PAGECONFIG_TOTAL_RECORDS,PAGECONFIG_GET_CONfIG } from "../const";


const initialState = {
    totalRecords:0,
    itemsPerPage:15,
    currentPage:1,
    recordsConfig:null
};

export function PageConfigReducer(state = initialState, action) {
  switch (action.type) {
    case PAGECONFIG_TOTAL_RECORDS:
      return {
        ...state,
        totalRecords: action.payload
      };
    case PAGECONFIG_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload
      };

    case PAGECONFIG_RECORDS_PER_PAGE:
    return {
        ...state,
        itemsPerPage: action.payload
      };
      case PAGECONFIG_PAGINATION_RESET:
        return {
            ...state,
            currentPage:1,
            itemsPerPage: state.itemsPerPage
          };
          case PAGECONFIG_GET_CONfIG:
            return {
              ...state,
              recordsConfig: action.payload
            };
      
    default:
      return state;
  }
}
