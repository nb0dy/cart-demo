import Button from '@@components/button'
import { ICartItem } from '@@models/cart'
import { IProductItem } from '@@models/product'
import * as React from 'react'
import * as styles from './productItem.module.scss'

export interface IProductItemProps {
  item: IProductItem
  cartItems: ICartItem[]
  onAddButtonClick: (id: number) => any
  onRemoveButtonClick: (id: number) => any
}

class ProductItem extends React.Component<IProductItemProps> {
  public render() {
    const isItemInCart = this.props.cartItems.map(item => item.productId).indexOf(this.props.item.id) !== -1

    return (
      <div className={styles.item}>
        <div className={styles.details}>
          <div className={styles.image}>
            <img src={`${this.props.item.imageUrl}80/80`} />
          </div>
          <div className={styles.description}>
            <h2>{this.props.item.title}</h2>
            <span>{this.props.item.description}</span>
          </div>
        </div>
        <div className={styles.actions}>
          <div className={styles.price}>
            {this.props.item.price} {this.props.item.currencySymbol}
          </div>
          <div className={styles.addButton}>
            {!isItemInCart && <Button onClick={this.handleAddButtonClick}>Add to cart</Button>}
            {isItemInCart && <Button onClick={this.handleRemoveButtonClick}>Remove from cart</Button>}
          </div>
        </div>
      </div>
    )
  }

  private handleAddButtonClick = (): void => {
    this.props.onAddButtonClick(this.props.item.id)
  }

  private handleRemoveButtonClick = (): void => {
    this.props.onRemoveButtonClick(this.props.item.id)
  }
}

export default ProductItem
