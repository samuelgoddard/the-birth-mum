import Bucket from "../components/bucket";

export default function Buckets({}) {
    return (
        
        <div className="relative z-10 flex flex-wrap justify-center mt-24 lg:mt-56">
              
            <Bucket
            id="calendar"
            icon="calendar"
            title="Interested?"
            text="Check out our course options and upcoming dates!"
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
            linkTarget="courses"
            linkLabel="View courses"
            />
              
        </div>
    )
}