import { Helmet } from "react-helmet-async";
import seoConfig from "../../config/seoConfig";

const SEO = ({ title, description, keywords, image, url }) => {
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title || seoConfig.defaultTitle}</title>
      <meta
        name="description"
        content={description || seoConfig.defaultDescription}
      />

      {/* Open Graph / Facebook / WhatsApp */}
      <meta property="og:title" content={title || seoConfig.defaultTitle} />
      <meta
        property="og:description"
        content={description || seoConfig.defaultDescription}
      />
      <meta property="og:image" content={image || seoConfig.defaultImage} />
      <meta property="og:url" content={url || seoConfig.siteUrl} />
      <meta property="og:type" content="article" />

      {/* Ensure proper WhatsApp preview */}
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter Meta Tags */}
      <meta name="twitter:title" content={title || seoConfig.defaultTitle} />
      <meta
        name="twitter:description"
        content={description || seoConfig.defaultDescription}
      />
      <meta name="twitter:image" content={image || seoConfig.defaultImage} />
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
  );
};

export default SEO;
