import Head from "next/head";
import { renderMetaTags, useQuerySubscription } from "react-datocms";
import Hero from "../components/hero";
import Bucket from "../components/bucket";
import Layout from "../components/layout";
import Footer from '../components/footer'
import { request } from "../lib/datocms";
import { metaTagsFragment, responsiveImageFragment } from "../lib/fragments";
import { motion } from "framer-motion"
import { fade } from "../helpers/transitionHelper"

export default function Index({ subscription }) {
  const {
    data: { home, site },
  } = useQuerySubscription(subscription);

  const metaTags = home.seo.concat(site.favicon);

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
              subHeading={home.heroSubHeading}
              heading={home.heroHeading}
              text={home.heroText}
              image={home.heroImage}
            />

            <div class="flex justify-center my-12">
              
              <Bucket
                icon="calendar"
                title="Interested?"
                text="Check out our course options and upcoming dates!"
                linkTarget="/courses"
                linkLabel="View Dates"
              />

              <Bucket
                icon="contact"
                title="Get in touch!"
                text="We can have a chat and discuss the perfect course for you."
                linkTarget="/contact"
                linkLabel="Contact me"
              />

              <Bucket
                icon="book"
                title="Book!"
                text="Book a TBM course and prepare for a positive birth."
                linkTarget="/courses"
                linkLabel="View courses"
              />
              
            </div>

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
        home {
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