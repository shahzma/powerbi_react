
import React, { Component} from 'react';
import {Navigate} from 'react-router-dom';
import './login.css';

class Login extends Component {
    constructor(props){
        super(props)
        let loggedIn = false
        this.state = {
            credentials: {username: '', password: ''},
            loggedIn
        }
    }

  login = event => {
      event.preventDefault()// to stop submit form from immedeatly moving on without waiting for result
      console.log(this.state.credentials)
    fetch('http://127.0.0.1:8000/auth/', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(this.state.credentials)
    })
    .then(
        data => data.json()
        )
    .then(
      data => {
        this.props.userLogin(data.token);
        this.setState({loggedIn: true})
        console.log(this.state.loggedIn)
        // this.props.navigate('/reportlist')
      }
    )
    .catch( error => console.error(error))
    // <Navigate to="/reportlist"/>
  }
  
  inputChanged = event => {
    const cred = this.state.credentials;
    cred[event.target.name] = event.target.value;
    this.setState({credentials: cred});
  }


  render() {
        if(this.state.loggedIn){
            return <Navigate to = "/reportlist"/>
        }
    return (
      <div className="App1">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">  
            <div className="container">
            {/* <Link className="navbar-brand" to={"/"}>Redseer</Link> */}
            <img src = '/Images/Redseer_red.jpeg' style={{height:'40px'}}  alt=' Redseer logo'/>
            </div>
        </nav> 


        <div className="auth-wrapper">
        <div className="auth-inner">
            <form onSubmit={this.login}>
                <h3>Sign In</h3>
                <div className="form-group">
                    <label>Email</label>
                    {/* <input type="text" className="form-control" placeholder="Enter Username" value={this.state.credentials.username} onChange={this.inputChanged}/> */}
                    <input type = 'text' name = 'Email' id='Email' className="form-control" value={this.state.credentials.username} onChange={this.inputChanged}/>
                </div>
                {/* <div className="form-group">
                    <label>Password</label>
                    <input type = 'password' className="form-control" name = 'password' id='password' value={this.state.credentials.password} onChange={this.inputChanged}/>
                </div> */}
                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary btn-block" style={{backgroundColor:'#4D4A50' , border:'None'}} >Submit</button>
            </form>
        </div>
      </div>
    </div>

    );
  }
}

export default Login;