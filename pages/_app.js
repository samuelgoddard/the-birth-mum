import { useEffect, React } from 'react';
import '../styles/main.css'
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router'
import * as gtag from '../lib/gtag'

function MyApp({ Component, pageProps }) {
  const router = useRouter();  

  useEffect(() => {
    const handleRouteChange = (url) => { 
      window.setTimeout(() => window.scrollTo(0, 0), 1000)
      gtag.pageview(url)
    }
    router.events.on('routeChangeStart', handleRouteChange)
  }, [router.events])

  return (
    <div data-scroll-container id="scroll-container">
      <AnimatePresence exitBeforeEnter>
        <Component {...pageProps} key={router.asPath} />
      </AnimatePresence>
    </div>
  );
}

export default MyApp
