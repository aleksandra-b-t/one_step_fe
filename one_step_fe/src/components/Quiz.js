import React from 'react';
import './Quiz.css'
import {Form} from 'react-bootstrap'


class Quiz  extends React.Component {  
     questions = [
        {
            id: 1,
            q: 'Exercising alone - you are self-motivated and you are planning a regular time to be active every day. ',
        },
        {
            id: 2,
            q: 'Team sports and group physical activity programs - you are enjoying social circle.'
        },
        {
            id: 3,
            q: 'Mixing it up – some people like to combine two or three options. For example, you may choose to exercise alone on two or three days of the week, and train with a buddy or participate in a team sport on a couple of the other days.'
        },
        {
            id: 4,
            q: 'Being outside in nature is extremely important to me.'
        },
        {
            id: 5,
            q: 'Making new friends at every stage of life is important.'
        },
        {
            id: 6,
            q: 'Solving complex puzzles and riddles is an enjoyable activity for me'
        },
        {
            id: 7,
            q: 'Life is incomplete if one doesn’t continually take risks'
        },
        {
            id: 8,
            q: 'I like to work with my hands, fix things and tinker'
        },{
            id: 9,
            q: 'I enjoy learning about new subjects just for the pleasure of it'
        },
        {
            id: 10,
            q: 'Keeping my body looking good is important to me'
        },
        {
            id: 11,
            q: 'Mastering a sport is a worthwhile pursuit'
        },
        {
            id: 12,
            q: 'I like to spend time indoor reflecting on my life.'
        },
        {
            id: 13,
            q: 'I tend to be very good at obscure trivia',
          
        },
        {
            id: 14,
            q: 'I take great satisfaction when I do something creative or artistic',
        },
        {
            id: 15,
            q: 'It is worthwhile to devote time to becoming an expert on food, wine and the good things in life',
        }
    ]

    state = {
        answers: [],
        done: false
    }

    togglerClick = () => {
        //this.props.history.push("/users/{");
        this.setState(prevState => ({ done: !prevState.done}))
        // console.log(this.state.answers)
        // console.log(this.props.user)
        this.props.history.push(`users/${this.props.user.id}`)
      }

      selectedEle = (e) => {
        //e.preventDefault()
        // console.log(e.target.value)
        this.setState({answers: [...this.state.answers, e.target.value] })
        // console.log(this.state.answers)
      }
    //   id = this.props.match.params.id

    createNewStep = () => {
     this.state.answers.map(num => {
        fetch("http://localhost:3000/steps",
          {
            method: "POST",
            headers: { 
              "Authorization": localStorage.token,
              "Content-Type": "Application/json",
              "Accept": "Application/json"
            },
            body: JSON.stringify({
              user_id: this.props.user.id,
              activity_id: num,
              check: false
            })
          }
        )
        .then(res => console.log)
        
      })
      this.props.history.push(`users/${this.props.user.id}`)
    }
      
    render(){
        // console.dir(this.props.match)
    return (
        
            <Form className='q-form' onChange={this.selectedEle}> 
            <Form.Group controlId="formBasicCheckbox">
                <div> {this.questions.map(question => (
                    <Form.Check type="checkbox" className='checkbox' label={question.q} value={question.id}/>
                ))} </div><br></br>
                </Form.Group>
                 <button className='sub-in' onClick={this.createNewStep}>DONE</button>
            </Form>
        )
    }
}



export default Quiz