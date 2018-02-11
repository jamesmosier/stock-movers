import NewsStyles from './news-styles';
import { DateTime } from 'luxon';

export default (props) => {
  const { article } = props;

  return (
    <li className="article-item">
      <style jsx>{NewsStyles}</style>
      <h3 className="article-heading">
        <a href={article.url} target="_blank">
          {article.headline}
        </a>
      </h3>
      <small className="article-source">{article.source}</small>
      <time className="article-time">{DateTime.fromISO(article.datetime).toLocaleString(DateTime.DATETIME_FULL)}</time>
      <p className="article-body">{article.summary}</p>
      <p className="article-related">{article.related}</p>
    </li>
  );
};
