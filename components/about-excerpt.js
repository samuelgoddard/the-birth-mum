import Container from '../components/container'

export default function AboutExcerpt({ heading, intro }) {
    return(
        <Container>
            <div className="relative z-10 flex flex-wrap items-center my-20">

            <p className="pr-4 mb-4 text-3xl leading-snug md:w-1/2 font-display xs:text-4xl sm:text-5xl xl:text-6xl 2xl:text-7xl 2xl:leading-tight">{heading}</p>

            <div className="md:w-1/2">
                <div className="text-lg leading-relaxed opacity-75 md:w-4/5 2xl:pl-20" dangerouslySetInnerHTML={{ __html:intro }} />
            </div>

            </div>
        </Container>
    )
}