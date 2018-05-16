import constants from '../utils/constants';

export default (props) => {
  const { toggleListType, listType } = props;

  return (
    <div className="4 col">
      <button
        className="btn"
        style={{ marginRight: '5px', background: listType == constants.LIST_TYPE.MOST_ACTIVE ? '#ccc' : '#fff' }}
        onClick={() => {
          toggleListType(constants.LIST_TYPE.MOST_ACTIVE);
        }}
      >
        Most Active
      </button>
      <button
        className="btn"
        style={{ background: listType == constants.LIST_TYPE.TOP_VOLUME ? '#ccc' : '#fff' }}
        onClick={() => {
          toggleListType(constants.LIST_TYPE.TOP_VOLUME);
        }}
      >
        Top Volume
      </button>

      <button
        className="btn"
        style={{ marginRight: '5px', background: listType == constants.LIST_TYPE.GAINERS ? '#ccc' : '#fff' }}
        onClick={() => {
          toggleListType(constants.LIST_TYPE.GAINERS);
        }}
      >
        Gainers
      </button>

      <button
        className="btn"
        style={{ background: listType == constants.LIST_TYPE.LOSERS ? '#ccc' : '#fff' }}
        onClick={() => {
          toggleListType(constants.LIST_TYPE.LOSERS);
        }}
      >
        Losers
      </button>
    </div>
  );
};
