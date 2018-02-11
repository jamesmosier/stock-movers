import css from 'styled-jsx/css';

export default css`
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
`;
