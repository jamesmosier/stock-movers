export default (props) => {
  const { stock, direction } = props;
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
      `}</style>

      <div>
        <span className="item-label">Symbol:</span>
        <span className={`item-symbol item-symbol-${direction}`}>{stock.symbol}</span>
      </div>
      <div>
        <span className="item-label">Bid Price:</span>
        <span>${stock.quote.bid_price}</span>
      </div>
      <div>
        <span className="item-label">Ask Price:</span>
        <span>${stock.quote.ask_price}</span>
      </div>
      <div>
        <span className="item-label">Previous Close:</span>
        <span>${stock.quote.previous_close}</span>
      </div>
    </li>
  );
};
