import {
  UPDATE_FIELD_REPOSITORY,
} from '../constants/actionTypes.js';


const initialState = {
  errors: {owner: [], repository: []},
  error: null,
}

const repository = (state=initialState, action) => {
  switch (action.type) {
    case 'LINK_REPOSITORY_FULFILLED':
    case 'UNLINK_REPOSITORY_FULFILLED':
      return initialState;

    case 'LINK_REPOSITORY_REJECTED':
    case 'UNLINK_REPOSITORY_REJECTED':
      return {
        ...state,
        errors: Object.assign({},
          initialState.errors,
          action.payload.response.data.errors),
        error: action.payload.response.data.error || initialState.error,
      };

    case UPDATE_FIELD_REPOSITORY:
      return { ...state, [action.key]: action.value };

    default:
      return state;
  }
};

export default repository;
