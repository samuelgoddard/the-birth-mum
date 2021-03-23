import styles from './button.module.css'
import Link from 'next/link'
import cn from 'classnames'

export default function Button({secondary, link, classes, children, external}) {
  return (
    <>
      { !external &&
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
      }

      { external && 
        <a 
          href={link ? link : '#'}
          type="button"
          target="_blank"
          className={
            cn(styles['btn'],{ [styles['btn--secondary']]: secondary}, classes)
          }
        >
          {children}
        </a>
      }
    </>
  )
}
