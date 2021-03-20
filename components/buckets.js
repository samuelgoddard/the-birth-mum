import Bucket from "../components/bucket";

export default function Buckets({}) {
    return (
        
        <div className="flex flex-wrap justify-center my-24 lg:mt-56">
              
            <Bucket
            icon="calendar"
            title="Interested?"
            text="Check out our course options and upcoming dates!"
            linkTarget="courses"
            linkLabel="View Dates"
            />

            <Bucket
            icon="contact"
            title="Get in touch!"
            text="We can have a chat and discuss the perfect course for you."
            linkTarget="contact"
            linkLabel="Contact me"
            />

            <Bucket
            icon="book"
            title="Book!"
            text="Book a TBM course and prepare for a positive birth."
            linkTarget="courses"
            linkLabel="View courses"
            />
              
        </div>
    )
}