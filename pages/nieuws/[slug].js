import { getEntries } from "./../api/contentful";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";

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
  console.log(news);
  const { title, slug, teaserImg, category, author, articleContent, link } =
    news.fields;
  return (
    <>
      <main>
        <div>
          <h1>{title}</h1>
          {news.fields.author && (
            <>
              {author.map((author) => (
                <p key={author} className="article-teaser__author">
                  {author.fields.name}
                </p>
              ))}
            </>
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
        </div>
      </main>
    </>
  );
};

export default Article;
