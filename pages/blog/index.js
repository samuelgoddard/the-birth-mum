import Head from "next/head";
import { renderMetaTags, useQuerySubscription } from "react-datocms";
import Container from "../../components/container";
import Hero from '../../components/hero';
import Layout from "../../components/layout";
import Footer from '../../components/footer';
import Card from '../../components/card';
import Values from '../../components/values';
import Pagination from '../../components/pagination'
import { request } from "../../lib/datocms";
import { metaTagsFragment, responsiveImageFragment } from "../../lib/fragments";
import { motion } from "framer-motion"
import { fade } from "../../helpers/transitionHelper"

export default function About({ subscription }) {
  const {
    data: { global, blog, site, allBlogs, pagedBlogs },
  } = useQuerySubscription(subscription);

  const metaTags = blog.seo.concat(site.favicon);

  // Set up variables to pass to Pagination
  const currentPage = 1;
  const postsPerPage = 10;

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
              subHeading={blog.heroSubHeading}
              heading={blog.heroHeading}
              text={blog.heroText}
              image={blog.heroImage}
              thin
              wave
            />

            <Container>
              <div className="relative z-10 flex flex-wrap my-32">
                {pagedBlogs.map((blog, i) => {
                  return(
                    <Card
                      key={i}
                      url={`blog/${blog.slug}`}
                      image={blog.heroImage}
                      title={blog.title}
                      date={blog.date}
                    />
                  )
                })}
              </div>
            </Container>
            
            
            <Pagination
              currentPage={currentPage}
              postsPerPage={postsPerPage}
              allPosts={allBlogs}
              archive
              pagedUrlBase="blog"
            />

            <Values values={global.values} blob />

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
        blog: blogIndex {
          heroHeading
          heroSubHeading
          heroText
          heroImage {
            responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 1200, h: 850 }) {
              ...responsiveImageFragment
            }
          } 
          seo: _seoMetaTags {
            ...metaTagsFragment
          }
        }
        allBlogs {
          slug
          title
        }
        pagedBlogs: allBlogs(first: "10", orderBy: _firstPublishedAt_DESC) {
          slug 
          title
          heroImage {
            responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 600, h: 425 }) {
              ...responsiveImageFragment
            }
          }
          date: _firstPublishedAt        
        }
        global {
          values {
            heading
            text
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