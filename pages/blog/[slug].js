import Head from "next/head";
import { renderMetaTags, useQuerySubscription } from "react-datocms";
import Container from "../../components/container";
import Layout from "../../components/layout";
import Footer from '../../components/footer';
import Values from '../../components/values';
import { request } from "../../lib/datocms";
import { metaTagsFragment, responsiveImageFragment } from "../../lib/fragments";
import { motion } from "framer-motion"
import { fade } from "../../helpers/transitionHelper"
import { format, parseISO } from 'date-fns'

export default function About({ subscription }) {
  const {
    data: { global, blog, site },
  } = useQuerySubscription(subscription);

  const metaTags = blog.seo.concat(site.favicon);

  const newDate = parseISO(blog.date);    

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


            <div className="mb-12 md:mb-24">
              <Container>
                <div className="flex flex-wrap items-center justify-center">
                  <div className="w-full mb-6 md:w-3/5 md:mb-0 md:px-5">
                    <div className="w-full">
                      { blog.heroSubHeading && (
                        <span className="block mb-2 text-xl italic leading-none text-green-light font-display md:text-2xl lg:text-3xl xl:text-4xl">{ blog.heroSubHeading }</span>
                      )}
                      <h1 className="text-4xl leading-none md:text-5xl lg:text-6xl xl:text-7xl">{ blog.title }</h1>
                      <small>
                        <span className="text-orange">{format(newDate, 'MMMM Do, yyyy')}</span>
                      </small>
                      { blog.content && (
                        <div
                          className="content lg:text-lg lg:leading-relaxed lg:my-8"
                          dangerouslySetInnerHTML={{ __html: blog.content }}
                        />
                      )}                      
                    </div>
                  </div>
                </div>
              </Container>
            </div>


            <Values values={global.values} />

            <Footer />
            
          </motion.div>
        </motion.div>
      </Layout>
    </>
  );
}

export async function getStaticProps({ params }) {
  const graphqlRequest = {
    query: `
      query Post($slug: String) {
        site: _site {
          favicon: faviconMetaTags {
            ...metaTagsFragment
          }
        }
        blog(filter: {slug: {eq: $slug}}) {
            slug
            title
            content
            heroHeading
            heroSubHeading
            heroImage {
                responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 900, h: 900 }) {
                    ...responsiveImageFragment
                }
            }
            seo: _seoMetaTags {
                ...metaTagsFragment
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

export async function getStaticPaths() {
  const data = await request({ 
      query: `{ allBlogs { slug } }` 
  });

  return {
    paths: data.allBlogs.map((blog) => `/blog/${blog.slug}`),
    fallback: false,
  };
}