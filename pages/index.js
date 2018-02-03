import React from 'react';
// import Link from 'next/link';
// import Head from '../components/head';
// import Nav from '../components/nav';
import axios from 'axios';
import _find from 'lodash.find';

export default class extends React.Component {
  static async getInitialProps({ req }) {
    try {
      // const movingUpResp = await axios.get('https://api.robinhood.com/midlands/movers/sp500/?direction=up');
      // const movingUpData = movingUpResp.data.results;

      // const movingDownData = await axios.get('https://api.robinhood.com/midlands/movers/sp500/?direction=down');

      // const movingUpSymbols = movingUpData
      //   .map((item) => {
      //     return item.symbol;
      //   })
      //   .join(',');

      // const movingUpQuotes = await axios.get(`https://api.robinhood.com/quotes/?symbols=${movingUpSymbols}`);
      // const movingUp = movingUpData.map((item) => {
      //   const quote = _find(movingUpQuotes.data.results, { symbol: item.symbol });

      //   return {
      //     symbol: item.symbol,
      //     last_pct: item.price_movement.market_hours_last_movement_pct,
      //     last_price: item.price_movement.market_hours_last_price,
      //     quote: quote,
      //   };
      // });

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
      return <li key={stock.symbol}>{stock.symbol}</li>;
    });

    const moversDownList = this.props.movingDown.map((stock) => {
      return <li key={stock.symbol}>{stock.symbol}</li>;
    });

    return (
      <article>
        <h2>Movers Up</h2>
        <div>
          <ul>{moversUpList}</ul>
        </div>
        <h2>Movers Down</h2>
        <div>
          <ul>{moversDownList}</ul>
        </div>
      </article>
    );
  }
}
