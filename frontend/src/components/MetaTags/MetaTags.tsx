import { Helmet } from "react-helmet";

interface MetaTagsProps {
  title: string;
  description: string;
  authors: string;
}

export const MetaTags = (props: MetaTagsProps) => {
  const { title, description, authors } = props;
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="authors" content={authors} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />

      <meta itemProp="name" content={title} />
      <meta itemProp="description" content={description} />

      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
};
