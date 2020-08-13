import React from "react";
import "./UserPage.css";
import ActivityPage from "./ActivityPage";
import Quiz from "./Quiz";
import { Form, Card, Button, Row, Col } from "react-bootstrap";

class UserPage extends React.Component {
  state = {
    activities: [],
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

  render() {
    // console.log(this.props.user);
    console.log(this.state.activities);
    return (
      // if user is new, than render key
      // if user.activity !== null => render act.

      <div className="user-info">
        {this.props.user.name}
        <br></br>
        <div style={{display: 'flex', flexDirection: 'row'}} >
          {this.state.activities.map((a) => (
            <Row>
              <Col md={3}>
                <Card style={{ width: "18rem", flex: 1}}>
                  <Card.Img variant="top" src="{a.img_url}" />
                  <Card.Body>
                    <Card.Title>{a.name}</Card.Title>
                    <Card.Text>Info about Act</Card.Text>
                    <Button variant="primary">Check it out!</Button>
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
  }
}

export default UserPage;
