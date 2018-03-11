// import Styles from './styles';
import Styles from './most-active-styles';

export default (props) => {
  const { stock, toggleNews, rank } = props;

  const stockInfoUrl = 'https://finance.yahoo.com/quote/';

  const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  });

  const round = (num) => {
    return currencyFormatter.format(num);
  };

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <div key={stock.symbol} className="ma-list-item">
      <style jsx>{Styles}</style>

      <div className="ma-rank">{rank}</div>

      <div>
        <a href={`${stockInfoUrl}${stock.symbol}`} className="ma-item-symbol" target="_blank">
          <h5 className="ma-heading">
            {stock.companyName} ({stock.symbol})
          </h5>
        </a>
      </div>

      <div className="row ma-row">
        <div className="6 col">
          <table className="w-100">
            <tbody>
              <tr>
                <td>Current</td>
                <td>
                  <b>{round(stock.latestPrice)}</b>
                </td>
              </tr>
              <tr>
                <td>Open</td>
                <td>
                  <b>{round(stock.open)}</b>
                </td>
              </tr>
              <tr>
                <td>Latest Volume</td>
                <td>
                  <b>{numberWithCommas(stock.latestVolume)}</b>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="6 col">
          <table className="w-100">
            <tbody>
              <tr>
                <td>52 Week High</td>
                <td>
                  <b>{round(stock.week52High)}</b>
                </td>
              </tr>
              <tr>
                <td>52 Week Low</td>
                <td>
                  <b>{round(stock.week52Low)}</b>
                </td>
              </tr>
              <tr>
                <td>
                  <small className="news-wrapper">
                    <a
                      href="#"
                      onClick={() => {
                        toggleNews(stock.symbol);
                      }}
                    >
                      News
                    </a>
                  </small>
                </td>
                <td />
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* <div>
        <span className="ma-item-label">Open Price:</span>
        <span>{round(stock.open)}</span>
      </div>

      <div>
        <span className="ma-item-label">Close Price:</span>
        <span>{round(stock.close)}</span>
      </div>

      <div>
        <span className="ma-item-label">Latest Volume:</span>
        <span>{stock.latestVolume}</span>
      </div>

      <div title={stock.latestTime}>
        <span className="ma-item-label">Current Latest Price</span>
        <span>{round(stock.latestPrice)}</span>
      </div>
      */}
    </div>
  );
};
