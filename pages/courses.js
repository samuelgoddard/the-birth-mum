import Head from "next/head";
import { renderMetaTags, useQuerySubscription } from "react-datocms";
import Hero from "../components/hero";
import Layout from "../components/layout";
import Buckets from "../components/buckets";
import Button from "../components/button";
import Footer from '../components/footer'
import Blob from '../components/blob'
import { request } from "../lib/datocms";
import { metaTagsFragment, responsiveImageFragment } from "../lib/fragments";
import { motion } from "framer-motion"
import { fade } from "../helpers/transitionHelper"
import Container from "../components/container";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Date from "../components/date";
import { parseISO, format } from 'date-fns'

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
          className="overflow-x-hidden"
        >  
          <motion.div variants={fade}>

            <Hero
              subHeading={coursesBooking.heroSubHeading}
              heading={coursesBooking.heroHeading}
              text={coursesBooking.heroText}
              image={coursesBooking.heroImage}
              wave
            />

            <div className="relative">
              
              <Container>
                  <div className="relative z-10 mb-8 2xl:mb-32">

                      <div className="flex flex-wrap items-center p-4 bg-white shadow-lg rounded-2xl 2xl:p-8">
                          
                          <p className="w-full p-4 text-4xl leading-tight md:text-5xl xl:text-right font-display xl:w-1/4 2xl:text-6xl 2xl:leading-tight">{coursesBooking.tasterHeading}</p>

                          <div className="flex flex-wrap items-start justify-center w-full p-4 xl:w-2/4 xl:px-16">
                            <div className="opacity-75 xl:w-11/12 content" dangerouslySetInnerHTML={{__html: coursesBooking.tasterIntro }} />
                          </div>

                          <div className="flex justify-center p-4 xl:w-1/4">
                            <Button external link={coursesBooking.tasterBookingUrl} classes="sm:ml-4 mb-0">Book your spot today!</Button>
                          </div>
                          
                      </div>

                  </div>              

              </Container>
              
            </div>



            <div className="relative">
              
              <Container>

                <div className="relative z-10 bg-white rounded-xl">

                  <Tabs selectedTabClassName="rounded-t bg-white text-orange-dark">
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
                        <TabPanel key={i}>
                          <div className="flex flex-wrap tab-content">

                            <div className="flex flex-col w-full p-4 md:items-end md:text-right md:w-1/3 md:p-12 xl:p-16">
                              <div className="flex flex-col md:items-end">
                                <h2 className="mb-4 leading-tight 2xl:text-5xl">{course.title}</h2>
                                <p className="tracking-widest uppercase xl:w-9/12">Group hypnobirthing classes in Nottingham</p>
                                
                                <div className="flex flex-wrap mt-6">
                                  <span className="flex items-center px-4 py-2 mr-4 rounded-full md:mr-0 md:w-full md:justify-center md:mb-4 bg-peach xl:w-auto xl:mb-0 xl:mr-4">{course.price}</span>
                                  
                                  {course.ticketsAvailable &&
                                    <Button external link="https://buytickets.at/thebirthmum" classes="text-center md:w-full justify-center xl:w-auto">Book now</Button>
                                  }

                                  {!course.ticketsAvailable &&
                                    <Button link="/contact" classes="text-center md:w-full justify-center xl:w-auto">Get in touch</Button>
                                  }                                  
                                </div>

                                {Object.entries(course.availableDates).length > 0 &&
                                  <ul className="mt-6">
                                      <li className="font-display">Available dates:</li>
                                      {course.availableDates.map((date, i) => {
                                        return( 
                                          <li key={i} className="flex items-center justify-end py-4 text-right border-b border-gray-100">
                                            <img className="relative inline-block h-4 mr-2" src="icons/icon-calendar.svg" alt="" />
                                            {/* <Date dateString={date.dateTime} /> */}
                                            <time className="text-sm" dateTime={date.dateTime}>
                                              <span>{format(parseISO(date.dateTime), 'LLLL	d, yyyy')}</span>
                                              <span className="text-orange"> &bull; {format(parseISO(date.dateTime), 'K:mm bbb')}</span>
                                            </time>    
                                          </li>
                                        )
                                      })
                                      }
                                  </ul>
                                }

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

              
              <Blob color="pink" />

            </div>

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
          tasterHeading
          tasterIntro
          tasterBookingUrl
        }
        allCourses: allCourses {
          title
          price
          content
          ticketsAvailable
          ticketBookingLinkUrl
          availableDates {
            dateTime
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