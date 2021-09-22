import Head from 'next/head';

interface Props {
  title: string;
  description: string;
}

const Meta = ({
  title = "Photo Application",
  description = "This is Photo Application!!!!",
}: Props) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${process.env.SITE_URL}/ogp.png`} />
      <meta property="twitter:card" content="summary_large_image" />
      <link rel="icon" href="/image/icon_liked.png" />
    </Head>
  );
};

export default Meta;
