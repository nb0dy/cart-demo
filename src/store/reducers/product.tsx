import { IProductItem } from '@@models/product'
import { product as actionTypes } from '@@store/actions/types/product'
import { IAction, IError, ILoad } from '@@store/reducers'

export interface IProductState extends ILoad, IError {
  items: IProductItem[]
}

const productReducer = (
  state: IProductState = {
    items: [],
    loadError: null,
    loading: false
  },
  action: IAction
) => {
  switch (action.type) {
    case actionTypes.PRODUCT_FETCH_LOADING:
      return {
        items: [],
        loadError: false,
        loading: true
      }
    case actionTypes.PRODUCT_FETCH_SUCCESS:
      return {
        items: [...action.payload.map((item: any) => ({ ...item, price: parseFloat(item.price) }))],
        loadError: false,
        loading: false
      }
    case actionTypes.PRODUCT_FETCH_FAILURE:
      return {
        items: [],
        loadError: action.payload,
        loading: false
      }
    default:
      return state
  }
}

export default productReducer
