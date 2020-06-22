import axios from 'axios';
import { setAlert } from './alert';
import {
    GET_CUSTOMERS,
    CUSTOMER_ERROR
} from './types'

//get customers
export const getCustomers = () => async dispatch => {
    try {
        const res = await axios.get('136.144.244.254:5000/api/customers')

        dispatch({
            type: GET_CUSTOMERS,
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: CUSTOMER_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};
