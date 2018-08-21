import * as api from '@@api/cart'
import { ICartItem } from '@@models/cart'
import { cart as actionTypes } from '@@store/actions/types/cart'
import { Dispatch } from 'redux'

export const fetchCart = () => (dispatch: Dispatch) => {
  dispatch({ type: actionTypes.CART_FETCH_LOADING })

  api
    .fetchCart()
    .then(result => {
      dispatch({
        payload: result.data.map((item: any) => ({
          amount: item.params.amount,
          id: parseInt(item.id, 10),
          productId: parseInt(item.params.id, 10)
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

export const increaseAmount = (item: ICartItem) => (dispatch: Dispatch) => {
  dispatch({ type: actionTypes.CART_ITEM_AMOUNT_INCREASE_FETCH_LOADING })

  api
    .increaseAmout({ id: item.id, params: { amount: item.amount + 1, productId: item.productId } })
    .then(result => {
      dispatch({ type: actionTypes.CART_ITEM_AMOUNT_INCREASE_FETCH_SUCCESS, payload: item.id })
    })
    .catch(e => dispatch({ type: actionTypes.CART_ITEM_AMOUNT_INCREASE_FETCH_FAILURE, payload: e }))
}

export const decreaseAmount = (item: ICartItem) => (dispatch: Dispatch) => {
  dispatch({ type: actionTypes.CART_ITEM_AMOUNT_DECREASE_FETCH_LOADING })

  api
    .decreaseAmout({ id: item.id, params: { amount: item.amount - 1 > 0 ? item.amount - 1 : 0, productId: item.productId } })
    .then(result => {
      dispatch({ type: actionTypes.CART_ITEM_AMOUNT_DECREASE_FETCH_SUCCESS, payload: item.id })
    })
    .catch(e => dispatch({ type: actionTypes.CART_ITEM_AMOUNT_DECREASE_FETCH_FAILURE, payload: e }))
}
