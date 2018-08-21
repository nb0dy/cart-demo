import DisabledLink from '@@components/disabled-link'
import Link from '@@components/link'
import { ButtonSize } from '@@const/sizes'
import { ICartItem } from '@@models/cart'
import { IProductItem } from '@@models/product'
import { decreaseAmount, fetchCart, increaseAmount, removeItemFromCart } from '@@store/actions/cart'
import { fetchProducts } from '@@store/actions/product'
import { IAppState } from '@@store/reducers'
import * as React from 'react'
import { connect } from 'react-redux'
import * as styles from './cartList.module.scss'
import CartItem from './components/cart-item'

export interface ICartListProps {
  productItems: IProductItem[]
  cartItems: ICartItem[]
  isLoading: boolean
  fetchCart(): void
  fetchProducts(): void
  increaseAmount(item: ICartItem): void
  decreaseAmount(item: ICartItem): void
  removeItemFromCart(id: number): void
}

class CartList extends React.Component<ICartListProps> {
  public componentDidMount() {
    this.props.fetchCart()
    this.props.fetchProducts()
  }

  public render() {
    const cartIds: number[] = this.props.cartItems.map(item => item.productId)
    const products = this.props.productItems.filter(item => cartIds.indexOf(item.id) !== -1) as IProductItem[]
    const sum = products.reduce((previous, current) => {
      const cartItem = this.props.cartItems.find(item => item.productId === current.id)
      return previous + current.price * (cartItem ? cartItem.amount : 1)
    }, 0)
    const currency = this.props.productItems.length > 0 ? this.props.productItems[0].currencySymbol : ''

    return (
      <div className={styles.container}>
        <header>
          <h1>Cart</h1>
        </header>
        <section className={styles.cartItems}>
          <div>{!this.props.isLoading &&
            this.props.cartItems
              .sort((prev: ICartItem, next: ICartItem) => (prev.id > next.id ? 1 : next.id > prev.id ? -1 : 0))
              .map(cartItem => (
                <CartItem
                  key={cartItem.id}
                  item={cartItem}
                  product={
                    this.props.productItems.find(productItem => productItem.id === cartItem.productId) as IProductItem
                  }
                  onDecrementButtonClick={this.handleDecrementButtonClick}
                  onIncrementButtonClick={this.handleIncrementButtonClick}
                  onRemoveButtonClick={this.handleRemoveButtonClick}
                />
              ))}
          </div>
          <footer>
            <div className={styles.summary}>Total: {sum} {currency}</div>
            <div className={styles.submit}>
              {cartIds.length > 0 && <Link to="/shipping" size={ButtonSize.BIG}>Buy</Link>}
              {cartIds.length === 0 && <DisabledLink size={ButtonSize.BIG}>Buy</DisabledLink>}
            </div>
          </footer>
        </section>
      </div>
    )
  }

  private handleIncrementButtonClick = (item: ICartItem): void => {
    this.props.increaseAmount(item)
  }

  private handleDecrementButtonClick = (item: ICartItem): void => {
    this.props.decreaseAmount(item)
  }

  private handleRemoveButtonClick = (id: number): void => {
    this.props.removeItemFromCart(id)
  }
}

const mapStateToProps = (state: IAppState) => {
  const { cart, products } = state

  return {
    cartItems: cart.items,
    isLoading: products.loading,
    productItems: products.items
  }
}

export { CartList }
export default connect(
  mapStateToProps,
  { fetchCart, fetchProducts, removeItemFromCart, increaseAmount, decreaseAmount }
)(CartList)
