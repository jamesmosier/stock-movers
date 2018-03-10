import css from 'styled-jsx/css';

export default css`
  table {
    font-size: 13px;
  }

  .ma-rank {
    color: #9c9999;
    position: absolute;
    right: 8px;
    top: 1px;
  }

  .ma-list-item {
    position: relative;
    float: left;
    width: calc(50% - 10px);
    background-color: #e6e6e2;
    margin: 5px;
    margin-bottom: 15px;
    padding: 5px 10px;
    border: 1px solid #d6d6d6;
    border-radius: 2px;
    box-shadow: 3px 3px 10px #e0dcdc;
  }

  .news-wrapper {
    margin-left: 20px;
  }

  .news-wrapper a {
    color: #4fa4c7;
  }
`;
