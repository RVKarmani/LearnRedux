LEARNING REDUX
==============

[Playlist](https://www.youtube.com/playlist?list=PLC3y8-rFHvwheJHvseC3I0HuYI2f46oAK)

# TABLE OF CONTENTS
- [LEARNING REDUX](#learning-redux)
- [TABLE OF CONTENTS](#table-of-contents)
- [1. Initialization](#1-initialization)
- [2. Three Core concepts of redux](#2-three-core-concepts-of-redux)
  - [2.1. Scenario: Cake shop](#21-scenario-cake-shop)
  - [2.2. Entities](#22-entities)
  - [2.3. Activities](#23-activities)
  - [2.4. Insights](#24-insights)
- [3. Three principles of redux](#3-three-principles-of-redux)
  - [3.1. First Principle - State of whole application is stored in object tree within single store](#31-first-principle---state-of-whole-application-is-stored-in-object-tree-within-single-store)
  - [3.2. Second Principle - Only way to change state is to emit action - Object describing what happened](#32-second-principle---only-way-to-change-state-is-to-emit-action---object-describing-what-happened)
  - [3.3. Third Principle - To specify how state tree is transformed by actions - write pure reducers](#33-third-principle---to-specify-how-state-tree-is-transformed-by-actions---write-pure-reducers)
  - [3.4. Insights](#34-insights)
- [4. Actions](#4-actions)
- [5. Reducers](#5-reducers)
- [6. Redux Store](#6-redux-store)
- [7. Need for an important function in Redux](#7-need-for-an-important-function-in-redux)
  - [7.1. Scenario updated](#71-scenario-updated)
  - [7.2. APPROACH 1: To use single reducer with switch cases](#72-approach-1-to-use-single-reducer-with-switch-cases)
  - [7.3. OUTPUT](#73-output)
  - [7.4. APPROACH 2: Multiple reducers](#74-approach-2-multiple-reducers)
  - [7.5. OUTPUT](#75-output)
- [8. Middleware](#8-middleware)
  - [8.1. OUTPUT](#81-output)
- [9. Asynchronous Actions](#9-asynchronous-actions)

# 1. Initialization
1. Initialize directory with package.json - `npm init --yes`
2. Install redux as dependency - npm install redux
3. Create new file - index.js
4. node index


# 2. Three Core concepts of redux

## 2.1. Scenario: Cake shop
## 2.2. Entities
- Shop -> stores cakes
- Shopkeeper -> At front of store
- Customer -> At store entrance

## 2.3. Activities 
- Customer -> buy a cake
- Shopkeeper -> Remove cake from shelf, receipt to keep track


## 2.4. Insights
| Entity                | Redux   | Purpose                                                                                                  |
| --------------------- | ------- | -------------------------------------------------------------------------------------------------------- |
| Cake Shop             | Store   | Holds state of application                                                                               |
| Intention to BUY_CAKE | Action  | Describes changes in state - number of cakes have to be reduced by 1                                     |
| Shopkeeper            | Reducer | Actually carries out action - Ties store and actions together - receives BUY and removes cake from store |

# 3. Three principles of redux
Describe the redux pattern

## 3.1. First Principle - State of whole application is stored in object tree within single store

Maintain application state in single object - managed by redux store

```
{
    numberOfCakes: 10
}
```

## 3.2. Second Principle - Only way to change state is to emit action - Object describing what happened

To update state of application, you need to let Redux know about that with action - Not allowed to directly update state

Let shopkeeper know about action - BUY_CAKE

```
{
    type: BUY_CAKE
}
```

## 3.3. Third Principle - To specify how state tree is transformed by actions - write pure reducers
Pure reducers - pure functions - {previous state, action} => newState

Reducer - shopkeeper
```
    const reducer = (state, action) =>{

        switch(action.type){
            case BUY_CAKE: return{
                numOfCakes: state.numOfCakes-1
            }
        }
    }
```

## 3.4. Insights
Application cannot directly change state

JS App -> Dispatch Action -> Reducer handles Action -> Reducer updates state in redux store -> New value passed onto application as it is subscribed

# 4. Actions
- Plain JS objects
- Have type property - indicates type of action being performed

```
const BUY_CAKE = "BUY_CAKE";
//Action - object with type property
{
    type: BUY_CAKE,
    info: "First redux action",
}
//Action creator - creates action - function that returns action

function buyCake() {
  return {
    type: BUY_CAKE,
    info: "First redux action",
  };
}

```

# 5. Reducers
- Function - accepts state, action as args - returns next state of application

```
const initialState = {
  numOfCakes: 10,
};
//Arrow function, state default value is initialState
const reducer = (state = initialState, action) => {
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
```
# 6. Redux Store
- Import redux 
```
const redux = require('redux');
```
Responsibilities 
- Holds application state, 
- Access state via getState()
```
const store = createStore(reducer);
console.log("Initial State: ", store.getState());
```

- Allows state update via dispatch(action)
```
store.dispatch(buyCake());
```

- Register listeners via subscribe(listener)
- Handles un-registering of listeners via function returned by subscriber(listener)
```
const unsubscribe = store.subscribe(() =>
  console.log("Updated state: ", store.getState())
);

unsubscribe();

```

# 7. Need for an important function in Redux
## 7.1. Scenario updated
Cake shop
Cake stored in shelf
Shopkeeper handles BUY_CAKE from customer

Now expanded to sell ice-creams as well
Ice creams stored in freezer
New shopkeeper handles BUY_ICECREAM from customer

## 7.2. APPROACH 1: To use single reducer with switch cases
```
const initialState = {
  numOfCakes: 10,
  numOfIceCreams: 12,
};

//Arrow function, state default value is initialState
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        ...state, //Making copy of state, make changes only to numOfCakes
        numOfCakes: state.numOfCakes - 1,
      };

    case BUY_ICECREAM:
      return {
        ...state,
        numOfIceCreams: state.numOfIceCreams - 1,
      };
    default:
      return state;
  }
};
```
## 7.3. OUTPUT
```
Initial State:  { numOfCakes: 10, numOfIceCreams: 12 }
Updated state:  { numOfCakes: 9, numOfIceCreams: 12 }
Updated state:  { numOfCakes: 8, numOfIceCreams: 12 }
Updated state:  { numOfCakes: 7, numOfIceCreams: 12 }
Updated state:  { numOfCakes: 7, numOfIceCreams: 11 }
Updated state:  { numOfCakes: 7, numOfIceCreams: 10 }
```

## 7.4. APPROACH 2: Multiple reducers
Splitting state and reducer
```
const combineReducers = redux.combineReducers;

//Split state
const initialCakeState = {
  numOfCakes: 10,
};

const initialIceCreamState = {
  numOfIceCreams: 12,
};

//Separate reducers

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

//rootReducer - convention for combined reducers
const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer,
});
const store = createStore(rootReducer);

```

## 7.5. OUTPUT
```
Initial State:  { cake: { numOfCakes: 10 }, iceCream: { numOfIceCreams: 12 } }
Updated state:  { cake: { numOfCakes: 9 }, iceCream: { numOfIceCreams: 12 } }
Updated state:  { cake: { numOfCakes: 8 }, iceCream: { numOfIceCreams: 12 } }
Updated state:  { cake: { numOfCakes: 7 }, iceCream: { numOfIceCreams: 12 } }
Updated state:  { cake: { numOfCakes: 7 }, iceCream: { numOfIceCreams: 11 } }
Updated state:  { cake: { numOfCakes: 7 }, iceCream: { numOfIceCreams: 10 } }
```

# 8. Middleware
Recommended way to extend redux with custom functionality
Provides third party extension point between dispatching action and the  moment it  reaches reducer
Use for logging, crash reporting, performing async tasks etc

Example: redux-logger - logs all redux info

1. Install middleware for  logging - `npm install redux-logger`
2. Create logger for application
```
const reduxLogger = require('redux-logger');
const logger = reduxLogger.createLogger()
```
3. How to include middleware ?
  Redux library provides function - applyMiddleware
  
```
  const applyMiddleWare = redux.applyMiddleware
```

4. To store, we add second parameter  - 
```
const store = createStore(rootReducer, applyMiddleWare(logger))
```
5. Let logger handle console output in subscription  - removing console log
```
const unsubscribe= store.subscribe (() => {})
```

##  8.1. OUTPUT
```
Initial State:  { cake: { numOfCakes: 10 }, iceCream: { numOfIceCreams: 12 } }
 action BUY_CAKE @ 11:55:52.764
   prev state { cake: { numOfCakes: 10 }, iceCream: { numOfIceCreams: 12 } }  
   action     { type: 'BUY_CAKE', info: 'First redux action' }
   next state { cake: { numOfCakes: 9 }, iceCream: { numOfIceCreams: 12 } }   
 action BUY_CAKE @ 11:55:52.767
   prev state { cake: { numOfCakes: 9 }, iceCream: { numOfIceCreams: 12 } }   
   action     { type: 'BUY_CAKE', info: 'First redux action' }
   next state { cake: { numOfCakes: 8 }, iceCream: { numOfIceCreams: 12 } }   
 action BUY_CAKE @ 11:55:52.769
   prev state { cake: { numOfCakes: 8 }, iceCream: { numOfIceCreams: 12 } }
   action     { type: 'BUY_CAKE', info: 'First redux action' }
   next state { cake: { numOfCakes: 7 }, iceCream: { numOfIceCreams: 12 } }
 action BUY_ICECREAM @ 11:55:52.770
   prev state { cake: { numOfCakes: 7 }, iceCream: { numOfIceCreams: 12 } }
   action     { type: 'BUY_ICECREAM', info: 'Second redux action' }
   next state { cake: { numOfCakes: 7 }, iceCream: { numOfIceCreams: 11 } }
 action BUY_ICECREAM @ 11:55:52.772
   prev state { cake: { numOfCakes: 7 }, iceCream: { numOfIceCreams: 11 } }
   action     { type: 'BUY_ICECREAM', info: 'Second redux action' }
   next state { cake: { numOfCakes: 7 }, iceCream: { numOfIceCreams: 10 } }
```
# 9. Asynchronous Actions
Synchronous actions - as soon as action dispatched - state was immediately updated

Dispatch BUY_CAKE action - numOfCakes immediately decremented by 1

Async actions - Async API calls to fetch date from endpoint and  use data in your application

What to accomplish?
1. Fetches list of  users from API endpoint, stores  it in redux store
State
```
state = {
  loading: true, //Can be used for spinner
  users: [],
  error: '' //Incase API call fails, display error to user
}
```

Actions
1. FETCH_USERS_REQUEST - Fetch list of users
2. FETCH_USERS_SUCCESS - Fetched successfully
3. FETCH_USERS_FAILURE - Fetch Error

Reducer
```
case: FETCH_USERS_REQUEST
  loading: true

case: FETCH_USERS_SUCCESS
  loading: false
  users: data{from API}

case: FETCH_USERS_FAILURE
  loading: false
  error: error{from API}
```
Creating new file - asyncActions.js

1. Installing required libraries - `npm install axios redux-thunk`
2. **axios** - requests to API endpoint
3. **redux-thunk**- Define async action creator - middleware
4. See asyncActions.js for insights
