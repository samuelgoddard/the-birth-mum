import Container from '../components/container'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="py-6 md:py-10 xl:pb-16">
      <Container>
        <div className="flex flex-wrap items-center">
          
          <div className="w-24 lg:w-32">
            <Link href="/">
              <a>
                <img src="logo.svg" alt="The Birth Mum Logo" className="w-full" />
              </a>
            </Link>
          </div>

          <button className="tracking-wider uppercase">
            Menu
          </button>

          <div className="hidden w-full text-right md:block md:flex-1">
            <Link href="/"><a aria-label="Navigate to Home" className="text-xs tracking-wider uppercase lg:text-sm hover:underline focus:underline md:mx-3 lg:mx-5 lg:ml-5">Home</a></Link>
            
            <Link href="/about"><a aria-label="Navigate to About" className="text-xs tracking-wider uppercase lg:text-sm hover:underline focus:underline md:mx-3 lg:mx-5">About</a></Link>
            
            <Link href="/hypnobirthing"><a aria-label="Navigate to Hypnobirthing" className="text-xs tracking-wider uppercase lg:text-sm hover:underline focus:underline md:mx-3 lg:mx-5">Hypnobirthing</a></Link>
            
            <Link href="/courses"><a aria-label="Navigate to Courses &amp; Booking" className="text-xs tracking-wider uppercase lg:text-sm hover:underline focus:underline md:mx-3 lg:mx-5">Courses &amp; Booking</a></Link>
            
            <Link href="#"><a aria-label="Navigate to The Blog" className="text-xs tracking-wider uppercase lg:text-sm hover:underline focus:underline md:mx-3 lg:mx-5">The Blog</a></Link>

            <Link href="#"><a aria-label="Navigate to Contact" className="text-xs tracking-wider uppercase lg:text-sm hover:underline focus:underline md:mx-3 lg:mx-5 lg:mr-5">Get In Touch</a></Link>
          </div>
        </div>
      </Container>
    </header>
  )
}
