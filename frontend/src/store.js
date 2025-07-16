// import { applyMiddleware, combineReducers, createStore } from "redux";
// import { composeWithDevTools } from "redux-devtools-extension";
// import { thunk } from "redux-thunk";

// import {
//   userDeleteReducer,
//   userDetailsReducer,
//   userListReducer,
//   userLoginReducer,
//   userRegisterReducer,
//   userUpdateProfileReducer,
//   userUpdateReducer,
// } from "./reducers/userReducer";
// import {
//   blogCreateReducer,
//   blogDeleteReducer,
//   blogDetailsReducer,
//   blogListReducer,
//   blogUpdateReducer,
// } from "./reducers/blogReducer";

// const reducer = combineReducers({
//   userLogin: userLoginReducer,
//   userRegister: userRegisterReducer,
//   userDetails: userDetailsReducer,
//   userUpdateProfile: userUpdateProfileReducer,
//   userList: userListReducer,
//   userDelete: userDeleteReducer,
//   userUpdate: userUpdateReducer,
//   blogCreate: blogCreateReducer,
//   blogList: blogListReducer,
//   blogDelete: blogDeleteReducer,
//   blogDetails: blogDetailsReducer,
//   blogUpdate: blogUpdateReducer,
// });

// const userInfoFromStorage = localStorage.getItem("userInfo")
//   ? JSON.parse(localStorage.getItem("userInfo"))
//   : null;

// const initialState = {
//   userLogin: { userInfo: userInfoFromStorage },
// };

// const middlewares = [thunk];

// const store = createStore(
//   reducer,
//   initialState,
//   composeWithDevTools(applyMiddleware(...middlewares))
// );

// export default store;
import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk } from "redux-thunk"; // Importing thunk directly instead of { thunk }
import {
  userDeleteReducer,
  userDetailsReducer,
  userListReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
  userUpdateReducer,
} from "./reducers/userReducer";
import {
  blogCreateReducer,
  blogDeleteReducer,
  blogDetailsReducer,
  blogListReducer,
  blogUpdateReducer,
} from "./reducers/blogReducer";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  blogCreate: blogCreateReducer,
  blogList: blogListReducer,
  blogDelete: blogDeleteReducer,
  blogDetails: blogDetailsReducer,
  blogUpdate: blogUpdateReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middlewares = [thunk];

// Create store without Redux DevTools Extension
const store = createStore(
  reducer,
  initialState,
  applyMiddleware(...middlewares)
);

export default store;
