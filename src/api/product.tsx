import Api from '@@app/api'
import endpoints from '@@const/endpoints'

export const fetchProduct = async () => {
  return await Api.get(endpoints.fetchProducts)
}
