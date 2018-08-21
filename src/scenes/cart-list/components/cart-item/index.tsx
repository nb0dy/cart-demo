import Button from '@@components/button'
import { ICartItem } from '@@models/cart'
import { IProductItem } from '@@models/product'
import * as React from 'react'
import * as styles from './cartItem.module.scss'

export interface ICartItemProps {
  item: ICartItem
  product: IProductItem
  onIncrementButtonClick: (item: ICartItem) => void
  onDecrementButtonClick: (item: ICartItem) => void
  onRemoveButtonClick: (id: number) => void
}

class CartItem extends React.Component<ICartItemProps> {
  public render() {
    const { item, product } = this.props
    return (
      <div className={styles.item}>
        <div className={styles.details}>
          <div className={styles.image}>
            <img src={`${product.imageUrl}80/80`} />
          </div>
          <div className={styles.description}>
            <h2>{product.title}</h2>
            <span>{product.description}</span>
          </div>
        </div>
        <div className={styles.actions}>
          <div className={styles.amountContainer}>
            <Button onClick={this.handleDecrementButtonClick} disabled={item.amount <= 0}>-</Button>
            <span className={styles.amount}>{item.amount}</span>
            <Button onClick={this.handleIncrementButtonClick} disabled={item.amount >= 100}>+</Button>
          </div>
          <div className={styles.price}>
            {product.price * item.amount} {this.props.product.currencySymbol}
          </div>
          <div className={styles.removeButton}>
            <Button onClick={this.handleRemoveButtonClick}>X</Button>
          </div>
        </div>
      </div>
    )
  }

  private handleIncrementButtonClick = (): void => {
    this.props.onIncrementButtonClick(this.props.item)
  }

  private handleDecrementButtonClick = (): void => {
    this.props.onDecrementButtonClick(this.props.item)
  }

  private handleRemoveButtonClick = (): void => {
    this.props.onRemoveButtonClick(this.props.item.id)
  }
}

export default CartItem
