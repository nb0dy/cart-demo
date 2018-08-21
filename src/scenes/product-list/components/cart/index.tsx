import DisabledLink from '@@components/disabled-link'
import Link from '@@components/link'
import { ICartItem } from '@@models/cart'
import { IProductItem } from '@@models/product'
import * as React from 'react'
import * as styles from './cart.module.scss'

export interface IProductItemProps {
  products: IProductItem[]
  cartItems: ICartItem[]
}

class Cart extends React.Component<IProductItemProps> {
  public render() {
    const cartIds: number[] = this.props.cartItems.map(item => item.productId)
    const products = this.props.products.filter(item => cartIds.indexOf(item.id) !== -1) as IProductItem[]
    const sum = products.reduce((previous, current) => {
      const cartItem = this.props.cartItems.find(item => item.productId === current.id)
      return previous + current.price * (cartItem ? cartItem.amount : 1)
    }, 0)
    const currency = this.props.products.length > 0 ? this.props.products[0].currencySymbol : ''

    return (
      <div className={styles.cart}>
        <div className={styles.price}>
          <span className={styles.amount}>
            {cartIds.length} product
            {cartIds.length > 1 ? 's' : ''}:
          </span>
          <span>{sum}</span>
          <span>{currency}</span>
        </div>
        <div className={styles.actions}>
          {cartIds.length > 0 && <Link to="/cart">Purchase</Link>}
          {cartIds.length === 0 && <DisabledLink>Purchase</DisabledLink>}
        </div>
      </div>
    )
  }
}

export default Cart
