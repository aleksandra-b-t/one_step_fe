import React from 'react';
import './UserPage.css'
import ActivityPage from './ActivityPage'
import Quiz from './Quiz';

const renderQ = () => <Quiz/>



const UserPage = props => {
    
    console.log(props.user)
    console.log(props.user.activities)
    return(
        <div className= 'user-info'>
       {props.user.name}
       {props.user.activities}<br></br>
       Are you new here? take a quiz -> 
       <a href="#" onClick={renderQ}> 
                <span></span>
                 <span></span>
                    QUIZ
                 </a>
       </div>
    )
}

export default UserPage