import { fromUnixTime, format } from 'date-fns'
import styles from './card.module.css'

export default function Card(props) {
  return (
    <div className={styles.card}>
      <h2 className={styles.ticker}>{props.symbol}</h2>
      <p className={styles.price}>${props.latestPrice}</p>
      <p className={styles.updatedDate}>
        {format(fromUnixTime(props.latestUpdate), 'LL/dd/yyyy hh:mm aaaa')}
      </p>
    </div>
  )
}
