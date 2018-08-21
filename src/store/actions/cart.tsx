import * as api from '@@api/cart'
import { ICartItem } from '@@models/cart'
import { cart as actionTypes } from '@@store/actions/types/cart'
import { Dispatch } from 'redux'
import apiActionGenerator from './apiActionGenerator'

export const fetchCart = () => (dispatch: Dispatch) => {
  dispatch({ type: actionTypes.CART_FETCH_LOADING })

  api
    .fetchCart()
    .then(result => {
      dispatch({
        payload: result.data.map((item: any) => ({
          amount: item.params.amount,
          id: item.id,
          productId: item.params.id
        })),
        type: actionTypes.CART_FETCH_SUCCESS
      })
    })
    .catch(e => dispatch({ type: actionTypes.CART_FETCH_FAILURE, payload: e }))
}

export const addItemToCart = (id: number) => (dispatch: Dispatch) => {
  dispatch({ type: actionTypes.CART_ITEM_ADD_FETCH_LOADING })

  api
    .addItemToCart({ id, amount: 1 })
    .then(result => {
      dispatch({
        payload: { id: result.data.id, productId: id, amount: 1 },
        type: actionTypes.CART_ITEM_ADD_FETCH_SUCCESS
      })
    })
    .catch(e => dispatch({ type: actionTypes.CART_ITEM_ADD_FETCH_FAILURE, payload: e }))
}

export const removeItemFromCart = (id: number) => (dispatch: Dispatch) => {
  dispatch({ type: actionTypes.CART_ITEM_REMOVE_FETCH_LOADING })

  api
    .removeItemFromCart({ id })
    .then(result => {
      dispatch({ type: actionTypes.CART_ITEM_REMOVE_FETCH_SUCCESS, payload: id })
    })
    .catch(e => dispatch({ type: actionTypes.CART_ITEM_REMOVE_FETCH_FAILURE, payload: e }))
}

export const increaseAmount = (item: ICartItem) =>
  apiActionGenerator(
    api.increaseAmout,
    actionTypes.CART_ITEM_AMOUNT_INCREASE_FETCH_SUCCESS,
    actionTypes.CART_ITEM_AMOUNT_INCREASE_FETCH_FAILURE,
    actionTypes.CART_ITEM_AMOUNT_INCREASE_FETCH_LOADING,
    { id: item.id, amount: item.amount + 1 }
  )

export const decreaseAmount = (item: ICartItem) =>
  apiActionGenerator(
    api.decreaseAmout,
    actionTypes.CART_ITEM_AMOUNT_DECREASE_FETCH_FAILURE,
    actionTypes.CART_ITEM_AMOUNT_DECREASE_FETCH_FAILURE,
    actionTypes.CART_ITEM_AMOUNT_DECREASE_FETCH_FAILURE,
    { id: item.id, amount: item.amount - 1 > 0 ? item.amount - 1 : 0 }
  )
