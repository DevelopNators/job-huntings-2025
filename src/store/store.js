import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { thunk } from "redux-thunk";
import TokenReducer from "./reducers/TokenReducer";
import { JobHuntingReducer } from "./reducers/JobHuntingReducer";
import { PageConfigReducer } from "./reducers/PaginationReducer";
import jobsReducer from "./slices/jobsSlice";
import userReducer from "./slices/userSlice";
import filtersReducer from "./slices/filtersSlice";
import AuthReducer from "./reducers/AuthReducer";
const middleware = applyMiddleware(thunk);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers({
  jobhunting: JobHuntingReducer,
  pageConfig: PageConfigReducer,
  jobs: jobsReducer,
  user: userReducer,
  filters: filtersReducer,
  token: TokenReducer,
  auth: AuthReducer,
});

export const store = createStore(reducers, composeEnhancers(middleware));
