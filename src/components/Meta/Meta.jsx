import React from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";

const IMAGE_URL =
  import.meta.env.VITE_FOODIES_IMAGE_URL || "https://foodies-fe.vercel.app/categories/Beef.webp";

const Meta = ({
  title = "Foodies",
  description = "Discover and cook delicious recipes with Foodies.",
  image = IMAGE_URL,
  author = "Foodies Team",
}) => {
  const location = useLocation();
  const fullUrl = `${window.location.origin}${location.pathname}${location.search}`;
  return (
    <Helmet>
      <title>{title} | Foodies</title>
      <meta name="description" content={description} />
      <meta name="keywords" content="recipes, food, cooking, meal ideas" />
      <link rel="canonical" href={fullUrl} />
      <meta name="author" content={author} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={fullUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default Meta;
