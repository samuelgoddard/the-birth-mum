import Container from './container'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-peach border-opacity-75 py-8 md:py-12 lg:py-16">
      <Container>
        <div className="flex flex-wrap mb-6 md:mb-8">
          <div className="w-1/2 md:w-1/4 mb-4 md:mb-0">
            <Link href="/">
              <a>
                <img src="logo.png" alt="The Birth Mum Logo" className="w-20 md:w-24" />
              </a>
            </Link>
          </div>

          <div className="w-1/2 md:w-1/4 mb-4 md:mb-0">
            <a href="tel:08000000000" className="block text-xs lg:text-sm hover:underline focus:underline mb-1 text-green-light">0800 000 000</a>
            <a href="mailto:info@gmail.com" className="block text-xs lg:text-sm hover:underline focus:underline mb-1 text-green-light">info@gmail.com</a>
          </div>

          <div className="w-1/2 md:w-1/4 mb-4 md:mb-0">
            <Link href="/"><a aria-label="Navigate to Home" className="block text-xs lg:text-sm hover:underline focus:underline mb-1">Home</a></Link>
            
            <Link href="/about"><a aria-label="Navigate to About" className="block text-xs lg:text-sm hover:underline focus:underline mb-1">About</a></Link>
            
            <Link href="/about"><a aria-label="Navigate to Hypnobirthing" className="block text-xs lg:text-sm hover:underline focus:underline mb-1">Hypnobirthing</a></Link>
          </div>

          <div className="w-1/2 md:w-1/4 mb-4 md:mb-0">
            <Link href="/about"><a aria-label="Navigate to Courses &amp; Booking" className="block text-xs lg:text-sm hover:underline focus:underline mb-1">Courses &amp; Booking</a></Link>
            
            <Link href="/about"><a aria-label="Navigate to The Blog" className="block text-xs lg:text-sm hover:underline focus:underline mb-1">The Blog</a></Link>

            <Link href="/about"><a aria-label="Navigate to Contact" className="block text-xs lg:text-sm hover:underline focus:underline mb-1">Get In Touch</a></Link>
          </div>
        </div>

        <small className="text-xs lg:text-sm">&copy; Copyright The Birth Mum 2020. All Rights Reserved.</small>
      </Container>
    </footer>
  )
}
