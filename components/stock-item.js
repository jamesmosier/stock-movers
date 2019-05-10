// http://beta.morningstar.com/stocks/xnas/${stock.symbol}/quote.html
import Styles from './styles';

export default (props) => {
  const { stock, direction, toggleNews } = props;

  const stockInfoUrl = 'https://finance.yahoo.com/quote/';

  const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  });

  const round = (num) => {
    return currencyFormatter.format(num);
  };

  return (
    <li key={stock.symbol} className="list-item">
      <style jsx>{Styles}</style>

      <div>
        <span className="item-label">Symbol:</span>
        <a href={`${stockInfoUrl}${stock.symbol}`} className={`item-symbol item-symbol-${direction}`} target="_blank">
          {stock.symbol}
        </a>
      </div>

      <div>
        <span className="item-label">Company:</span>
        <a
          href="#"
          onClick={() => {
            toggleNews(stock.symbol);
          }}
          className="company-name"
        >
          {stock.currentQuote.companyName}
        </a>
      </div>

      <div>
        <span className="item-label">Previous Close:</span>
        <span>{round(stock.currentQuote.previousClose)}</span>
      </div>

      <div>
        <span className="item-label">Latest Price:</span>
        <span>{round(stock.currentQuote.latestPrice)}</span>
      </div>

      <div>
        <span className="item-label">Real Time Price:</span>
        <span>{round(stock.currentQuote.iexRealtimePrice)}</span>
      </div>

      <div className="current-divider" title={stock.currentQuote.latestTime}>
        <span className="item-label">Current Latest Price</span>
        <span>{round(stock.currentQuote.latestPrice)}</span>
      </div>
    </li>
  );
};
