import Head from "next/head";
import { renderMetaTags, useQuerySubscription } from "react-datocms";
import Hero from "../components/hero";
import Layout from "../components/layout";
import Buckets from "../components/buckets";
import Button from "../components/button";
import Footer from '../components/footer'
import { request } from "../lib/datocms";
import { metaTagsFragment, responsiveImageFragment } from "../lib/fragments";
import { motion } from "framer-motion"
import { fade } from "../helpers/transitionHelper"
import Container from "../components/container";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

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
            <div className="overflow-hidden bg-white rounded-xl">

              <Tabs selectedTabClassName="bg-white text-orange-dark">
                <TabList className="flex flex-wrap bg-gray-100">
                  {allCourses.map((course, i) => {
                    return(
                      
                      <Tab className="w-full tracking-widest text-center uppercase md:w-1/4 course-option" key={i}>
                        <button
                          key={i}
                          className="block w-full p-6 uppercase transition duration-200 hover:bg-white"
                        >                        
                          {course.title}  
                        </button>
                      </Tab>
                      
                    )
                  })}
                </TabList>     
                
                {allCourses.map((course, i) => {
                  return(
                    <TabPanel key={`course-${i}`}>
                      <div className="flex flex-wrap tab-content">

                        <div className="flex flex-col w-full p-4 md:items-end md:text-right md:w-1/3 md:p-12 xl:p-16">
                          <div className="flex flex-col md:items-end">
                            <h2 className="mb-4 leading-tight 2xl:text-5xl">{course.title}</h2>
                            <p className="tracking-widest uppercase xl:w-9/12">Group hypnobirthing classes in Nottingham</p>
                            
                            <div className="flex flex-wrap mt-6">
                              <span className="flex items-center px-4 py-2 mr-4 rounded-full md:mr-0 md:w-full md:justify-center md:mb-4 bg-peach xl:w-auto xl:mb-0 xl:mr-4">{course.price}</span>
                              <Button link="/contact" classes="text-center md:w-full justify-center xl:w-auto">Get in touch</Button>
                            </div>

                          </div>
                        </div>

                        <div className="w-full p-4 md:w-2/3 md:p-12 xl:p-16">

                          <div className="opacity-75 xl:w-11/12 content" dangerouslySetInnerHTML={{__html: course.content }} />

                        </div>
                        
                      </div>
                    </TabPanel>
                  )
                })}

              </Tabs>                      
              
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