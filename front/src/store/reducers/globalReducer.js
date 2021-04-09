import * as actionTypes from '../action-types'

const initState = {
  isLoadingFullScreen: false
}

const globalReducer = (state = initState, { type, payload }) => {
  switch (type) {

    case actionTypes.LOADING_FULL_SCREEN: {
      return {
        ...state,
        isLoadingFullScreen: payload,
      }
    }

    default:
      return state
  }
}

export default globalReducer
