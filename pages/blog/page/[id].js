import Head from "next/head";
import { renderMetaTags, useQuerySubscription } from "react-datocms";
import Container from "../../components/container";
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
    data: { global, home, site, allBlogs, pagedBlogs, currentPage, postsPerPage },
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

            <Container>
              <div className="flex flex-wrap my-32">
                {pagedBlogs.map((blog, i) => {
                  return(
                    <Card
                      url={`blog/${blog.slug}`}
                      image={blog.heroImage}
                      title={blog.title}
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

            <Values values={global.values} />

            <Footer />
            
          </motion.div>
        </motion.div>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const pageId = parseInt(params.id);
  const postsPerPage = 10;
  const skip = pageId*postsPerPage-postsPerPage;  

  const graphqlRequest = {
    query: `
      query Blog($first: IntType, $skip: IntType) {
        site: _site {
          favicon: faviconMetaTags {
            ...metaTagsFragment
          }
        }
        home {
          seo: _seoMetaTags {
            ...metaTagsFragment
          }
        }
        allBlogs {
          slug
          title
        }
        pagedBlogs: allBlogs(first: $first, skip: $skip orderBy: _firstPublishedAt_DESC) {
          slug 
          title
          heroImage {
            responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 600, h: 425 }) {
              ...responsiveImageFragment
            }
          }          
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
      },
      currentPage: pageId,
      postsPerPage: postsPerPage,
    },
  };
}

export async function getStaticPaths() {
  const data = await request({ 
      query: `{ queryPosts: allBlogs { slug id } }` 
  });
  const postsPerPage = 10;
  const totalPosts = data.queryPosts.length;
  const totalPages = Math.ceil(totalPosts/postsPerPage);

  return {
      paths: Array.from({ length: totalPages }).map((_, i) => {
      return {
        params: {
          id: (i + 1).toString(),
        },
      };
    }),
    fallback: false,
  };
}