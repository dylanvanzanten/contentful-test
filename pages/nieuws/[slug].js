import { getEntries } from "./../api/contentful";
import { BLOCKS } from "@contentful/rich-text-types";
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

const options = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: ({
      data: {
        target: { fields },
      },
    }) =>
      `<figure>
			<img src="${fields.file.url}" height="${fields.file.details.image.height}" width="${fields.file.details.image.width}" alt="${fields.description}"/>
			<figcaption>${fields.description}</figcaption>
			</figure>`,
  },
};

const Article = ({ news }) => {
  const {
    title,
    articleImg,
    category,
    author,
    coAuthor,
    articleContent = {},
  } = news.fields;

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
            <div className="article-teaser__author-container">
              <p className="article-teaser__author">{author.fields.name}</p>
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

              {news.fields.coAuthor && (
                <>
                  {coAuthor.map((coAuthor) => (
                    <div key={coAuthor.sys.id}>
                      <p className="article-teaser__author">
                        {coAuthor.fields.name}
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
                __html: documentToHtmlString(articleContent, options),
              }}
            />
          </article>
        </main>
      </div>
    </>
  );
};

export default Article;
