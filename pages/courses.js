import Head from "next/head";
import { renderMetaTags, useQuerySubscription } from "react-datocms";
import Hero from "../components/hero";
import Layout from "../components/layout";
import { request } from "../lib/datocms";
import { metaTagsFragment, responsiveImageFragment } from "../lib/fragments";

export default function Courses({ subscription }) {
  const {
    data: { coursesBooking, site },
  } = useQuerySubscription(subscription);

  const metaTags = coursesBooking.seo.concat(site.favicon);

  return (
    <>
      <Layout>
        <Head>{renderMetaTags(metaTags)}</Head>
        
        <Hero
          subHeading={coursesBooking.heroSubHeading}
          heading={coursesBooking.heroHeading}
          text={coursesBooking.heroText}
          image={coursesBooking.heroImage}
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
        coursesBooking {
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