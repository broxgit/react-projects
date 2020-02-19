const redux = require('redux');
const createStore = redux.createStore;

const initialState = {
  counter: 0
};

// Reducer
const rootReducer = (state=initialState, action) => {
    if (action.type === 'INC_COUNTER'){
        return {
            ...state,
            counter: state.counter + 1
        }
    }
    if (action.type === 'ADD_COUNTER'){
        return {
            ...state,
            counter: state.counter + action.value
        }
    }
    return state;
};

// Store
const store = createStore(rootReducer);
console.log(store.getState());

// Subscription
// takes an argument, a function (which doesn't get any arguments) which will be executed whenever the state is updated
store.subscribe(() => {
    console.log('[Subscription]', store.getState());
});

// Dispatching Action
// takes an argument, that argument is an action that should be a javascript object that needs to have a javascript properties, type is required
store.dispatch({type: 'INC_COUNTER'});
store.dispatch({type: 'ADD_COUNTER', value: 10});
console.log(store.getState());
