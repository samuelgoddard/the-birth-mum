import Container from './container'
import { Image } from 'react-datocms'
import Button from '../components/button'

export default function Hero({ subHeading, heading, text, image}) {
  return (
    <div className="mb-12 md:mb-24">
      <Container thin>
        <div className="flex flex-wrap items-center md:-mx-5">
          <div className="w-full md:w-1/2 mb-6 md:mb-0 md:px-5">
            <div className="w-full">
              { subHeading && (
                <span className="block text-green-light font-display italic text-xl md:text-2xl lg:text-3xl xl:text-4xl leading-none mb-2">{ subHeading }</span>
              )}
              <h1 className="text-5xl md:text-5xl lg:text-6xl xl:text-7xl leading-none">{ heading }</h1>
              { text && (
                <div
                  className="opacity-75 content"
                  dangerouslySetInnerHTML={{ __html: text }}
                />
              )}

              <div className="flex flex-wrap mt-6">
                <Button link="/about">Find out more</Button>
                <Button link="/about" secondary>Get In Touch</Button>
              </div>
            </div>
          </div>
          { image && (
            <div className="w-full md:w-1/2 md:px-5">
              <div className="p-3 bg-white rounded-lg">
                <Image
                  data={{...image.responsiveImage, alt: `${heading}` }}
                  className="w-full rounded-lg"
                />
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  )
}
