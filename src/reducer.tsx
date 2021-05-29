import { combineReducers } from "redux";
import reducers from "@/reducers";
//combineReducer的简单实现
// export default ((reducers: any) => {
//   return (state: any = {}, action: any) => {
//     return Object.keys(reducers).reduce((nextState: any, key) => {
//       nextState[key] = reducers[key](state[key], action);
//       return nextState;
//     }, {});
//   };
// })(reducers);
export default combineReducers(reducers);
