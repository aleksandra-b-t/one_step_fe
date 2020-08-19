import React from "react";
import "./UserPage.css";
import ActivityPage from "./ActivityPage";
import Quiz from "./Quiz";
import ReactPlayer from "react-player";
import {
  Form,
  Card,
  Button,
  Row,
  Col,
  Image,
  Container,
} from "react-bootstrap";

class UserPage extends React.Component {
  state = {
    activities: [],
    activeId: null,
    deleteMe: false,
    startIndex: 0,
    // isNew : false,
  };

  renderQ = () => this.props.history.push("/quiz");

  updateIndex = () => {
    let newIndex = this.state.startIndex + 3;
    this.setState({
      startIndex: newIndex >= this.state.activities.length ? 0 : newIndex,
    });
  };

  componentDidMount() {
    const id= JSON.parse(localStorage.currentUser).id
    console.log(id)
    fetch(`http://localhost:3000/users/${id}`, {
      headers: {
        Authorization: localStorage.token,
      },
    })
      .then((res) => res.json())
      .then((res) => this.setState({ activities: res.activities }));
      console.log(this.state.activities)
  }
  toggleActive = (n) => {
    let copy = [...this.state.activities];
    let activ = copy.find((act) => act.id === n);
    console.log(activ);
    if (this.state.activeId === null) {
      this.setState({ activeId: activ });
    }
  };
  toggleNull = () => {
    if (this.state.activeId !== null) {
      this.setState({ activeId: null });
    }
  };

  deleteStep = (obj) => {
    var array = [...this.state.activities];
    var index = array.indexOf(obj);
    if (index !== -1) {
      array.splice(index, 1);
      this.setState({ activities: array });
    }
    this.toggleNull();
  };

  render() {
    console.log(this.props);
    let { startIndex } = this.state;
    if (this.state.activeId === null && this.state.activities.length > 0) {
      return (
        <>
        <div className="component">
        <img src="/back02.jpg" width="550" height="300" alt="pic" />
        <div className="user-welcom">
        
          HI THERE! {this.props.user.name}.<br></br>
          All too often we let the fear of the unknown stop us. <br></br>
          But pushing ourselves out of our comfort zones is actually good for us. <br></br>
          Trying new things not only helps us to vanquish those fears, <br></br>
          but it also allows us to expand our minds and learn—both about said new thing, <br></br>
          and about ourselves. And then there's the rush.
          </div>
          </div>
          <br></br>
          <img src='/for_you.png' className='for' width="300" height="70" alt="for" />
          
          <br></br>
          <div className="row">
            {this.state.activities
              .slice(startIndex, startIndex + 3)
              .map((a) => (
                <div className="card">
                  <div>
                  <img src={a.img_url} width="200" height="150" alt="pic" />
                    <div>{a.name}</div>
                    
                  </div>
                  <button
                    variant="primary"
                    onClick={() => this.toggleActive(a.id)}
                    value={a.id}
                  >
                    Details
                  </button>
                </div>
              ))}
              <button className='next' onClick={this.updateIndex}> <img src="/next.png" width="50" height="50" alt="next"/></button>
          </div>
          <div className='decor'>
          <img src='/jerk-chicken.png' className='pic' width="90" height="80" alt="pic" />
          <img src='/hourglass.png' className='pic' width="90" height="80" alt="pic" />
          <img src='/camera.png' className='pic' width="90" height="80" alt="pic" />
          </div>
        {/* </div> */}
        </>
      );
    } else if (
      this.state.activeId === null &&
      this.state.activities.length === 0
    ) {
      return (
        <div className="welcome-note" onClick={this.renderQ}>
          {" "}
          <div className='decor'>
          <img src='/chess-clock.png' className='pic' width="100" height="90" alt="pic" />
          <img src='/chess-piece.png' className='pic' width="100" height="90" alt="pic" />
          <img src='/ramen.png' className='pic' width="100" height="90" alt="pic" />
          </div><br></br>
          <p className="title">
            WELCOME ABOARD! WE'RE SO GLAD YOU'VE JOINED US
          </p>
          <p className="first-part">
            One Step serves to help people of any age discover new stimulating
            and safe activities to try. We believe nobody should ever feel
            bored. <br></br>The world offers countless opportunities to try new
            things, and we help you find ones that are just right for you.
          </p>
          <br></br>
          <p className="second-part">
            Many activities also provide a new way to meet like-minded people
            online and in-person and increase your social interactions.{" "}
            <br></br>Whether you consider yourself an introvert or an extrovert,
            The One Step can enrich your life.
          </p>
          <br></br>
          <p className="third-part">
            Every individual is unique. That’s why we developed the One Step.
            <br></br> By completing this activity evaluation, we are able to
            surface activities that are matched to who you are. Try it out –
            it’s free.
          </p>
          <br></br>
          <p className="on-click">CLICK TO START</p>
        </div>
      );
    } else {
      return (
        <>
        <div className="act-name"><p id='name'>{this.state.activeId.name} </p></div>
        <div className="text-center">
          <div class="container">
            
            <br></br>
          </div>
          <div className="component">
            <ReactPlayer url={`${this.state.activeId.video_url}`} />

            <div className="desc">
              {this.state.activeId.description.split(".").map((p, index) =>
                index === 0 || p.length < 1 ? (
                  <ul>{p}</ul>
                ) : (
                  <ul>
                    {index}. {p}.
                  </ul>
                )
              )}
            </div>
          </div>
          <br></br>
        </div>
        <div className="buttons">
            <button className='del-but'
              variant="primary"
              onClick={() => this.deleteStep(this.state.activeId)}
            >
              Not For Me
            </button>
            <button className='back-btn' variant="primary" onClick={this.toggleNull}>
              Maybe Later
            </button>
          </div>
        </>
      );
    }
  }
}

export default UserPage;
