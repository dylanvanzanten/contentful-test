import Link from "next/link";
import Image from "next/image";

const ArticleTeaser = ({ news }) => {
  const {
    title,
    slug,
    teaserImg,
    category,
    author,
    coAuthor,
    lead,
    link = {},
  } = news.fields;

  return (
    <li className="article-teaser" style={{display: "flex", marginBottom: "2rem", paddingBottom: "1rem", borderBottom: "1px solid"}}>
      <div className="article-teaser__inner" style={{display: "flex", alignItems: "start", justifyContent: "center", flexDirection: "column", gap: "1rem"}}>
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
                style={{fontSize: "small", border: "1px solid #ccc", padding: "0.25rem", borderRadius: "1rem", paddingLeft: "1rem", paddingRight: "1rem", marginRight: "0.5rem",}}
                className={`article-teaser__label article-teaser__category`}
              >
                {category}
              </span>
            ))}
          </div>
        )}

        {news.fields.lead && (
          <div className="article-teaser__details">
            <p className="article-teaser__lead copy copy--large copy--faded">
              {lead}
            </p>
          </div>
        )}

        <div className="article-teaser__author-container" style={{display: "flex", flexDirection: "column", gap: "1rem"}}>
        <div style={{display: "flex", alignItems: "center", gap: "1rem"}}>
          <p className="article-teaser__author">Author: <strong>{author.fields.name}</strong></p>
          <Image
            src={`https:${author.fields.avatar.fields.file.url}`}
            alt={author.fields.avatar.fields.title}
            quality={100}
            width={20}
            height={20}
            sizes="100vw"
            style={{
              objectFit: "cover",
            }}
          />
          </div>
          {news.fields.coAuthor && (
            <>
              {coAuthor.map((coAuthor) => (
                <div key={coAuthor.sys.id} style={{display: "flex", gap: "1rem"}}>
                  <p className="article-teaser__author">
                    Co-author: <strong>{coAuthor.fields.name}</strong>
                  </p>
                  <Image
                    src={`https:${coAuthor.fields.avatar.fields.file.url}`}
                    alt={coAuthor.fields.avatar.fields.title}
                    quality={100}
                    width={20}
                    height={20}
                    sizes="100vw"
                    style={{
                      objectFit: "cover",
                    }}
                  />
                </div>
              ))}
            </>
          )}
        </div>
        <Link href={"/nieuws/" + slug}>{link}</Link>
      </div>
    </li>
  );
};

export default ArticleTeaser;
