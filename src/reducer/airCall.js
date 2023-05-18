const INITIAL_STATE = {
    callList: [],
    isLoading: false,
    error: false
}
export const FETCH_CALL_LIST = 'fetchCallList';
export const FETCHED_CALL_LIST = 'fetchedCallList';
export const FETCH_CALL_LIST_ERROR = 'fetchCallListError';

export const UPDATE_CALL_LIST = 'updateCallList';
export const UPDATED_CALL_LIST = 'updatedCallList';
export const UPDATE_CALL_LIST_ERROR = 'updateCallListError';

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'fetchCallList': {
            return Object.assign({}, state, { isLoading: true })
        }
        case 'fetchedCallList': {
            return Object.assign({}, state, { callList: action.data, isLoading: false })
        }
        case 'fetchCallListError': {
            return Object.assign({}, state, { error:'something went wrong with fetch call', isLoading: false })
        }
        case 'updateCallList': {
            return Object.assign({}, state, { isLoading: true })
        }
        case 'updatedCallList': {
            const index = state.callList.findIndex((call) => call.id === action.data.id);
            index > -1 && state.callList.splice(index, 1, { ...action.data.data });
            console.log("inex--", index, action.data)
            return Object.assign({}, state, { callList: state.callList, isLoading: false })
        }
        case 'updateCallListError': {
            return Object.assign({}, state, { error:'something went wrong with update call', isLoading: false })
        }

        default:
            return state;
    }
}