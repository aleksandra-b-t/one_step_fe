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
    isNewUser: false,
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

  setUser = (res, isNewUser)=> {
    console.log(res);
    console.log(isNewUser)
    this.setState(
      { currentUser: res.user, isNewUser: isNewUser },
      () => {
        localStorage.token = res.token
        // console.dir(this.props.history)
        this.props.history.push(`users/${res.user.id}`)
      }
    )
  }

  logout = (e) => {
    e.preventDefault()
    this.setState(
      { currentUser: null },
      () => {
        localStorage.removeItem("token")
        this.props.history.push("/")
      }
    )
  }
  render(){
    return (
      <div className="App">
        <header className="App-header">
        <NavBar logout={this.logout} user={this.state.currentUser}/>
        <Switch>
        {/* <Route path="/activities/:id" render={(routerProps)=><ActivityPage/> }/> */}
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
