import Bucket from "../components/bucket";
import Container from "../components/container";

export default function Buckets({}) {
    return (

        <Container>
        
            <div className="relative z-10 flex flex-wrap justify-around mt-24 lg:mt-56">
                
                <Bucket
                id="calendar"
                icon="calendar"
                title="Interested?"
                text="With an option for everyone, check out our different courses."
                linkTarget="courses"
                linkLabel="View Dates"
                />

                <Bucket
                id="contact"
                icon="contact"
                title="Get in touch!"
                text="We can have a chat and discuss the perfect course for you."
                linkTarget="contact"
                linkLabel="Contact me"
                />

                <Bucket
                id="book"
                icon="book"
                title="Book!"
                text="Book a TBM course and prepare for a positive birth."
                linkTarget="https://www.tickettailor.com/events/thebirthmum"
                linkLabel="Book Now"
                external
                />
                
            </div>

        </Container>
    )
}