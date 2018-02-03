import React from 'react';
import axios from 'axios';
import _find from 'lodash.find';

import Head from '../components/head';
import Fonts from '../utils/font-observer';
import StockItem from '../components/stock-item';
import stylesIndex from '../styles/index.css';

export default class extends React.Component {
  componentDidMount() {
    Fonts();
  }

  static async getInitialProps({ req }) {
    try {
      const getData = (direction) => {
        try {
          return new Promise(async (resolve, reject) => {
            const moversResp = await axios.get(`https://api.robinhood.com/midlands/movers/sp500/?direction=${direction}`);
            const moversRespData = moversResp.data.results;

            const moversSymbols = moversRespData
              .map((item) => {
                return item.symbol;
              })
              .join(',');

            const moversQuotes = await axios.get(`https://api.robinhood.com/quotes/?symbols=${moversSymbols}`);
            const movers = moversRespData.map((item) => {
              const quote = _find(moversQuotes.data.results, { symbol: item.symbol });

              return {
                symbol: item.symbol,
                last_pct: item.price_movement.market_hours_last_movement_pct,
                last_price: item.price_movement.market_hours_last_price,
                quote: quote,
              };
            });

            resolve(movers);
          });
        } catch (e) {
          console.error('inside getdata', e);
        }
      };

      const movingUp = await getData('up');
      const movingDown = await getData('down');

      return {
        movingUp: movingUp,
        movingDown: movingDown,
        foo: 'bdddd3d',
      };
    } catch (e) {
      console.log('Error during getting data!');
      console.log(e.code);
      return {
        movingUp: [], //movingUp,
        movingDown: [], //movingDown,
      };
    }
  }

  render() {
    const moversUpList = this.props.movingUp.map((stock) => {
      return <StockItem key={stock.symbol} stock={stock} direction={'up'} />;
    });

    const moversDownList = this.props.movingDown.map((stock) => {
      return <StockItem key={stock.symbol} stock={stock} direction={'down'} />;
    });

    return (
      <article className="c">
        <Head title="Stock Movers" />
        <style jsx>{`
          :global(body) {
            margin: 0;
            font-family: 'Work Sans', sans-serif;
            background-color: #f7f6ed;
          }

          ul {
            list-style-type: none;
            padding-left: 0;
            position: relative;
          }
        `}</style>
        <style jsx>{stylesIndex}</style>

        <div className="row">
          <section className="6 col">
            <h2>Movers Up</h2>
            <div>
              <ul>{moversUpList}</ul>
            </div>
          </section>

          <section className="6 col">
            <h2>Movers Down</h2>
            <div>
              <ul>{moversDownList}</ul>
            </div>
          </section>
        </div>
      </article>
    );
  }
}
