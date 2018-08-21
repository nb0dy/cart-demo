import { ButtonSize } from '@@const/sizes'
import * as React from 'react'
import * as styles from './link.module.scss'

export interface IDisabledLinkProps {
  size?: ButtonSize
  children: React.ReactNode
}

class DisabledLink extends React.Component<IDisabledLinkProps> {
  public render() {
    const { size } = this.props

    return (
      <div className={styles.container}>
        <span className={`${styles.button} ${size === ButtonSize.BIG ? styles.big : ''}`}>
          {this.props.children}
        </span>
      </div>
    )
  }
}

export default DisabledLink
