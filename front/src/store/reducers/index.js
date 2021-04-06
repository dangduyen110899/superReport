import globalReducer from './globalReducer'
import globalReducer2 from './globalReducer2'


const combineReducer = (objReducer) => (state, action) => {
  let newState = state
  Object.keys(objReducer).map((key) => {
    newState = {
      ...newState,
      [key]: objReducer[key](state[key], action),
    }
  })
  return newState
}

const RootReducer = combineReducer({ global: globalReducer, custom: globalReducer2 }) // return (state, action)=>{}

export default RootReducer
