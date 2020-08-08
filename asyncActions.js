const redux = require("redux");
const createStore = redux.createStore;

const applyMiddleWare = redux.applyMiddleware;
const thunkMiddleware = require("redux-thunk").default;
const axios = require("axios");

const initialState = {
  loading: false,
  users: [],
  error: "",
  info: "",
};

//Actions
const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE ";

//Action creators
const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUEST,
    info: "Fetching users data",
  };
};

const fetchUsersSuccess = (users) => {
  return {
    type: FETCH_USERS_SUCCESS,
    info: "Fetching users success",
    payload: users,
  };
};
const fetchUsersFailure = (error) => {
  return {
    type: FETCH_USERS_FAILURE,
    info: "Error Fetching users data",
    payload: error,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true,
        info: action.info,
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
        info: action.info,
      };

    case FETCH_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        users: [],
        error: action.payload,
        info: action.info,
      };
  }
};

//ASYNC Action creator
//An Action creator returns action
//But thunk brings to table - ability for action creator to return function instead of action object
const fetchUsers = () => {
  //Thunk  - Special doesn't have to be pure - allowed to have side-effects - such as async API call
  return function (dispatch) {
    dispatch(fetchUsersRequest());

    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        //response.data - Contains data
        const users = response.data.map((user) => user.id);
        dispatch(fetchUsersSuccess(users));
      })
      .catch((error) => {
        dispatch(fetchUsersFailure(error.message));
        //error.message
      });
  };
};

//CREATING  Store
const store = createStore(reducer, applyMiddleWare(thunkMiddleware));

store.subscribe(() => console.log(store.getState()));
store.dispatch(fetchUsers());
