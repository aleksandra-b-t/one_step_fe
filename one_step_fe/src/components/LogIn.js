import React from 'react';
import './LogIn.css'

class LogIn extends React.Component {

    state= {
        isNewUser: false,
        name: '',
        password: '',
        confirmation: '',
        age: '',
        gender: '',
        email: '',
    }

    toggleNewUser = () => this.setState(prevState => ({ isNewUser: !prevState.isNewUser, password: '', name: '', confirmation: '', gender: '', age: '', email: ''}))
    handleChange = e => this.setState({ [e.target.name]: e.target.value })

    postUser = () => {
        const { name, password, confirmation, gender, age, email } = this.state;
        if (password === confirmation) {
            fetch("http://localhost:3000/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({name: name, password: password, age: age, email: email, gender: gender})
            })
            .then(res => res.json())
            .then(res => {
                if (res.errors) {
                    alert(res.errors)
                } else {
                    this.props.setUser(res, this.state.isNewUser)
                }
            })
        } 
        else {
            alert("passwords dont match")
        }
    }
    hendleResponse = (res) => {
        console.log(res)
    }


    loginUser = () => {
        const { name, password } = this.state;
        fetch("http://localhost:3000/login",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({name, password})
        })
        .then(res =>  res.json())
        .then(res => {
            if (res.errors) {
                alert(res.errors)
            } else {
                this.props.setUser(res)
            }
        })
    }


    handleSubmit = e => {
        if (this.state.isNewUser) {
            this.postUser()
            console.log("create user");
        } else {
            this.loginUser()
            console.log("login user");
        }
        // isNewUser 
        // ? password === confirmation ? this.props.history.push('/songs') : alert('try again!')
        //     : this.props.history.push('/songs')
    }

    renderLogin = () => {
        const { name, password } = this.state;
        return (
            <div id="simple-flex-col-log">
                <input name="name" placeholder="Name" value={name} onChange={this.handleChange}/>
                <input name="password" placeholder="Password" type="password" value={password} onChange={this.handleChange}/>
            </div>
        )
    }
    renderSignup = () => {
        const { password, name, confirmation,age, email , gender} = this.state;
        return (
            <div id="simple-flex-col-sign">
                <input name="name" placeholder="Name" value={name} onChange={this.handleChange}/><br></br>
                <input name="age" placeholder="Age" value={age} onChange={this.handleChange}/><br></br>
                <input name="email" placeholder="Email" value={email} onChange={this.handleChange}/><br></br>
                <input name="gender" placeholder="Gender" value={gender} onChange={this.handleChange}/><br></br>
                <input name="password" placeholder="Password" type="password" value={password} onChange={this.handleChange}/><br></br>
                <input name="confirmation" placeholder="Confirm Password"  type="password" value={confirmation} onChange={this.handleChange}/><br></br>
            </div>
        )
    }
    
    
    
    
    render(){
        let { isNewUser } = this.state;
        return (
            <div className="ath-form">
                <h3>{isNewUser ? 'Sign Up' : 'Login'}</h3>
                { isNewUser ? this.renderSignup() : this.renderLogin() }
                <button className='sub-in' type="submit" onClick={this.handleSubmit}>Submit</button>
                <div className='option' onClick={this.toggleNewUser}>{isNewUser ? "Login Instead" : "Sign Up Instead"}</div>
            </div>
        )
    }

}

export default LogIn