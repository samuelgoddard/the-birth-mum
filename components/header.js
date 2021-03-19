import Container from '../components/container'
import Button from '../components/button'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="py-6 md:py-10 xl:pb-16">
      <Container>
        <div className="flex flex-wrap items-center justify-between">
          
          <div className="w-24 lg:w-48">
            <Link href="/">
              <a>
                <img src="logo.svg" alt="The Birth Mum Logo" className="w-full" />
              </a>
            </Link>
          </div>

          <button className="tracking-widest uppercase md:hidden">
            Menu
          </button>

          <div className="hidden w-full text-right md:block md:flex-1">
            <Link href="/"><a aria-label="Navigate to Home" className="text-xs tracking-widest uppercase lg:text-sm hover:underline focus:underline md:mx-3 lg:mx-5 lg:ml-5">Home</a></Link>
            
            <Link href="/about"><a aria-label="Navigate to About" className="text-xs tracking-widest uppercase lg:text-sm hover:underline focus:underline md:mx-3 lg:mx-5">About</a></Link>
            
            <Link href="/hypnobirthing"><a aria-label="Navigate to Hypnobirthing" className="text-xs tracking-widest uppercase lg:text-sm hover:underline focus:underline md:mx-3 lg:mx-5">Hypnobirthing</a></Link>
            
            <Link href="/courses"><a aria-label="Navigate to Courses &amp; Booking" className="text-xs tracking-widest uppercase lg:text-sm hover:underline focus:underline md:mx-3 lg:mx-5">Courses &amp; Booking</a></Link>
            
            <Link href="/blog"><a aria-label="Navigate to The Blog" className="text-xs tracking-widest uppercase lg:text-sm hover:underline focus:underline md:mx-3 lg:mx-5">The Blog</a></Link>

            
              <Button link="/contact" aria-label="Navigate to Contact" classes="md:mx-3 lg:mx-5 lg:mr-5">Get In Touch</Button>
            
          </div>
        </div>
      </Container>
    </header>
  )
}
