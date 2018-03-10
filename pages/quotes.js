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
      console.log('it is true!!!!!');
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
      const url =
        listType === LIST_TYPE.TOP_VOLUME
          ? 'https://api.iextrading.com/1.0/stock/market/list/iexvolume'
          : 'https://api.iextrading.com/1.0/stock/market/list/mostactive';
      const resp = await axios.get(url);

      this.setState({
        listData: resp.data,
        listType,
      });
    } catch (e) {
      console.log('error toggling between list types!', e);
    }
  };

  render() {
    const activeItems = this.state.listData.map((stock, index) => {
      return <QuoteItem key={stock.symbol} stock={stock} toggleNews={this.toggleNews} rank={index + 1} />;
    });

    return (
      <div className="c">
        <style jsx global>
          {`
            :global(body) {
              ${this.state.drawerOpen ? 'overflow: hidden;' : ''};
            }

            ul {
              list-style-type: none;
              padding-left: 0;
              position: relative;
            }
          `}
        </style>

        <div className="row">
          <div className="8 col">
            <h1>{this.state.listType === LIST_TYPE.MOST_ACTIVE ? 'Most Active' : 'Top Volume'}</h1>
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
          </div>
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
