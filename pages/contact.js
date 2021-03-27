import Head from "next/head";
import { renderMetaTags, useQuerySubscription } from "react-datocms";
import { request } from "../lib/datocms";
import { metaTagsFragment, responsiveImageFragment } from "../lib/fragments";
import Layout from "../components/layout";
import Hero from "../components/hero";
import Values from "../components/values";
import Buckets from "../components/buckets";
import AboutExcerpt from "../components/about-excerpt";
import Footer from '../components/footer'
import { motion } from "framer-motion"
import { fade } from "../helpers/transitionHelper"

export default function Contact({ subscription }) {
  const {
    data: { global, contact, site },
  } = useQuerySubscription(subscription);

  const metaTags = contact.seo.concat(site.favicon);

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
              subHeading={contact.heroSubHeading}
              heading={contact.heroHeading}
              text={contact.heroText}
              form
            />

            <Values values={global.values} blob />

            <AboutExcerpt heading={global.hypnobirthingHeading} intro={global.hypnobirthingIntro} />

            <Buckets />

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
        contact {
          seo: _seoMetaTags {
            ...metaTagsFragment
          }
          heroSubHeading
          heroHeading
          heroText
        }
        global {
          values {
            heading
            text
          }
          hypnobirthingHeading
          hypnobirthingIntro
        }
      }

      ${metaTagsFragment}
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