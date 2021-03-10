import Head from "next/head";
import { renderMetaTags, useQuerySubscription } from "react-datocms";
import Hero from "../components/hero";
import Layout from "../components/layout";
import { request } from "../lib/datocms";
import { metaTagsFragment, responsiveImageFragment } from "../lib/fragments";

export default function Hypnobirthing({ subscription }) {
  const {
    data: { hypnobirthing, site },
  } = useQuerySubscription(subscription);

  const metaTags = hypnobirthing.seo.concat(site.favicon);

  return (
    <>
      <Layout>
        <Head>{renderMetaTags(metaTags)}</Head>
        
        <Hero
          subHeading={hypnobirthing.heroSubHeading}
          heading={hypnobirthing.heroHeading}
          text={hypnobirthing.heroText}
          image={hypnobirthing.heroImage}
        />
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const graphqlRequest = {
    query: `
      {
        site: _site {
          favicon: faviconMetaTags {
            ...metaTagsFragment
          }
        }
        hypnobirthing {
          seo: _seoMetaTags {
            ...metaTagsFragment
          }
          heroSubHeading
          heroHeading
          heroText
          heroImage {
            responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 1200, h: 850 }) {
              ...responsiveImageFragment
            }
          }
        }
      }

      ${metaTagsFragment}
      ${responsiveImageFragment}
    `
  };

  return {
    props: {
      subscription: {
        enabled: false,
        initialData: await request(graphqlRequest),
      }
    },
  };
}