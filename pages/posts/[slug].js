import Head from "next/head";
import { renderMetaTags, useQuerySubscription } from "react-datocms";
import Container from "../../components/container";
import Layout from "../../components/layout";
import MoreStories from "../../components/more-stories";
import PostBody from "../../components/post-body";
import PostHeader from "../../components/post-header";
import { request } from "../../lib/datocms";
import { metaTagsFragment, responsiveImageFragment } from "../../lib/fragments";

export async function getStaticPaths() {
  const data = await request({ query: `{ allPosts { slug } }` });

  return {
    paths: data.allPosts.map((post) => `/posts/${post.slug}`),
    fallback: false,
  };
}

export async function getStaticProps({ params, preview = false }) {
  const graphqlRequest = {
    query: `
      query PostBySlug($slug: String) {
        site: _site {
          favicon: faviconMetaTags {
            ...metaTagsFragment
          }
        }
        post(filter: {slug: {eq: $slug}}) {
          seo: _seoMetaTags {
            ...metaTagsFragment
          }
          title
          slug
          content(markdown: true)
          date
          ogImage: coverImage{
            url(imgixParams: {fm: jpg, fit: crop, w: 2000, h: 1000 })
          }
          coverImage {
            responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 2000, h: 1000 }) {
              ...responsiveImageFragment
            }
          }
        }

        morePosts: allPosts(orderBy: date_DESC, first: 2, filter: {slug: {neq: $slug}}) {
          title
          slug
          excerpt
          date
          coverImage {
            responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 2000, h: 1000 }) {
              ...responsiveImageFragment
            }
          }
        }
      }

      ${responsiveImageFragment}
      ${metaTagsFragment}
    `,
    preview,
    variables: {
      slug: params.slug,
    },
  };

  return {
    props: {
      subscription: preview
        ? {
            ...graphqlRequest,
            initialData: await request(graphqlRequest),
            token: process.env.NEXT_EXAMPLE_CMS_DATOCMS_API_TOKEN,
          }
        : {
            enabled: false,
            initialData: await request(graphqlRequest),
          },
    },
  };
}

export default function Post({ subscription, preview }) {
  const {
    data: { site, post, morePosts },
  } = useQuerySubscription(subscription);

  const metaTags = post.seo.concat(site.favicon);

  return (
    <Layout preview={preview}>
      <Head>{renderMetaTags(metaTags)}</Head>

      <Container>
        <div className="content mb-12 md:mb-24">
          <article className="mb-12 md:mb-24">
            <PostHeader
              title={post.title}
              coverImage={post.coverImage}
              date={post.date}
            />
            <PostBody content={post.content} />
          </article>

          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </div>
      </Container>
    </Layout>
  );
}

export const config = {
  unstable_runtimeJS: false
};