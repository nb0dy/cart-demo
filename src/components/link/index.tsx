import * as React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import * as styles from './link.module.scss'

export interface ILinkProps {
  to: string
  children: React.ReactNode
}

class Link extends React.Component<ILinkProps> {
  public render() {
    return (
      <div className={styles.container}>
        <RouterLink className={styles.button} to={this.props.to}>
          {this.props.children}
        </RouterLink>
      </div>
    )
  }
}

export default Link
