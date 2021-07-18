import { combineReducers } from "redux";
import authReducer from "./auth.reducers";
import errorReducer from "./errors.reducer";

const rootReducer = combineReducers({
    auth: authReducer,
    errors: errorReducer
});

export default rootReducer;