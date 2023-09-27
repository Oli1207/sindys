import { COUPON_LIST_SUCCESS,
    COUPON_LIST_FAIL,
    COUPON_LIST_REQUEST,


} from '../constants/couponConstants'


export const couponListeReducer = (state= { coupons: [] }, action ) => {
switch (action.type) {
   case COUPON_LIST_REQUEST:
       return {loading: true, coupons:[]}

   case COUPON_LIST_SUCCESS:
       return {
           loading: false, 
           coupons:action.payload.coupons, 
        }

   case COUPON_LIST_FAIL:
       return {loading: false, error:action.payload}

   default:
       return state
}
}