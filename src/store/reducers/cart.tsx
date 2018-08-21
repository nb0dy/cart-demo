import { ICartItem } from '@@models/cart'
import { cart as actionTypes } from '@@store/actions/types/cart'
import { IAction, IError, ILoad } from '@@store/reducers'

export interface ICartState extends ILoad, IError {
  items: ICartItem[]
}

const cartReducer = (
  state: ICartState = {
    items: [],
    loadError: null,
    loading: false
  },
  action: IAction
) => {
  switch (action.type) {
    case actionTypes.CART_FETCH_LOADING:
      return {
        items: [],
        loadError: false,
        loading: true
      }
    case actionTypes.CART_FETCH_SUCCESS:
      return {
        items: action.payload,
        loadError: false,
        loading: false
      }
    case actionTypes.CART_FETCH_FAILURE:
      return {
        items: [],
        loadError: action.payload,
        loading: false
      }
    case actionTypes.CART_ITEM_ADD_FETCH_LOADING:
      return {
        ...state,
        loading: true
      }
    case actionTypes.CART_ITEM_ADD_FETCH_SUCCESS:
      return {
        items: [...state.items, action.payload],
        loadError: false,
        loading: false
      }
    case actionTypes.CART_ITEM_ADD_FETCH_FAILURE:
      return {
        ...state,
        loadError: action.payload,
        loading: false
      }
    case actionTypes.CART_ITEM_REMOVE_FETCH_LOADING:
      return {
        ...state,
        loadError: false,
        loading: true
      }
    case actionTypes.CART_ITEM_REMOVE_FETCH_SUCCESS:
      return {
        items: [...state.items.filter(item => item.id !== action.payload)],
        loadError: false,
        loading: false
      }
    case actionTypes.CART_ITEM_REMOVE_FETCH_FAILURE:
      return {
        ...state,
        loadError: action.payload,
        loading: false
      }
    case actionTypes.CART_ITEM_AMOUNT_INCREASE_FETCH_LOADING:
      return {
        ...state,
        loadError: false,
        loading: true
      }
    case actionTypes.CART_ITEM_AMOUNT_INCREASE_FETCH_SUCCESS: {
      const product: ICartItem = { ...state.items.find(item => item.id === action.payload) } as ICartItem
      if (product) {
        product.amount++
      }
      console.log(product)
      return {
        items: [...state.items.filter(item => item.id !== action.payload), product],
        loadError: false,
        loading: false
      }
    }
    case actionTypes.CART_ITEM_AMOUNT_INCREASE_FETCH_FAILURE:
      return {
        ...state,
        loadError: action.payload,
        loading: false
      }
    case actionTypes.CART_ITEM_AMOUNT_DECREASE_FETCH_LOADING:
      return {
        ...state,
        loadError: false,
        loading: true
      }
    case actionTypes.CART_ITEM_AMOUNT_DECREASE_FETCH_SUCCESS: {
      const product: ICartItem = { ...state.items.find(item => item.id === action.payload) } as ICartItem
      if (product) {
        product.amount--
        if (product.amount < 0) {
          product.amount = 0
        }
      }
      return {
        items: [...state.items.filter(item => item.id !== action.payload), product],
        loadError: false,
        loading: false
      }
    }
    case actionTypes.CART_ITEM_AMOUNT_DECREASE_FETCH_FAILURE:
      return {
        ...state,
        loadError: action.payload,
        loading: false
      }
    default:
      return state
  }
}

export default cartReducer
