import Container from './container'
import Value from './value'
import Button from './button'

export default function Values({ values }) {
    console.log(values);
    return (
        <Container>
            <div className="mb-8 2xl:mb-32">

                <div className="flex flex-wrap items-center p-4 bg-white shadow-lg rounded-2xl 2xl:p-8">
                    
                    <p className="w-full p-4 text-4xl leading-tight md:text-5xl xl:text-right font-display xl:w-1/4 2xl:text-6xl 2xl:leading-tight">The birth Mum values.</p>

                    <div class="flex flex-wrap items-start w-full xl:w-3/4">
                    {values.map((value, i) => {
                        return(
                            <Value
                                key={i}
                                title={value.heading}
                                text={value.text}
                            />
                        )
                    })}
                    </div>
                    
                </div>

                <p class="mt-8 flex flex-wrap items-center justify-center text-center text-xl tracking-widest uppercase">
                    <span className="w-full mb-4 sm:w-auto sm:mb-0">For help and advice</span> 
                    <Button link="/contact" classes="sm:ml-4 mb-0">get in touch</Button>
                </p>

            </div>
        </Container>
    )
}