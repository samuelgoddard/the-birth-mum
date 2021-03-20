import Head from "next/head";
import { renderMetaTags, useQuerySubscription } from "react-datocms";
import { request } from "../lib/datocms";
import { metaTagsFragment, responsiveImageFragment } from "../lib/fragments";
import Layout from "../components/layout";
import Hero from "../components/hero";
import Values from "../components/values";
import Buckets from "../components/buckets";
import Container from "../components/container";
import Card from "../components/card";
import AboutExcerpt from "../components/about-excerpt";
import Footer from '../components/footer'
import { motion } from "framer-motion"
import { fade } from "../helpers/transitionHelper"

export default function About({ subscription }) {
  const {
    data: { global, about, site },
  } = useQuerySubscription(subscription);

  const metaTags = about.seo.concat(site.favicon);

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
              subHeading={about.heroSubHeading}
              heading={about.heroHeading}
              text={about.heroText}
              image={about.heroImage}
            />

            <Values values={global.values} />

            <AboutExcerpt />

            <Buckets />

            <Container>
              <div className="flex flex-wrap my-32">
                {global.cards.map((card, i) => {
                  return(
                    <Card
                      url={card.cardUrl}
                      image={card.cardImage}
                      title={card.cardTitle}
                    />
                  )
                })}
              </div>
            </Container>

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
        about {
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