// simple store

import React, { createContext, useContext, useReducer } from 'react'
// import { useMiddleware } from './middleware'
import RootReducer from './reducers'

const StoreContext = createContext()

export const StoreProvider = ({ children }) => {
  const [ state, dispatch ] = useReducer(RootReducer, RootReducer({}, {}))

  // const storeWithMiddleware = useMiddleware({ state, getNewState: RootReducer }, dispatch)

  return <StoreContext.Provider value={{state, dispatch}}>{children}</StoreContext.Provider>
}

export const useStore = () => useContext(StoreContext)

export const useSelector = (selectFunc) => {
  const { state } = useStore()
  return selectFunc(state)
}

export const useDispatch = () => useStore().dispatch
