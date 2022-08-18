import { Helmet } from "react-helmet";

interface MetaTagsProps {
  title: string;
  description: string;
  authors: string;
}

export const MetaTags = (props: MetaTagsProps) => {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{props.title}</title>
      <meta name="description" content={props.description} />
      <meta name="authors" content={props.authors} />

      <meta property="og:title" content={props.title} />
      <meta property="og:description" content={props.description} />

      <meta itemProp="name" content={props.title} />
      <meta itemProp="description" content={props.description} />

      <meta name="twitter:title" content={props.title} />
      <meta name="twitter:description" content={props.description} />
    </Helmet>
  );
};
