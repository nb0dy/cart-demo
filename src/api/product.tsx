import Api from '@@app/api'
import endpoints from '@@const/endpoints'

export const fetchProduct = async (params: any) => {
  return await Api.get(endpoints.fetchProducts, { params })
}
