import { createStore } from 'redux'
import reducer from '../reducers'


let AppStore = createStore(reducer);

export default AppStore;