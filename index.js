const redux = require("redux");
//Middleware
const reduxLogger = require("redux-logger");

//Redux Functions
const createStore = redux.createStore;
const combineReducers = redux.combineReducers;
//Middleware application
const applyMiddleWare = redux.applyMiddleware;
const logger = reduxLogger.createLogger();

// Action
const BUY_CAKE = "BUY_CAKE";
const BUY_ICECREAM = "BUY_ICECREAM";

//Action creator
function buyCake() {
  return {
    type: BUY_CAKE,
    info: "First redux action",
  };
}

function buyIceCream() {
  return {
    type: BUY_ICECREAM,
    info: "Second redux action",
  };
}

//Reducer - { previousState, action }
const initialState = {
  numOfCakes: 10,
  numOfIceCreams: 12,
};

//splitting state for approach 2- multiple reducers

const initialCakeState = {
  numOfCakes: 10,
};

const initialIceCreamState = {
  numOfIceCreams: 12,
};

//Arrow function, state default value is initialState
// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case BUY_CAKE:
//       return {
//         ...state, //Making copy of state, make changes only to numOfCakes
//         numOfCakes: state.numOfCakes - 1,
//       };

//     case BUY_ICECREAM:
//       return {
//         ...state,
//         numOfIceCreams: state.numOfIceCreams - 1,
//       };
//     default:
//       return state;
//   }
// };

//Multiple  reducer - approach 2
const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        ...state, //Making copy of state, make changes only to numOfCakes
        numOfCakes: state.numOfCakes - 1,
      };
    default:
      return state;
  }
};
const iceCreamReducer = (state = initialIceCreamState, action) => {
  switch (action.type) {
    case BUY_ICECREAM:
      return {
        ...state, //Making copy of state, make changes only to numOfCakes
        numOfIceCreams: state.numOfIceCreams - 1,
      };
    default:
      return state;
  }
};

//APPROACH 2 - Combine multiple reducers
//Convention - rootReducer
const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer,
});
const store = createStore(rootReducer, applyMiddleWare(logger));
//APPROACH 1
// const store = createStore(reducer);

console.log("Initial State: ", store.getState());

const unsubscribe = store.subscribe(() => {});

store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());

store.dispatch(buyIceCream());
store.dispatch(buyIceCream());

unsubscribe();
