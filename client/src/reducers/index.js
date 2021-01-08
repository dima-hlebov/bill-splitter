import { combineReducers } from 'redux'
import auth from "./auth";
import rooms from "./rooms";
import modal from "./modal"
import room from "./room"

export default combineReducers({
  auth,
  rooms,
  modal,
  room
})