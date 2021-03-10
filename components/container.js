import styles from './container.module.css'
import cn from 'classnames'

export default function Container({ children, thin }) {
  return (
    <div className={
      cn(styles['container'], { [styles['container--thin']]: thin })
    }>
      {children}
    </div>
  )
}