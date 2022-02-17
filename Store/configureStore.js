import {combineReducers, createStore} from "redux";
import worldReducer from "./worldReducer";


export default createStore(worldReducer);