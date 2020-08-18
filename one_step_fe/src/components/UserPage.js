import React from "react";
import "./UserPage.css";
import ActivityPage from "./ActivityPage";
import Quiz from "./Quiz";
import ReactPlayer from 'react-player'
import { Form, Card, Button, Row, Col, Image} from "react-bootstrap";

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
    fetch(`http://localhost:3000/users/${this.props.user.id}`, {
      headers: {
        Authorization: localStorage.token,
      },
    })
      .then((res) => res.json())
      .then((res) => this.setState({ activities: res.activities }));
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
        <div className="user-info">
          {this.props.user.name}
          <br></br>
          <br></br>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Row>
              {this.state.activities
                .slice(startIndex, startIndex + 3)
                .map((a) => (
                  <Col md={3}>
                    <Card>
                      <Card.Body>
                        <Card.Title>{a.name}</Card.Title>
                        <Card.Text>{a.description.split(".")[0]}.</Card.Text>
                        <Button
                          variant="primary"
                          onClick={() => this.toggleActive(a.id)}
                          value={a.id}
                        >
                          Details
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
            </Row>
            <Button onClick={this.updateIndex} />
          </div>
        </div>
      );
    } else if (
      this.state.activeId === null &&
      this.state.activities.length === 0
    ) {
      return (
        <div className='welcome-note' onClick={this.renderQ}>
          {" "}
          <p className='title'>WELCOME ABOARD! WE'RE SO GLAD YOU'VE JOINED US</p>
          <p className='first-part'>One Step serves to help
          people of any age discover new stimulating and safe activities to try.
          We believe nobody should ever feel bored. <br></br>The world offers countless
          opportunities to try new things, and we help you find ones that are
          just right for you.</p><br></br>
          <p className='second-part'>Many activities also provide a new way to meet like-minded people
          online and in-person and increase your social interactions. <br></br>Whether
          you consider yourself an introvert or an extrovert, The One Step
          can enrich your life.</p><br></br>
          <p className='third-part'>Every individual is unique. That’s why we developed the One Step.<br></br> By
          completing this activity evaluation, we are able to surface activities
          that are matched to who you are. Try it out – it’s free.</p>
          <br></br>
          <p className='on-click'>CLICK TO START</p>
        </div>
      );
    } else {
      return (
        <Card className="text-center">
          <div class="container">
          <Image src={`${this.state.activeId.img_url}`} fluid />
          <Card.Header>{this.state.activeId.name} </Card.Header>
          </div>
          <Card.Body>
            <Row>
            <Col sm>
            <ReactPlayer url={`${this.state.activeId.video_url}`} />
            </Col>
            <Col sm className='desc'>
            {this.state.activeId.description.split('.').map((p, index)=> 
            (index === 0 || p.length < 1 ? <ul>{p}</ul> : <ul>{index}. {p}.</ul>
            )
            )}
            </Col></Row>
            <Button
              variant="primary"
              onClick={() => this.deleteStep(this.state.activeId)}
            >
              Not For Me
            </Button>
            <Button variant="primary" onClick={this.toggleNull}>
              Maybe Later
            </Button>
          </Card.Body>
          <Card.Footer className="text-muted">Additional: <br></br>
          {this.state.activeId.img_url}</Card.Footer>
        </Card>
      );
    }
  }
}

export default UserPage;
