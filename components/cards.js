
import Container from './container'
import Card from './card'
import { compareDesc } from 'date-fns'

export default function Cards({ cards }) {
    return(
        <Container>
            <div className="flex flex-wrap my-32">
                
                {cards.map((card, i) => {
                    return(
                        <Card card={card}/>
                    )
                })}
                
            </div>
        </Container>
    )
}