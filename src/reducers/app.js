import {
  SET_APP_LOADED,
} from '../constants/ActionTypes.js';


const initialState = {
  appLoaded: false,
}

const app = (state=initialState, action) => {
  switch (action.type) {
    case SET_APP_LOADED:
      return { ...state, appLoaded: true };

    default:
      return state;
  }
};

export default app;
