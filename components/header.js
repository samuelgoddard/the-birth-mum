import Container from '../components/container'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="py-6 md:py-10">
      <Container>
        <div className="flex flex-wrap items-center">
          <div className="w-24 lg:w-32">
            <Link href="/">
              <a>
                <img src="logo.png" alt="The Birth Mum Logo" className="w-full" />
              </a>
            </Link>
          </div>

          <div className="w-full hidden md:block md:flex-1 text-right">
            <Link href="/"><a aria-label="Navigate to Home" className="uppercase leading-wide text-xs lg:text-sm hover:underline focus:underline md:mx-3 lg:mx-5 lg:ml-5">Home</a></Link>
            
            <Link href="/about"><a aria-label="Navigate to About" className="uppercase leading-wide text-xs lg:text-sm hover:underline focus:underline md:mx-3 lg:mx-5">About</a></Link>
            
            <Link href="/hypnobirthing"><a aria-label="Navigate to Hypnobirthing" className="uppercase leading-wide text-xs lg:text-sm hover:underline focus:underline md:mx-3 lg:mx-5">Hypnobirthing</a></Link>
            
            <Link href="/courses"><a aria-label="Navigate to Courses &amp; Booking" className="uppercase leading-wide text-xs lg:text-sm hover:underline focus:underline md:mx-3 lg:mx-5">Courses &amp; Booking</a></Link>
            
            <Link href="#"><a aria-label="Navigate to The Blog" className="uppercase leading-wide text-xs lg:text-sm hover:underline focus:underline md:mx-3 lg:mx-5">The Blog</a></Link>

            <Link href="#"><a aria-label="Navigate to Contact" className="uppercase leading-wide text-xs lg:text-sm hover:underline focus:underline md:mx-3 lg:mx-5 lg:mr-5">Get In Touch</a></Link>
          </div>
        </div>
      </Container>
    </header>
  )
}
