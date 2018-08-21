import { ICartItem } from '@@models/cart'
import { IProductItem } from '@@models/product'
import { addItemToCart, fetchCart, removeItemFromCart } from '@@store/actions/cart'
import { fetchProducts } from '@@store/actions/product'
import { IAppState } from '@@store/reducers'
import * as React from 'react'
import { connect } from 'react-redux'
import Cart from './components/cart'
import ProductItem from './components/product-item'
import * as styles from './productList.module.scss'

export interface IProductListProps {
  items: IProductItem[]
  cartItems: ICartItem[]
  isLoading: boolean
  fetchProducts(): void
  fetchCart(): void
  addItemToCart(id: number): void
  removeItemFromCart(id: number): void
}

class ProductList extends React.Component<IProductListProps> {
  public componentDidMount() {
    this.props.fetchProducts()
    this.props.fetchCart()
  }

  public render() {
    return (
      <section className={styles.container}>
        <Cart products={this.props.items} cartItems={this.props.cartItems} />
        <header>
          <h1>Products</h1>
        </header>
        <div className={styles.productList}>
          {this.props.items.map(item => (
            <ProductItem
              key={item.id}
              item={item}
              cartItems={this.props.cartItems}
              onAddButtonClick={this.handleAddToCartButtonClick}
              onRemoveButtonClick={this.handleRemoveFromCartButtonClick}
            />
          ))}
        </div>
      </section>
    )
  }

  private handleAddToCartButtonClick = (id: number): void => {
    this.props.addItemToCart(id)
  }

  private handleRemoveFromCartButtonClick = (id: number): void => {
    this.props.removeItemFromCart(id)
  }
}

const mapStateToProps = (state: IAppState) => {
  const { products, cart } = state

  return {
    cartItems: cart.items,
    isLoading: products.loading,
    items: products.items
  }
}

export { ProductList }
export default connect(
  mapStateToProps,
  { fetchProducts, fetchCart, addItemToCart, removeItemFromCart }
)(ProductList)
