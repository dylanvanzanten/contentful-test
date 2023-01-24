import Link from "next/link";

const ArticleTeaser = ({ news }) => {
  const { title, slug, teaserImg, category, author, lead, link } = news.fields;
  return (
    <li className="article-teaser">
      <div className="article-teaser__inner">
        <h2 className="article-teaser__title">{title}</h2>
        {news.fields.teaserImg && (
          <picture className="article-teaser__img-wrapper">
            <source
              srcSet={`https:${teaserImg.fields.file.url}?fit=scale&h=300&fm=webp`}
              media="(min-width: 960px)"
              type="image/webp"
            />
            <source
              srcSet={`https:${teaserImg.fields.file.url}?fit=fill&h=300&w=300&fm=webp`}
              media="(min-width: 640px)"
              type="image/webp"
            />
            <source
              srcSet={`https:${teaserImg.fields.file.url}?fit=fill&h=300&w=300&fm=webp`}
              media="(max-width: 639px)"
              type="image/webp"
            />
            <source
              srcSet={`https:${teaserImg.fields.file.url}?fit=scale&h=250&fm=webp`}
              media="(max-width: 479px)"
              type="image/webp"
            />
            <img
              className="article-teaser__img"
              src={`https:${teaserImg.fields.file.url}`}
              alt={teaserImg.fields.title}
            />
          </picture>
        )}

        {news.fields.category && (
          <div className="article-teaser__category-container">
            {category.map((category) => (
              <span
                key={category}
                className={`article-teaser__label article-teaser__category`}
              >
                {category}
              </span>
            ))}
          </div>
        )}

        {news.fields.author && (
          <>
            {author.map((author) => (
              <p key={author} className="article-teaser__author">
                {author.fields.name}
              </p>
            ))}
          </>
        )}

        {news.fields.lead && (
          <div className="article-teaser__details">
            <p className="article-teaser__lead copy copy--large copy--faded">
              {lead}
            </p>
          </div>
        )}
        <Link href={"/nieuws/" + slug}>{link}</Link>
      </div>
    </li>
  );
};

export default ArticleTeaser;
