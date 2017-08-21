import {
  UPDATE_FIELD_SUPPORT_CONTACT_FORM,
} from '../constants/ActionTypes.js';


const initialState = {
  body: '',
  loading: false,
  error: null,
  errors: {
    body: [],
  }
}

const message = (state=initialState, action) => {
  switch (action.type) {
    case 'SEND_SUPPORT_MESSAGE_FULFILLED':
      return { ...initialState };

    case 'SEND_SUPPORT_MESSAGE_REJECTED':
      return action.payload.data;

    case 'SEND_SUPPORT_MESSAGE_PENDING':
      return { ...state, loading: true };

    case UPDATE_FIELD_SUPPORT_CONTACT_FORM:
      return { ...state, [action.key]: action.value };

    default:
      return state;
  }
};

export default message;
