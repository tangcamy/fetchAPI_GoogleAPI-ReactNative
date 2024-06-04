import {CHANGE_NAME} from './action'

const initialState ={
  newName:'Camy'
}

export default function reducer(state=initialState,action){
  switch(action.type){
    case CHANGE_NAME:
      return{
        ...state,
        newName:action.payload.newName
      }
    //如果沒有任何的action
    default:
      return state
  }
}