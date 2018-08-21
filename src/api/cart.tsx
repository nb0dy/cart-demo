import Api from '@@app/api'
import endpoints from '@@const/endpoints'

export const fetchCart = async () => {
  return await Api.get(endpoints.fetchCart)
}

export const addItemToCart = async (params: any) => {
  return await Api.post(endpoints.fetchCart, { params })
}

export const removeItemFromCart = async (params: any) => {
  return await Api.delete(`${endpoints.fetchCart}/${params.id}`)
}

export const increaseAmout = async (params: any) => {
  return await Api.put(`${endpoints.fetchCart}/${params.id}`, { params: { ...params.params } })
}

export const decreaseAmout = async (params: any) => {
  return await Api.put(`${endpoints.fetchCart}/${params.id}`, { params: { ...params.params } })
}
