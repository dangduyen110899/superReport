import * as actionTypes from '../action-types'

const initState = {
    toastState: { content: '', status: 'success', active: false },
}

const globalReducer = (state = initState, { type, payload }) => {
  switch (type) {

    case actionTypes.TOAST_STATE: {
      return {
        ...state,
        toastState: payload,
      }
    }

    default:
      return state
  }
}

export default globalReducer
