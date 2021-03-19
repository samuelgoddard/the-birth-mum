import Head from "next/head";
import { renderMetaTags, useQuerySubscription } from "react-datocms";
import Hero from "../components/hero";
import Buckets from "../components/buckets";
import Values from '../components/values'
import Layout from "../components/layout";
import Container from '../components/container'
import AboutExcerpt from "../components/about-excerpt";
import Cards from "../components/cards";
import Footer from '../components/footer'
import { request } from "../lib/datocms";
import { metaTagsFragment, responsiveImageFragment } from "../lib/fragments";
import { motion } from "framer-motion"
import { fade } from "../helpers/transitionHelper"
import { Image } from 'react-datocms'


export default function Index({ subscription }) {
  const {
    data: { global, home, site },
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

            <Buckets />

            <div className="mb-12 md:mb-24">
              <Container>
                <div className="flex flex-wrap items-center justify-end lg:pl-32">
                  <div className="w-full mb-6 md:w-1/2 md:mb-0 md:px-5">
                    <div className="w-full">
                      { home.whatWeDoSubheading && (
                        <span className="block mb-2 text-xl italic leading-none text-green-light font-display md:text-2xl lg:text-3xl xl:text-4xl">{ home.whatWeDoSubheading }</span>
                      )}
                      <h2 className="text-4xl leading-none md:text-5xl lg:text-6xl xl:text-7xl">{ home.whatWeDoHeading }</h2>
                      { home.whatWeDoText && (
                        <div
                          className="opacity-75 content lg:text-lg lg:leading-relaxed lg:my-8 lg:w-4/5"
                          dangerouslySetInnerHTML={{ __html: home.whatWeDoText }}
                        />
                      )}                      
                    </div>
                  </div>
                  { home.whatWeDoImage && (
                    <div className="w-full md:w-1/2 md:px-5">
                      <div className="p-3 bg-white rounded-lg">
                        <Image
                          data={{...home.whatWeDoImage.responsiveImage, alt: `${home.whatWeDoHeading}` }}
                          className="w-full rounded-lg"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </Container>
            </div>

            <Values values={global.values} />

            <AboutExcerpt />

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
          whatWeDoSubheading
          whatWeDoHeading
          whatWeDoText
          whatWeDoImage {
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