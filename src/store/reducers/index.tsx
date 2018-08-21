import { combineReducers } from 'redux'
import cartReducer, { ICartState } from './cart'
import productReducer, { IProductState } from './product'

export interface IAction {
  type: string
  payload: any
}

export interface ILoad {
  loading: boolean
}

export interface IError {
  loadError: any
}

export interface IAppState {
  cart: ICartState
  products: IProductState
}

export default combineReducers({
  cart: cartReducer,
  products: productReducer
})
