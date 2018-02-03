const RobinHood = require('robinhood-api');
const robinhood = new RobinHood();

export default async function() {
  let savemeDown = [];
  let savemeUp = [];

  const sp500Down = await robinhood.getSP500Movers({ direction: 'down' });

  for (let res of sp500Down.results) {
    const quote = await robinhood.getQuote({ symbol: res.symbol });
    savemeDown.push({
      symbol: res.symbol,
      last_pct: res.price_movement.market_hours_last_movement_pct,
      last_price: res.price_movement.market_hours_last_price,
      quote: quote,
    });
  }

  const sp500Up = await robinhood.getSP500Movers({ direction: 'up' });

  for (let res of sp500Up.results) {
    const quote = await robinhood.getQuote({ symbol: res.symbol });
    savemeUp.push({
      symbol: res.symbol,
      last_pct: res.price_movement.market_hours_last_movement_pct,
      last_price: res.price_movement.market_hours_last_price,
      quote: quote,
    });
  }

  return {
    up: sp500Up,
    down: sp500Down,
  };
}
