import Container from '../components/container'

export default function testimonials ({ reviews }) {
    return(
        <Container>
            <div className="relative z-10 flex flex-wrap items-center my-20">

                <div className="flex flex-wrap p-4 md:p-8">

                {reviews.map((review, i) => {
                    return(
                    <div className="w-full p-4 mt-12 md:w-1/3 md:p-6 lg:px-12 md:mt-0">

                        <div className="relative flex items-center justify-center">
                            <img className="absolute z-0" src="bucket-icon-bg.svg" alt="" />
                            <img className="relative h-16" src={`icons/icon-star.svg`} alt="Star" />
                        </div>
                        
                        <div className="relative z-10 mt-20 text-center">
                        <p className="text-xl font-display">{review.name}</p>

                        <div className="opacity-75" dangerouslySetInnerHTML={{ __html: review.testimonial }} />
                        </div>

                    </div>
                    )
                })}

                </div>

            </div>
        </Container>
    )
}