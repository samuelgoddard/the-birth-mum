import Head from "next/head";
import { request } from "../lib/datocms";
import { metaTagsFragment, responsiveImageFragment } from "../lib/fragments";
import { renderMetaTags, useQuerySubscription } from "react-datocms";
import Layout from "../components/layout";
import Hero from "../components/hero";
import Values from "../components/values";
import Buckets from "../components/buckets";
import Cards from "../components/cards";
import AboutExcerpt from "../components/about-excerpt";
import Footer from '../components/footer'
import { motion } from "framer-motion"
import { fade } from "../helpers/transitionHelper"

export default function Hypnobirthing({ subscription }) {
  const {
    data: { global, hypnobirthing, site },
  } = useQuerySubscription(subscription);

  const metaTags = hypnobirthing.seo.concat(site.favicon);

  return (
    <>
      <Layout>
        <Head>{renderMetaTags(metaTags)}</Head>

        <motion.div
          initial="initial"
          animate="enter"
          exit="exit"
        >  
          <motion.div variants={fade}>
            
            <Hero
              subHeading={hypnobirthing.heroSubHeading}
              heading={hypnobirthing.heroHeading}
              text={hypnobirthing.heroText}
              image={hypnobirthing.heroImage}
            />

            <Values values={global.values} />

            <AboutExcerpt />

            <Buckets />

            <Cards cards={global.cards} />
            
            <Footer />
          </motion.div>
        </motion.div>
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
        global {
          values {
            heading
            text
          }
          cards {
            cardTitle
            cardImage {
              responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 600, h: 425 }) {
                ...responsiveImageFragment
              }
            }
            cardUrl
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
