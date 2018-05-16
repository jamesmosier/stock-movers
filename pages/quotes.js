import React from 'react';
import axios from 'axios';
import Drawer from 'react-motion-drawer';
import _size from 'lodash.size';

import ToggleListButtons from '../components/toggle-list-buttons';
import QuoteItem from '../components/quote-item';
import Nav from '../components/nav';
import NewsItem from '../components/news-item';
import constants from '../utils/constants';

const drawerProps = {
  overlayColor: 'rgba(0, 0, 0, 0.6)',
  drawerStyle: {
    background: '#F9F9F9',
    margin: 0,
    padding: '10px 15px',
    boxShadow: 'rgba(0, 0, 0, 0.188235) 0px 10px 20px, rgba(0, 0, 0, 0.227451) 0px 6px 6px',
  },
};

export default class extends React.Component {
  constructor() {
    super();

    this.state = {
      drawerOpen: false,
      news: {
        articles: [],
        symbol: '',
      },
      listData: [],
      listType: constants.LIST_TYPE.MOST_ACTIVE,
      quickListOpen: false,
    };
  }

  async componentDidMount() {
    try {
      document.title = 'Quotes | Stock Movers';

      const mostActive = await axios.get(`https://api.iextrading.com/1.0/stock/market/list/mostactive`);
      this.setState({
        listData: mostActive.data,
      });
    } catch (e) {}
  }

  toggleNews = async (symbol) => {
    if (symbol === this.state.news.symbol) {
      this.setState({ drawerOpen: true });
      return;
    }

    const newsResp = await axios.get(`https://api.iextrading.com/1.0/stock/${symbol}/news`);

    this.setState({
      drawerOpen: true,
      news: {
        articles: newsResp.data,
        symbol,
      },
    });
  };

  toggleListType = async (listType = constants.LIST_TYPE.MOST_ACTIVE) => {
    try {
      let url = 'https://api.iextrading.com/1.0/stock/market/list/iexvolume';

      switch (listType) {
        case constants.LIST_TYPE.TOP_VOLUME: {
          url = 'https://api.iextrading.com/1.0/stock/market/list/iexvolume';
          break;
        }
        case constants.LIST_TYPE.MOST_ACTIVE: {
          url = 'https://api.iextrading.com/1.0/stock/market/list/mostactive';
          break;
        }
        case constants.LIST_TYPE.GAINERS: {
          url = 'https://api.iextrading.com/1.0/stock/market/list/gainers';
          break;
        }
        case constants.LIST_TYPE.LOSERS: {
          url = 'https://api.iextrading.com/1.0/stock/market/list/losers';
          break;
        }
      }

      const resp = await axios.get(url);

      this.setState({
        listData: resp.data,
        listType,
      });
    } catch (e) {
      console.log('error toggling between list types!', e);
    }
  };

  toggleQuickList = (e) => {
    e.preventDefault();

    this.setState({
      quickListOpen: !this.state.quickListOpen,
    });
  };

  getTitle = () => {
    return this.state.listType === constants.LIST_TYPE.MOST_ACTIVE
      ? 'Most Active'
      : this.state.listType === constants.LIST_TYPE.TOP_VOLUME
        ? 'Top Volume'
        : this.state.listType === constants.LIST_TYPE.GAINERS
          ? 'Gainers'
          : 'Losers';
  };

  render() {
    let activeItems = this.state.listData.map((stock, index) => {
      return <QuoteItem key={stock.symbol} stock={stock} toggleNews={this.toggleNews} rank={index + 1} />;
    });

    if (!activeItems.length) {
      activeItems = <p style={{ marginLeft: '20px', fontWeight: 'bold', color: '#c32551' }}>No items to display right now 😞</p>;
    }

    let quickListButton = '';
    if (this.state.listData && this.state.listData.length) {
      quickListButton = (
        <a
          className="quick-list-toggle"
          onClick={(e) => {
            this.toggleQuickList(e);
          }}
        >
          Open Quick List
        </a>
      );
    }

    const title = this.getTitle();

    return (
      <div className="c quotes-wrapper">
        <style jsx global>
          {`
            :global(body) {
              ${this.state.drawerOpen ? 'overflow: hidden;' : ''};
            }

            .quotes-wrapper {
              position: relative;
            }

            ul {
              list-style-type: none;
              padding-left: 0;
              position: relative;
            }

            .quick-list {
              display: none;
              background: #efefef;
              padding: 5px;
              position: absolute;
              z-index: 9;
              box-shadow: 3px 3px 10px #c1c1c1;
              border: 1px solid #d2d2d2;
            }

            .quick-list-active {
              display: block;
            }

            .quick-list ol {
              font-size: 12px;
            }

            a {
              cursor: pointer;
            }

            .quick-list-toggle {
              padding-left: 5px;
              font-size: 12px;
              text-align: right;
            }
          `}
        </style>

        <div className="row">
          <div className="8 col">
            <h1>{title}</h1>
          </div>

          <ToggleListButtons toggleListType={this.toggleListType} listType={this.state.listType} />
        </div>

        {quickListButton}

        <div className={`quick-list ${this.state.quickListOpen ? 'quick-list-active' : ''}`}>
          <ol>
            {this.state.listData.map((stock, index) => {
              return <li key={index}>{stock.companyName}</li>;
            })}
          </ol>
        </div>

        <div>{activeItems}</div>

        <Drawer
          {...drawerProps}
          right={true}
          fadeOut={true}
          width={500}
          open={this.state.drawerOpen}
          onChange={(open) => this.setState({ drawerOpen: open })}
        >
          <ul className="news-articles">
            {_size(this.state.news.articles) &&
              this.state.news.articles.map((article) => <NewsItem key={article.headline} article={article} />)}
          </ul>
        </Drawer>
      </div>
    );
  }
}
