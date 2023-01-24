import { getEntries } from "./../api/contentful";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import Image from "next/image";

export const getStaticPaths = async () => {
  const news = await getEntries({ content_type: "nieuws" });

  const paths = news.items.map((item) => {
    return {
      params: { slug: item.fields.slug },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export async function getStaticProps({ params }) {
  const { items } = await getEntries({
    content_type: "nieuws",
    "fields.slug": params.slug,
  });

  return {
    props: { news: items[0] },
  };
}

const Article = ({ news }) => {
  const { title, articleImg, category, author, articleContent } = news.fields;
  console.log(author);
  return (
    <>
      <div className="article">
        <main>
          {news.fields.articleImg && (
            <picture className="article__img-wrapper">
              <source
                srcSet={`https:${articleImg.fields.file.url}?fit=scale&h=300&fm=webp`}
                media="(min-width: 960px)"
                type="image/webp"
              />
              <source
                srcSet={`https:${articleImg.fields.file.url}?fit=fill&h=300&w=300&fm=webp`}
                media="(min-width: 640px)"
                type="image/webp"
              />
              <source
                srcSet={`https:${articleImg.fields.file.url}?fit=fill&h=300&w=300&fm=webp`}
                media="(max-width: 639px)"
                type="image/webp"
              />
              <source
                srcSet={`https:${articleImg.fields.file.url}?fit=scale&h=250&fm=webp`}
                media="(max-width: 479px)"
                type="image/webp"
              />
              <img
                className="article-teaser__img"
                src={`https:${articleImg.fields.file.url}`}
                alt={articleImg.fields.title}
              />
            </picture>
          )}
          <article className="article__content">
            <h1>{title}</h1>
            {news.fields.author && (
              <div className="article-teaser__author-container">
                {author.map((author) => (
                  <>
                    <p key={author.sys.id} className="article-teaser__author">
                      {author.fields.name}
                    </p>
                    <Image
                      src={`https:${author.fields.avatar.fields.file.url}`}
                      alt={author.fields.avatar.fields.title}
                      quality={100}
                      blurDataURL={`https:${author.fields.avatar.fields.file.url}`}
                      placeholder="blur"
                      width={20}
                      height={20}
                      sizes="100vw"
                    />
                  </>
                ))}
              </div>
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
            <div
              dangerouslySetInnerHTML={{
                __html: documentToHtmlString(articleContent),
              }}
            />
          </article>
        </main>
      </div>
    </>
  );
};

export default Article;
