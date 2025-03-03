import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import styles from "../styles/ArticleDetails.module.css";
import articlesData from "../../../data/test/articlesData";
import ShareButtons from "../../../components/common/Share/ShareButtons";
import Navbar from "../../../components/common/Navbar/Navbar";
import matter from "gray-matter";
import { Buffer } from "buffer";
import SEO from "../../../components/seo/SEO";
import API_BASE_URL from "../../../api/config";

// ✅ Ensure Buffer is available in the browser
if (!window.Buffer) {
  window.Buffer = Buffer;
}

const ArticleDetails = () => {
  const { id } = useParams();
  const [articleContent, setArticleContent] = useState("");
  const [meta, setMeta] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/articles/article-${id}.md`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch article: ${response.statusText}`);
        }
        return response.text();
      })
      .then((text) => {
        console.log("✅ Fetched Markdown:", text); // Debugging

        try {
          const { data: metaData, content } = matter(text);
          console.log("✅ Extracted Metadata:", metaData); // Debugging

          setMeta(metaData);
          setArticleContent(content);
        } catch (parseError) {
          console.error("❌ Error parsing markdown:", parseError);
          setError("Error parsing article content.");
        }
      })
      .catch((fetchError) => {
        console.error("❌ Error fetching Markdown:", fetchError);
        setError("Error loading article.");
      });
  }, [id]);

  useEffect(() => {
    if (meta) {
      const related = articlesData
        .filter(
          (article) =>
            article.category === meta.category &&
            String(article._id) !== String(id) // ✅ Ensure ID is compared as a string
        )
        .slice(0, 2);

      console.log("✅ Related Articles:", related); // Debugging
      setRelatedArticles(related);
    }
  }, [meta, id]);

  if (error) return <p className={styles.error}>{error}</p>;
  if (!meta) return <p className={styles.loading}>Loading article...</p>;

  return (
    <>
      <SEO
        title={meta?.title}
        description={meta?.description}
        keywords={[meta?.category, "AI", "research"]}
        image={meta?.image}
        url={`${API_BASE_URL}/articles/${meta?._id}`}
      />
      <Navbar />
      <div className={styles.articlePageWrapper}>
        <div className={`${styles.linksWrapper} container`}>
          <div className={styles.backLink}>
            <Link className={styles.articleLink} to="/articles">
              ←{" "}
              <span className={styles.articleButtonText}>Back to Articles</span>
            </Link>
          </div>
          <div className={styles.articleShare}>
            <ShareButtons
              className={styles.articleShareButtons}
              url={window.location.href}
              title={meta.title}
            />
          </div>
        </div>
        <div className={styles.articleContainer}>
          {/* ✅ Hero Section */}
          <header className={styles.hero}>
            <div className={styles.metaInfo}>
              <span className={styles.category}>{meta.category}</span>
              <span>{meta.date}</span>
            </div>
            <h1 className={styles.title}>{meta.title}</h1>
            <div className={styles.author}>
              <span>{meta.author}</span> • {meta.readTime}
            </div>
          </header>

          {/* ✅ Hero Image */}
          {meta.image && (
            <img
              src={meta.image}
              alt={meta.title}
              className={styles.articleImage}
            />
          )}

          {/* ✅ Render Markdown Content */}
          <section className={styles.content}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {articleContent}
            </ReactMarkdown>
          </section>

          {/* ✅ Author Section */}
          <div className={styles.authorSection}>
            <div className={styles.authorInfo}>
              <h4>{meta.author}</h4>
              <p>{meta.authorBio || "Senior Partner"}</p>
            </div>
          </div>

          {/* ✅ Related Articles
          {relatedArticles.length > 0 && (
            <section className={styles.relatedArticles}>
              <h2>Related Articles</h2>
              <div className={styles.relatedGrid}>
                {relatedArticles.map((related) => (
                  <Link
                    to={`/articles/${related._id}`}
                    key={related._id}
                    className={styles.relatedCard}
                  >
                    <div className={styles.relatedImage}></div>
                    <div className={styles.relatedMeta}>
                      <span className={styles.relatedCategory}>
                        {related.category}
                      </span>
                      <h3 className={styles.relatedTitle}>{related.title}</h3>
                      <p>{related.readTime}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )} */}
        </div>
      </div>
    </>
  );
};

export default ArticleDetails;
