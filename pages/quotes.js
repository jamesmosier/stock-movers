import React from 'react';
import axios from 'axios';
import Drawer from 'react-motion-drawer';
import _size from 'lodash.size';

import QuoteItem from '../components/quote-item';
import Nav from '../components/nav';
import NewsItem from '../components/news-item';

const drawerProps = {
  overlayColor: 'rgba(0, 0, 0, 0.6)',
  drawerStyle: {
    background: '#F9F9F9',
    margin: 0,
    padding: '10px 15px',
    boxShadow: 'rgba(0, 0, 0, 0.188235) 0px 10px 20px, rgba(0, 0, 0, 0.227451) 0px 6px 6px',
  },
};

const LIST_TYPE = {
  MOST_ACTIVE: 'MOST_ACTIVE',
  TOP_VOLUME: 'TOP_VOLUME',
  GAINERS: 'GAINERS',
  LOSERS: 'LOSERS',
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
      listType: LIST_TYPE.MOST_ACTIVE,
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

  toggleListType = async (listType = LIST_TYPE.MOST_ACTIVE) => {
    try {
      let url = 'https://api.iextrading.com/1.0/stock/market/list/iexvolume';

      switch (listType) {
        case LIST_TYPE.TOP_VOLUME: {
          url = 'https://api.iextrading.com/1.0/stock/market/list/iexvolume';
          break;
        }
        case LIST_TYPE.MOST_ACTIVE: {
          url = 'https://api.iextrading.com/1.0/stock/market/list/mostactive';
          break;
        }
        case LIST_TYPE.GAINERS: {
          url = 'https://api.iextrading.com/1.0/stock/market/list/gainers';
          break;
        }
        case LIST_TYPE.LOSERS: {
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

  render() {
    const activeItems = this.state.listData.map((stock, index) => {
      return <QuoteItem key={stock.symbol} stock={stock} toggleNews={this.toggleNews} rank={index + 1} />;
    });

    const title =
      this.state.listType === LIST_TYPE.MOST_ACTIVE
        ? 'Most Active'
        : this.state.listType === LIST_TYPE.TOP_VOLUME
          ? 'Top Volume'
          : this.state.listType === LIST_TYPE.GAINERS ? 'Gainers' : 'Losers';

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

          <div className="4 col">
            <button
              className="btn"
              style={{ marginRight: '5px', background: this.state.listType == LIST_TYPE.MOST_ACTIVE ? '#ccc' : '#fff' }}
              onClick={() => {
                this.toggleListType(LIST_TYPE.MOST_ACTIVE);
              }}
            >
              Most Active
            </button>
            <button
              className="btn"
              style={{ background: this.state.listType == LIST_TYPE.TOP_VOLUME ? '#ccc' : '#fff' }}
              onClick={() => {
                this.toggleListType(LIST_TYPE.TOP_VOLUME);
              }}
            >
              Top Volume
            </button>

            <button
              className="btn"
              style={{ marginRight: '5px', background: this.state.listType == LIST_TYPE.GAINERS ? '#ccc' : '#fff' }}
              onClick={() => {
                this.toggleListType(LIST_TYPE.GAINERS);
              }}
            >
              Gainers
            </button>

            <button
              className="btn"
              style={{ background: this.state.listType == LIST_TYPE.LOSERS ? '#ccc' : '#fff' }}
              onClick={() => {
                this.toggleListType(LIST_TYPE.LOSERS);
              }}
            >
              Losers
            </button>
          </div>
        </div>

        <a
          className="quick-list-toggle"
          onClick={(e) => {
            this.toggleQuickList(e);
          }}
        >
          Open Quick List
        </a>

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
