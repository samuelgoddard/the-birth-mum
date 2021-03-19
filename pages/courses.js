import Head from "next/head";
import { renderMetaTags, useQuerySubscription } from "react-datocms";
import Hero from "../components/hero";
import Layout from "../components/layout";
import Buckets from "../components/buckets";
import Footer from '../components/footer'
import { request } from "../lib/datocms";
import { metaTagsFragment, responsiveImageFragment } from "../lib/fragments";
import { motion } from "framer-motion"
import { fade } from "../helpers/transitionHelper"
import Container from "../components/container";

export default function Courses({ subscription }) {
  const {
    data: { coursesBooking, allCourses, site },
  } = useQuerySubscription(subscription);

  const metaTags = coursesBooking.seo.concat(site.favicon);

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
              subHeading={coursesBooking.heroSubHeading}
              heading={coursesBooking.heroHeading}
              text={coursesBooking.heroText}
              image={coursesBooking.heroImage}
            />

            <Container>
            <div className="bg-white rounded-xl">

              <ul className="flex flex-wrap">
                {allCourses.map((course, i) => {
                  return(
                    <li className="w-1/4 p-4 text-center" key={i}>
                      {course.title}
                    </li>
                  )
                })}
              </ul>
              
              
              {allCourses.map((course, i) => {
                return(
                  <div className="flex flex-wrap course-container" key={`course-${i}`}>

                    <div className="w-full text-right md:w-1/3">
                      <h2 className="mb-0">{course.title}</h2>
                      <p className="tracking-widest uppercase">Group hypnobirthing classes in Nottingham</p>
                    </div>

                    <div className="w-full md:w-2/3">

                      <div className="content" dangerouslySetInnerHTML={{__html: course.content }} />

                    </div>
                    
                  </div>
                )
              })}
              
              
            </div>

            </Container>

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
        allCourses: allCourses {
          title
          price
          content
          ticketBookingLinkUrl
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