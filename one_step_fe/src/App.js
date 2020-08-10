import React from 'react';
// import './App.css';
import NavBar from './components/NavBar'
import LogIn from './components/LogIn'
import ActivityPage from './components/ActivityPage'
import UserPage from './components/UserPage'
import {Route, Switch} from 'react-router-dom'


function App() {
  return (
    <div className="App">
      <header className="App-header">
       <NavBar/>
       <Switch>
       <Route path="/activities/:id" render={(routerProps)=><ActivityPage/> }/>
       <Route path="/users/:id" render={(routerProps)=><UserPage/> }/>
       <Route path="/" render={routerProps => <LogIn/> }/>
       </Switch>
       
      </header>
    </div>
  );
}

export default App;
