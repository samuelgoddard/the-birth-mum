import Container from './container'
import Value from './value'
import Button from './button'

export default function Values({ }) {
    return (
        <Container>
            <div className="flex flex-wrap items-center p-4 mb-8 bg-white shadow-lg rounded-2xl 2xl:p-8">
                
                <p className="w-full p-4 text-4xl leading-tight 2xl:text-right font-display xl:w-1/4 2xl:text-6xl 2xl:leading-tight">The birth Mum values.</p>

                <Value
                    title="Every choice is yours"
                    text="Hypnobirthing will empower you to make informed decisions confidently. Remember - your baby, your birth, your choices."
                />

                <Value
                    title="Every body is unique"
                    text="There is no 'one size fits all' approach to hypnobirthing. Instead, you use the tools in a way which works for you."
                />

                <Value
                    title="Every birth is valid"
                    text="Standing up, lying down, no drugs, all the drugs, vaginally or abdominally, hypnobirthing is for all births and all people."
                />                
                
            </div>

            <p class="mb-20 flex flex-wrap items-center justify-center text-center text-xl tracking-widest uppercase">
              <span className="w-full mb-4 sm:w-auto sm:mb-0">For help and advice</span> 
              <Button link="/contact" classes="sm:ml-4 mb-0">get in touch</Button>
            </p>
        </Container>
    )
}