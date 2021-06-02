import { combineReducers } from "redux";
import reducer from "@/reducers/index2";
import Article from "./article";
//combineReducer的简单实现
// export default ((reducers: any) => {
//   return (state: any = {}, action: any) => {
//     return Object.keys(reducers).reduce((nextState: any, key) => {
//       nextState[key] = reducers[key](state[key], action);
//       return nextState;
//     }, {});
//   };
// })(reducers);
const reducers = Object.assign(Article, reducer);
export default combineReducers(reducers);
