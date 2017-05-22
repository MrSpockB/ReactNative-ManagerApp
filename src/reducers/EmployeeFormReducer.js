import {
    EMPLOYEE_UPDATE,
    EMPLOYEE_CREATED,
    EMPLOYEES_SAVE_SUCCESS,
    EMPLOYEE_RESET
} from '../actions/types';

const INITAL_STATE = {
    name: '',
    phone: '',
    shift: ''
};

export default (state = INITAL_STATE, action) => {
    switch (action.type) {
        case EMPLOYEE_UPDATE:
            return { ...state, [action.payload.prop]: action.payload.value };
        case EMPLOYEE_CREATED:
            return INITAL_STATE;
        case EMPLOYEES_SAVE_SUCCESS:
            return INITAL_STATE;
        case EMPLOYEE_RESET:
            return INITAL_STATE;
        default:
            return state;
    }
};