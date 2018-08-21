import * as React from 'react'
import * as styles from './button.module.scss'

export interface IButtonProps {
  type?: string
  children: React.ReactNode
  onClick: (params: React.SyntheticEvent) => void
}

class Button extends React.Component<IButtonProps> {
  public render() {
    const { type = 'button' } = this.props
    return (
      <div className={styles.container}>
        <button type={type} className={styles.button} onClick={this.props.onClick}>
          {this.props.children}
        </button>
      </div>
    )
  }
}

export default Button
