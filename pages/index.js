import { list } from 'iex-cloud'

export default function Home(gainers) {
  return <p>stock movers v2</p>
}

export async function getServerSideProps() {
  const gainers = await list('gainers')
  return { props: { gainers } }
}

// {
//   symbol: 'KALV',
//   companyName: 'KalVista Pharmaceuticals, Inc.',
//   primaryExchange: 'NDQSAA',
//   calculationPrice: 'close',
//   open: 11.48,
//   openTime: 1640386093137,
//   openSource: 'iclffaio',
//   close: 12.934,
//   closeTime: 1649432489082,
//   closeSource: 'afcifiol',
//   high: 13.68,
//   highTime: 1634768497585,
//   highSource: 'y1tcend5udeapii  rleme ',
//   low: 11.18,
//   lowTime: 1658295609785,
//   lowSource: 'lame15dyudtreni epe ic ',
//   latestPrice: 13.42,
//   latestSource: 'Close',
//   latestTime: 'June 23, 2020',
//   latestUpdate: 1594791738536,
//   latestVolume: 420763,
//   iexRealtimePrice: 12.99,
//   iexRealtimeSize: 100,
//   iexLastUpdated: 1600631093034,
//   delayedPrice: 13.51,
//   delayedPriceTime: 1631843982364,
//   oddLotDelayedPrice: 13.3,
//   oddLotDelayedPriceTime: 1651553058518,
//   extendedPrice: 13.53,
//   extendedChange: 0.099,
//   extendedChangePercent: 0.00746,
//   extendedPriceTime: 1650507239184,
//   previousClose: 11.14,
//   previousVolume: 163078,
//   change: 2.037,
//   changePercent: 0.18502,
//   volume: 421345,
//   iexMarketPercent: 0.10945335046183803,
//   iexVolume: 44942,
//   avgTotalVolume: 162605,
//   iexBidPrice: 0,
//   iexBidSize: 0,
//   iexAskPrice: 0,
//   iexAskSize: 0,
//   iexOpen: null,
//   iexOpenTime: null,
//   iexClose: 13.54,
//   iexCloseTime: 1671106299737,
//   marketCap: 232911908,
//   peRatio: -7.5,
//   week52High: 23.71,
//   week52Low: 5.7,
//   ytdChange: -0.22704,
//   lastTradeTime: 1611981252655,
//   isUSMarketOpen: false
// }
