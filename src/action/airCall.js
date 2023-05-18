import {
    UPDATE_CALL_LIST,
    UPDATED_CALL_LIST,
    UPDATE_CALL_LIST_ERROR,
    FETCH_CALL_LIST,
    FETCH_CALL_LIST_ERROR,
    FETCHED_CALL_LIST
} from "../reducer/airCall";

import * as airCallService from '../service/aircall'

export const getAirCallList = () => {
    return (dispatch) => {
        dispatch({
            type: FETCH_CALL_LIST,
        })
        return new Promise((resolve) => {
            airCallService.getCallList()
                .then((res) => {
                    if (res) {
                        dispatch({
                            type: FETCHED_CALL_LIST,
                            data: res.data
                        })
                    }
                    resolve(res)
                })
                .catch((error) => {
                    if (error) {
                        dispatch({
                            type: FETCH_CALL_LIST_ERROR,
                            data: "Invalid Data"
                        })
                    }
                })
        })
    }
}

export const updateAirCallList = (id, data) => {
    return (dispatch) => {
        dispatch({
            type: UPDATE_CALL_LIST,
        })
        return new Promise((resolve) => {
            airCallService.updateCallList(id, {is_archived: data.is_archived})
                .then((res) => {
                    if (res.status === 200) {
                        dispatch({
                            type: UPDATED_CALL_LIST,
                            data: {id, data}
                        })
                    }
                    resolve(res)
                })
                .catch((error) => {
                    if (error) {
                        dispatch({
                            type: UPDATE_CALL_LIST_ERROR,
                            data: "Invalid Data"
                        })
                    }
                })
        })
    }
}