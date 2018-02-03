export default (props) => {
  const { stock } = props;
  return (
    <li key={stock.symbol}>
      <div>
        <span>Symbol:</span>
        <span>{stock.symbol}</span>
      </div>
      <div>
        <span>Bid Price:</span>
        <span>${stock.quote.bid_price}</span>
      </div>
      <div>
        <span>Ask Price:</span>
        <span>${stock.quote.ask_price}</span>
      </div>
      <div>
        <span>Previous Close:</span>
        <span>${stock.quote.previous_close}</span>
      </div>
    </li>
  );
};
