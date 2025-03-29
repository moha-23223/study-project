import { cc } from 'utils/combineClasses'
import styles from './styles.module.scss'

interface Props {
  className?: string
}

const Button = ({ className }: Props) => {
  return <div className={cc(styles.buttonRoot, className)}>Button component</div>
}


export default Button
