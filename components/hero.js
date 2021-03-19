import Container from './container'
import { Image } from 'react-datocms'
import Button from '../components/button'

export default function Hero({ subHeading, heading, text, image}) {
  return (
    <div className="mb-12 md:mb-24">
      <Container>
        <div className="flex flex-wrap items-center justify-end lg:pl-32">
          <div className="w-full mb-6 md:w-1/2 md:mb-0 md:px-5">
            <div className="w-full">
              { subHeading && (
                <span className="block mb-2 text-xl italic leading-none text-green-light font-display md:text-2xl lg:text-3xl xl:text-4xl">{ subHeading }</span>
              )}
              <h1 className="text-4xl leading-none md:text-5xl lg:text-6xl xl:text-7xl">{ heading }</h1>
              { text && (
                <div
                  className="opacity-75 content lg:text-lg lg:leading-relaxed lg:my-8 lg:w-4/5"
                  dangerouslySetInnerHTML={{ __html: text }}
                />
              )}

              <div className="flex flex-wrap justify-between mt-6 xs:justify-start">
                <Button link="/about">Find out more</Button>
                <Button link="/about" secondary classes="xs:ml-4">Get In Touch</Button>
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
