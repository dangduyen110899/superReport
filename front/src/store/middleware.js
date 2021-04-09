// import { useRef } from 'react'

// const logger = (dispatch) => {
//   const prevState = useRef()

//   const dispatchWithLogger = ({ state, getNewState }) => (action) => {
//     const preStateValue = prevState.current || state
//     dispatch(action)
//     const newState = getNewState(preStateValue, action)
//     console.groupCollapsed('Action type', action.type)
//     console.log('Prev state: ', preStateValue)
//     console.log('Action payload: ', action.payload)
//     console.log('Next state: ', newState)
//     console.groupEnd()

//     prevState.current = newState
//   }

//   return dispatchWithLogger
// }

// export const useMiddleware = ({ state, getNewState }, dispatch) => {
//   const listMiddleware = []

//   // if (process.env.NODE_ENV === 'development') {
    
//   // }
//   listMiddleware.push(logger)

//   const dispatchWithMiddleware = listMiddleware.reduceRight(function (a, b) {
//     return b(a)({ state, getNewState })
//   }, dispatch)

//   return {
//     state,
//     dispatch: dispatchWithMiddleware,
//   }
// }
