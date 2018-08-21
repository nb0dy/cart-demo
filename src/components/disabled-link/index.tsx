import * as React from 'react'
import * as styles from './link.module.scss'

export interface IDisabledLinkProps {
  children: React.ReactNode
}

class DisabledLink extends React.Component<IDisabledLinkProps> {
  public render() {
    return (
      <div className={styles.container}>
        <span className={styles.button}>
          {this.props.children}
        </span>
      </div>
    )
  }
}

export default DisabledLink
