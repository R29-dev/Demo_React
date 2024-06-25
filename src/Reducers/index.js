import { combineReducers } from "redux";
import hobbyReducers from "./hobby";;
const rootReducer = combineReducers({
    hobby : hobbyReducers,

})
export default rootReducer;