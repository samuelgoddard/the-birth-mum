import Link from 'next/link'
import { Image } from 'react-datocms'

export default function Card({ url, image, title }) {
    return(
        <div className="w-full md:w-1/2 lg:w-1/4 md:px-4">

            <Link href={`/${url}`}>

                <a className="block p-6 transition-all duration-200 bg-white shadow-lg rounded-2xl md:p-8 hover:shadow-xl">
                    <div className="bg-green rounded-t-2xl">

                    { image && 
                        <Image
                            data={{...image.responsiveImage, alt: `${title}` }}
                            className="w-full rounded-lg"
                        />
                    }
                    </div>
                    
                    <span className="block mt-4 mb-2 text-lg tracking-widest text-center uppercase md:mt-8">{title}</span>
                    
                </a>
                
            </Link>
            
        </div>
    )
}