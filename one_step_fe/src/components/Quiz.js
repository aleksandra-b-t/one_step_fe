import React from 'react';
import './Quiz.css'
import {Form} from 'react-bootstrap'


const questions = [
    {
        id: 0,
        q: 'Which best match you?',
        a1: 'Exercising alone - you are self-motivated and you are planning a regular time to be active every day. ',
        a2: 'Team sports and group physical activity programs - you are enjoying social circle',
        a3: 'Mixing it up – some people like to combine two or three options. For example, you may choose to exercise alone on two or three days of the week, and train with a buddy or participate in a team sport on a couple of the other days.'
    },
    {
        id: 1,
        q: 'Which best match you?',
        a1: 'I like to spend time indoor reflecting on my life',
        a2: 'Being outside in nature is extremely important to me',
        a3: 'Making new friends at every stage of life is important'
    },
    {
        id: 2,
        q: 'Are you:',
        a1: 'I tend to be very good at obscure trivia',
        a2: 'Solving complex puzzles and riddles is an enjoyable activity for me',
        a3: 'Life is incomplete if one doesn’t continually take risks'
    },
    {
        id: 3,
        q: 'What is your mobility like?',
        a1: 'All good, 100% active',
        a2: 'So-So, I have some physical limitations',
        a3: 'Poor, I am mobility challenged'
    },
    {
        id: 4,
        q: 'Now, tell us a little about your living situation:',
        a1: 'I live in a house with a yard',
        a2: 'I live in an apartment with access to a yard',
        a3: 'I live in an apartment with no yard'
    },
    {
        id: 5,
        q: 'Which statement describe you the most:',
        a1: 'I take great satisfaction when I do something creative or artistic',
        a2: 'I like to work with my hands, fix things and tinker',
        a3: 'I enjoy learning about new subjects just for the pleasure of it'
    },
    {
        id: 6,
        q: 'Which statement describe you the most:',
        a1: 'Keeping my body looking good is important to me',
        a2: 'It is worthwhile to devote time to becoming an expert on food, wine and the good things in life',
        a3: 'Mastering a sport is a worthwhile pursuit'
    }
]
let currentQ = 0
const togglerClick = () => currentQ += 1


const Quiz = props => {  
    return (
            <Form className='q-form'> 
                <div> {questions[currentQ].q} </div><br></br>
                <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label={questions[currentQ].a1} />
                <Form.Check type="checkbox" label={questions[currentQ].a2} />
                <Form.Check type="checkbox" label={questions[currentQ].a3} />
                </Form.Group>
                <a href="#" onClick={togglerClick}>
                <span></span>
                 <span></span>
        
                    NEXT
                 </a>
            </Form>
        
        )
}



export default Quiz