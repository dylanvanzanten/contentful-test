const ArticleTeaser = ({ news }) => {
  return (
    <li className="article-teaser">
      <div className="article-teaser__inner">
        <h2 className="article-teaser__title">{news.fields.title}</h2>
        {/* {teaserImg && (
          <picture className="article-teaser__img-wrapper">
            <img className="article-teaser__img" src={""} alt={""} />
          </picture>
        )}
        {category.fields && (
          <span
            className={`article-teaser__label article-teaser__category`}
          ></span>
        )}

        {showMeta && author.fields && (
          <p className="article-teaser__author"></p>
        )}

        {article.fields.lead && (
          <div className="article-teaser__details">
            <p className="article-teaser__lead copy copy--large copy--faded"></p>
          </div>
        )} */}
      </div>
    </li>
  );
};

export default ArticleTeaser;
