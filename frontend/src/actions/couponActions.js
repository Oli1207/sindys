/*import { COUPON_LIST_FAIL,
    COUPON_LIST_REQUEST,
    COUPON_LIST_SUCCESS } from '../constants/couponConstants'
import axios from 'axios'
    
    
export const listeCoupons = (coupon_code) => async (dispatch, getState) => {
        try{
            dispatch({ type : COUPON_LIST_REQUEST })

            
        const {
            userLogin: { userInfo }
        } = getState()

        const config = {
            headers:{
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}` 
            }
        }
    
            const { data } = await axios.post(`/api/coupons/`, config)
    
            dispatch({
                type : COUPON_LIST_SUCCESS,
                payload : data
        })
        }catch(error) {
            dispatch({
                type : COUPON_LIST_FAIL, 
                payload : error.response && error.response.body && error.response.data.detail
                ? error.response.data.detail
                : error.message,
            
            })
    
        }
    }*/