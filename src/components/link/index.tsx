import { ButtonSize } from '@@const/sizes'
import * as React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import * as styles from './link.module.scss'

export interface ILinkProps {
  size?: ButtonSize
  to: string
  children: React.ReactNode
}

class Link extends React.Component<ILinkProps> {
  public render() {
    const { size } = this.props

    return (
      <div className={styles.container}>
        <RouterLink className={`${styles.button} ${size === ButtonSize.BIG ? styles.big : ''}`} to={this.props.to}>
          {this.props.children}
        </RouterLink>
      </div>
    )
  }
}

export default Link
