import { createStore } from 'redux'

export const counter = (bstate = {number1: 5, number2: 10}, action) => {
  switch (action.type) {
  case 'INCREMENT':
    return {
      number2: 100,
      number1: 50
    };
  case 'DECREMENT':
    return {
      number2: 100,
      number1: 50
    };
  case 'RESET':
    return{
      number1: 5,
      number2: 10
    };
  default:
    return {
      number1: 0,
      number2: 0
    };
  }
}

//let store = createStore(counter);

//export default store;