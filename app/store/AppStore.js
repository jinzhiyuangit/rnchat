import { createStore } from 'redux'
import LoginState from '../reducers/LoginReducer'


let AppStore = createStore(LoginState);

export default AppStore;