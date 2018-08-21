import { ButtonSize } from '@@const/sizes'
import * as React from 'react'
import * as styles from './button.module.scss'

export interface IButtonProps {
  type?: string
  disabled?: boolean
  size?: ButtonSize
  children: React.ReactNode
  onClick: (params: React.SyntheticEvent) => void
}

class Button extends React.Component<IButtonProps> {
  public render() {
    const { type = 'button', disabled = false, size = ButtonSize.SMALL } = this.props
    return (
      <div className={styles.container}>
        <button type={type} className={`${styles.button} ${disabled ? styles.disabled : ''} ${size === ButtonSize.BIG ? styles.big : ''}`} onClick={this.props.onClick} disabled={disabled}>
          {this.props.children}
        </button>
      </div>
    )
  }
}

export default Button
