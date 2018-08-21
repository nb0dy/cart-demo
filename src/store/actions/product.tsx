import { fetchProduct as fetchProductApiCall } from '@@api/product'
import { product as actionTypes } from '@@store/actions/types/product'
import apiActionGenerator from './apiActionGenerator'

export const fetchProducts = () =>
  apiActionGenerator(
    fetchProductApiCall,
    actionTypes.PRODUCT_FETCH_SUCCESS,
    actionTypes.PRODUCT_FETCH_FAILURE,
    actionTypes.PRODUCT_FETCH_LOADING
  )
