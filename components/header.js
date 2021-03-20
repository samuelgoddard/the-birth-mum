import Container from '../components/container'
import Button from '../components/button'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Header() {

  const router = useRouter();

  let currentPath = router.pathname;
  console.log(currentPath);

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
    <header className="py-6 md:py-10 xl:pb-16">
      <Container>
        <div className="flex flex-wrap items-center justify-between">
          
          <div className="w-24 lg:w-48">
            <Link href="/">
              <a>
                <img src="/logo.svg" alt="The Birth Mum Logo" className="w-full" />
              </a>
            </Link>
          </div>

          <button className="tracking-widest uppercase md:hidden">
            Menu
          </button>

          <div className="hidden w-full text-right md:block md:flex-1">
            
            {Object.values(navItems).map((item, i) => {
              return(
                <Link href={item.href}>
                  <a aria-label={`Go to ${item.label}`} className={`text-xs tracking-widest uppercase lg:text-sm md:mx-3 lg:mx-5 navItem ${currentPath === item.href ? 'text-orange-dark navActive' : ''}`}>
                    {item.label}
                  </a>
                </Link>
              )
            })
            }

            <Button link="/contact" aria-label="Navigate to Contact" classes="md:mx-3 lg:mx-5 lg:mr-5">Get In Touch</Button>
            
          </div>
        </div>
      </Container>
    </header>
  )
}
