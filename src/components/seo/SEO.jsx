import { Helmet } from "react-helmet-async";
import seoConfig from "../../config/seoConfig";

const SEO = ({ title, description, keywords, image, url }) => {
  return (
    <Helmet>
      <title>{title || seoConfig.defaultTitle}</title>
      <meta
        name="description"
        content={description || seoConfig.defaultDescription}
      />
      <meta
        name="keywords"
        content={(keywords || seoConfig.defaultKeywords).join(", ")}
      />

      {/* Open Graph (Facebook, Linkedin) */}
      <meta property="og:title" content={title || seoConfig.defaultTitle} />
      <meta
        property="og:description"
        content={description || seoConfig.defaultDescription}
      />
      <meta property="og:image" content={image || seoConfig.defaultImage} />
      <meta property="og:url" content={url || seoConfig.siteUrl} />
      <meta property="og:type" content="website" />

      {/* Twitter Cards */}
      <meta name="twitter:title" content={title || seoConfig.defaultTitle} />
      <meta
        name="twitter:description"
        content={description || seoConfig.defaultDescription}
      />
      <meta name="twitter:image" content={image || seoConfig.defaultImage} />
      <meta name="twitter:site" content={seoConfig.twitterHandle} />
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
  );
};

export default SEO;
