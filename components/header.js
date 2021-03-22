import Container from '../components/container'
import MobileMenu from '../components/mobile-menu'
import Button from '../components/button'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Header() {

  //Used for active nav states
  const router = useRouter();
  let currentPath = router.pathname;


  const navItems = {
    Home: {
      href: '/',
      label: 'Home'
    },
    About: {
      href: '/about',
      label: 'About'
    },
    Hypnobirthing: {
      href: '/hypnobirthing',
      label: 'Hynobirthing'
    },
    Courses: {
      href: '/courses',
      label: 'Courses & Booking'
    },
    Blog: {
      href: '/blog',
      label: 'The Blog'
    }
  };

  return (
    <header className="relative py-6 md:py-10 xl:pb-16">

      <MobileMenu navItems={navItems} />

      <Container>

        <img className="absolute top-0 right-0 z-0 -mt-32" src="/blob-peach-small.svg" alt="The Birth Mum" />

        <div className="relative z-10 flex flex-wrap items-center justify-between">
          
          <div className="w-24 lg:w-48">
            <Link href="/" scroll={false}>
              <a>
                <img src="/logo.svg" alt="The Birth Mum Logo" className="w-full" />
              </a>
            </Link>
          </div>

          <div className="hidden w-full text-right md:flex md:flex-1 md:justify-end md:items-center">
            
            {
              Object.values(navItems).map((item, i) => {
                return(
                  <Link key={i} href={item.href} scroll={false}>
                    <a aria-label={`Go to ${item.label}`} className={`text-xs tracking-widest uppercase lg:text-sm md:mx-1 lg:mx-3 xl:mx-5 navItem ${currentPath === item.href ? 'text-orange-dark navActive' : ''}`}>
                      {item.label}
                    </a>
                  </Link>
                )
              })
            }

            <Button link="/contact" aria-label="Navigate to Contact" classes="relative text-xs lg:text-sm z-10 md:mx-3 lg:mx-5 lg:mr-5">Get In Touch</Button>
            
          </div>
        </div>
      </Container>
    </header>
  )
}
