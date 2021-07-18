import authConstant from "../actions/constants";
import isEmpty from 'is-empty';
  const initialState = {
    isAuthenticated: false,
    user: {},
    loading: false
  };
  export default function(state = initialState, action) {
    switch (action.type) {
      case authConstant.SET_CURRENT_USER:
        return {
          ...state,
          isAuthenticated: !isEmpty(action.payload),
          user: action.payload
        };
      case authConstant.USER_LOADING:
        return {
          ...state,
          loading: true
        };
      default:
        return state;
    }
  }