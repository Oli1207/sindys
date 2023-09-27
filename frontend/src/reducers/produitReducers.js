import { PRODUIT_LIST_SUCCESS,
         PRODUIT_LIST_FAIL,
         PRODUIT_LIST_REQUEST,

         PRODUIT_DETAILS_FAIL,
         PRODUIT_DETAILS_REQUEST,
         PRODUIT_DETAILS_SUCCESS,

         PRODUCT_CREATE_REVIEW_FAIL,
         PRODUCT_CREATE_REVIEW_REQUEST,
         PRODUCT_CREATE_REVIEW_SUCCESS,
         PRODUCT_CREATE_REVIEW_RESET

} from '../constants/produitConstant'


export const produitListeReducer = (state= { products: [] }, action ) => {
    switch (action.type) {
        case PRODUIT_LIST_REQUEST:
            return {loading: true, products:[]}

        case PRODUIT_LIST_SUCCESS:
            return {
                loading: false, 
                products:action.payload.products, 
                page:action.payload.page,
                pages:action.payload.pages}

        case PRODUIT_LIST_FAIL:
            return {loading: false, error:action.payload}

        default:
            return state
    }
}

export const produitDetailReducer = (state = { product : {reviews:[]}}, action) => {
    switch (action.type) {
        case PRODUIT_DETAILS_REQUEST:
            return { loading: true, ...state}

        case PRODUIT_DETAILS_SUCCESS:
            return { loading: false, product: action.payload}

        case PRODUIT_DETAILS_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const productReviewCreateReducer = (state = {}, action) => {
    switch(action.type) {
        case PRODUCT_CREATE_REVIEW_REQUEST:
            return {loading: true}

        case PRODUCT_CREATE_REVIEW_SUCCESS:
            return {loading: false, success:true}

        case PRODUCT_CREATE_REVIEW_FAIL:
            return {loading: false, error: action.payload}

        case PRODUCT_CREATE_REVIEW_RESET:
            return {}

        default:
            return state

    }


}