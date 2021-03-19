import Container from '../components/container'

export default function AboutExcerpt({}) {
    return(
        <Container>
            <div className="flex flex-wrap items-center mt-20">

            <p className="pr-4 mb-4 text-3xl leading-snug md:w-1/2 font-display xs:text-4xl sm:text-5xl xl:text-6xl 2xl:text-7xl 2xl:leading-tight">Hypnotherapy classes in Nottingham.</p>

            <div className="md:w-1/2">
                <p className="text-lg leading-relaxed opacity-75 md:w-4/5 2xl:pl-20">The Birth Mum classes are based in Nottingham and the surrounding Nottinghamshire areas. You can choose to attend a group course or a private course, it’s completely up to you and your preferences. Get in touch today to find out more, book a course or have a chat about your options.</p>
            </div>

            </div>
        </Container>
    )
}