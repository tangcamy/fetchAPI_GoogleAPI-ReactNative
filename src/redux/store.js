// import 所有的reducer
import reducer from './reducer'
//import redux框架
import {legacy_createStore as createStore} from 'redux'

//讓app.js可以引用
export default function configureStore(){
  let store = createStore(
    reducer
  )
  return store
}