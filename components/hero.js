import Container from './container'
import { Image } from 'react-datocms'
import Button from '../components/button'

export default function Hero({ subHeading, heading, text, image, buttons, thin, form, wave, blob}) {
  return (
    <div className="relative mb-12 md:mb-24">
      <Container>
        <div className={`relative z-10 flex flex-wrap items-center ${thin ? 'justify-end lg:pl-32' : ''}`}>
          <div className="w-full mb-6 md:w-1/2 md:mb-0 md:px-5">
            <div className="w-full">
              
              { subHeading && (
                <span className="block mb-2 text-xl italic leading-none text-green-light font-display md:text-2xl lg:text-3xl xl:text-4xl">{ subHeading }</span>
              )}
              
              <h1 className="text-4xl leading-tight md:text-5xl lg:text-6xl xl:text-7xl">{ heading }</h1>
              
              { text && (
                <div
                  className="opacity-75 content lg:text-lg lg:leading-relaxed lg:my-8 lg:w-4/5"
                  dangerouslySetInnerHTML={{ __html: text }}
                />
              )}

              { buttons &&
                <div className="flex flex-wrap mt-6 xs:justify-start">
                  <Button link="/about" classes="mr-1 xs:mr-2">Find out more</Button>
                  <Button link="/about" secondary classes="xs:ml-4">Get In Touch</Button>
                </div>
              }

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

          { form && 
            <div className="w-full md:w-1/2 md:px-5">

              <p className="px-3 text-xs opacity-75 text-green-light">Fields marked with a * are required.</p>
              
              <form id="form" action="https://formspree.io/f/mbjqrjwk" method="POST" className="flex flex-wrap -m-1 overflow-x-hidden">

                <label className="w-full py-3 md:p-3 md:w-1/2">
                  <input required type="text" className="w-full" name="name" placeholder="Name *" />
                </label>

                <label className="w-full py-3 md:p-3 md:w-1/2">
                  <input required type="text" name="postcode" placeholder="Postcode *" />
                </label>

                <label className="w-full py-3 md:p-3 md:w-1/2">
                  <input required type="email" name="email" placeholder="Email *" />
                </label>

                <label className="w-full py-3 md:p-3 md:w-1/2">
                  <input required type="tel" name="telephone" placeholder="Telephone *" />
                </label>
                
                <label className="w-full py-3 md:p-3">
                  <textarea required placeholder="Your message *" name="message" className="w-full"></textarea>
                </label>

                <input type="text" name="_gotcha" className="hidden" />
                
                <div className="w-full p-3">
                  <input type="submit" className="px-4 py-2 tracking-widest text-white uppercase transition duration-200 rounded-full cursor-pointer bg-orange hover:bg-orange-dark border-orange-dark" value="Send Enquiry" />
                </div>

              </form>
              

            </div>
          }
        </div>

        {wave &&
          <img className="absolute bottom-0 left-0 z-0 -mb-144" src="/wave.svg" alt="The Birth Mum" />
        }
        
      </Container>

        { blob && 
          <img className="-mb-96 blob-pink" src="/blob-pink.svg" alt="The Birth Mum" />
        }
    </div>
  )
}
