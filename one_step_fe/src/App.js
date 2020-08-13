import React from 'react';
// import './App.css';
import NavBar from './components/NavBar'
import LogIn from './components/LogIn'
import ActivityPage from './components/ActivityPage'
import UserPage from './components/UserPage'
import Quiz from './components/Quiz'
import {Route, Switch} from 'react-router-dom';
import { withRouter } from "react-router-dom"


class App extends React.Component {
  state = {
    currentUser: null,
  }

  componentDidMount() {
    const token = localStorage.token
    if(token) {
      fetch("http://localhost:3000/auto_login", {
        headers: {
          "Authorization": token
        }
      })
      .then(res => res.json())
      .then(res => {
        if(res.errors) {
          alert(res.errors)
        } else {
          this.setState({ currentUser: res })
        }
      })
    }

  }

  setUser = res => {
    console.log(res);
    this.setState(
      { currentUser: res.user },
      () => {
        localStorage.token = res.token
        // console.dir(this.props.history)
        this.props.history.push(`users/${res.user.id}`)
      }
    )
  }

  logout = () => {
    this.setState(
      { currentUser: null },
      () => {
        localStorage.removeItem("token")
        this.props.history.push("/login")
      }
    )
  }
  render(){
    return (
      <div className="App">
        <header className="App-header">
        <NavBar/>
        <Switch>
        <Route path="/activities/:id" render={(routerProps)=><ActivityPage/> }/>
        <Route path="/users/:id" render={(routerProps)=><UserPage {...routerProps} user={this.state.currentUser}/> }/>
        <Route path="/quiz" render={routerProps => <Quiz {...routerProps} user={this.state.currentUser}/> }/>
        <Route path="/" render={routerProps => <LogIn {...routerProps} setUser={this.setUser}/> }/>
        </Switch>
        
        </header>
      </div>
    );
  }
}

export default withRouter(App) ;
