import styles from './button.module.css'
import Link from 'next/link'
import cn from 'classnames'

export default function Button({secondary, link, classes, children}) {
  return (
    <Link href={link ? link : '#'} scroll={false}>
      <a
        type="button"
        className={
          cn(styles['btn'],{ [styles['btn--secondary']]: secondary}, classes)
        }
      >
        {children}
      </a>
    </Link>
  )
}
