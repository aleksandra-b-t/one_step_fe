import React from "react";
import "./UserPage.css";
import ActivityPage from "./ActivityPage";
import Quiz from "./Quiz";
import { Form, Card, Button, Row, Col } from "react-bootstrap";

class UserPage extends React.Component {
  state = {
    activities: [],
    activeId: null,
  };

  renderQ = () => this.props.history.push("/quiz");

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
    let copy = [...this.state.activities]
    let activ = copy.find(act => act.id === n)
     console.log(activ)
     if (this.state.activeId === null) {
       this.setState({ activeId: activ });
       // renderCard(e.target.value)
       
     }
     console.log(n);
   };

  render() {
    console.log(this.state.activeId);

    if (this.state.activeId === null) {
      return (
        <div className="user-info">
          {this.props.user.name}
          <br></br>
          <div style={{ display: "flex", flexDirection: "row" }}>
            {this.state.activities.map((a) => (
              <Row>
                <Col md={3}>
                  <Card style={{ width: "18rem", flex: 1 }}>
                    <Card.Img variant="top" src="{a.img_url}" />
                    <Card.Body>
                      <Card.Title>{a.name}</Card.Title>
                      <Card.Text>Info about Act</Card.Text>
                      <Button
                        variant="primary"
                        onClick={() => this.toggleActive(a.id)}
                        value={a.id}
                      >
                        Check it out!
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            ))}
          </div>
          Are you new here? take a quiz ->
          <a href="#" onClick={this.renderQ}>
            <span></span>
            <span></span>
            QUIZ
          </a>
        </div>
      );
    } else {
      return (
        <Card className="text-center">
          <Card.Header>{this.state.activeId.name}Featured</Card.Header>
          <Card.Body>
            <Card.Title>Special title treatment</Card.Title>
            <Card.Text>
              With supporting text below as a natural lead-in to additional content.
            </Card.Text>
            <Button variant="primary">Not For Me</Button>
            <Button variant="primary">Maybe Later</Button>
            <Button variant="primary">Done it!</Button>
          </Card.Body>
          <Card.Footer className="text-muted">2 days ago</Card.Footer>
        </Card>
      )
    }
  }
}

export default UserPage;
