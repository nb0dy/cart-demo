import * as api from '@@api/product'
import { product as actionTypes } from '@@store/actions/types/product'
import { Dispatch } from 'redux'

export const fetchProducts = () => (dispatch: Dispatch) => {
  dispatch({ type: actionTypes.PRODUCT_FETCH_LOADING })

  api
    .fetchProduct()
    .then(result => {
      dispatch({
        payload: result.data.map((item: any) => ({
          ...item,
          id: parseInt(item.id, 10),
        })),
        type: actionTypes.PRODUCT_FETCH_SUCCESS
      })
    })
    .catch(e => dispatch({ type: actionTypes.PRODUCT_FETCH_FAILURE, payload: e }))
}