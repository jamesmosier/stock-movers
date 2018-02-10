// http://beta.morningstar.com/stocks/xnas/${stock.symbol}/quote.html

export default (props) => {
  const { stock, direction } = props;

  const stockInfoUrl = 'https://finance.yahoo.com/quote/';

  const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  });

  const round = (num) => {
    return currencyFormatter.format(num); //Math.round(num * 100) / 100;
  };

  return (
    <li key={stock.symbol} className="list-item">
      <style jsx>{`
        .list-item {
          margin-bottom: 30px;
          position: relative;
          counter-increment: step-counter;
        }

        .list-item:before {
          content: counter(step-counter);
          position: absolute;
          left: -60px;
          font-size: 60px;
          top: 13px;
          color: #e0e0e0;
        }

        .item-label {
          font-weight: 600;
          margin-right: 5px;
        }

        .item-symbol {
          font-weight: bold;
          font-size: 19px;
        }

        .item-symbol-up {
          color: #64bd85;
        }

        .item-symbol-down {
          color: #bd6464;
        }

        .current-divider {
          border-top: 1px solid #ccc;
          width: 60%;
          padding-top: 5px;
        }

        .company-name {
          color: #2f7a98;
          width: 250px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          display: inline-block;
          margin: 0;
          vertical-align: bottom;
        }
      `}</style>

      <div>
        <span className="item-label">Symbol:</span>
        <a href={`${stockInfoUrl}${stock.symbol}`} className={`item-symbol item-symbol-${direction}`} target="_blank">
          {stock.symbol}
        </a>
      </div>

      <div>
        <span className="item-label">Company:</span>
        <span className="company-name">{stock.currentQuote.companyName}</span>
      </div>

      <div>
        <span className="item-label">Previous Close:</span>
        <span>{round(stock.quote.previous_close)}</span>
      </div>

      <div>
        <span className="item-label">Bid Price:</span>
        <span>{round(stock.quote.bid_price)}</span>
      </div>

      <div>
        <span className="item-label">Ask Price:</span>
        <span>{round(stock.quote.ask_price)}</span>
      </div>

      <div className="current-divider" title={stock.currentQuote.latestTime}>
        <span className="item-label">Current Latest Price</span>
        <span>{round(stock.currentQuote.latestPrice)}</span>
      </div>
    </li>
  );
};
