import React from 'react'
import styled from 'styled-components'
import { useState } from 'react'
import {Navigate} from 'react-router-dom';
import { useEffect } from 'react';

const FigmaLogin = (props) => {
    const [ email, setEmail ] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [isMobile, setisMobile] = useState(false);
    const [width, setWidth] = useState(window.innerWidth);

    function handleWindowSizeChange() {
      setWidth(window.innerWidth);
    }

    useEffect(() => {
      window.addEventListener('resize', handleWindowSizeChange);
      return () => {
          window.removeEventListener('resize', handleWindowSizeChange);
      }
  }, []);

    let inputChanged = (e) => {
        setEmail(e.target.value);
      }
    
    let login = (e)=>{
        e.preventDefault();
        // console.log(email)
        // setLoggedIn(true)
      console.log(email)
      props.getRealEmail(email)
      fetch(`${process.env.REACT_APP_API_ENDPOINT}authorise/login/?email=${email}`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
      })
      .then(
          data => data.json(),        )
      .then(
        data => {
          // this.props.userLogin(data.token);
          setLoggedIn(true)
          console.log(loggedIn)
          console.log('data=',data['pseudo_email'])
          props.userLogin(data['pseudo_email'])
          props.setClientID(data['client_id'])
          // this.props.navigate('/reportlist')
        }
      )
      .catch( error => console.error(error))
    }

    if(loggedIn){
        console.log(loggedIn)
        return <Navigate to = "/FigmaOtp"/>
    }

  return (
    width>768 ?(
    <PageContainer>
        <Login>
            <LoginInner>
                {/* <h3>redseer</h3> */}
                <img src = '/Images/BenchMarks_logo.svg' alt=''/>
            <form onSubmit={(e)=>login(e)}>
                <h4>Sign In!</h4>
                <div className="form-group">
                    <label></label>
                    <input type = 'text' name = 'email' id='email' placeholder='Enter your email' className="form-control" value={email}  onChange={(e) => inputChanged(e)}/>
                </div>
                <button type="submit" className="btn btn-primary btn-block" style={{backgroundColor:'#EE2D31' , border:'None'}} >Log In</button>
            </form>
            </LoginInner>
        </Login>
        <SideImg>
            <img src = '/Images/sidegraph.svg' alt = ''/>
        </SideImg>
    </PageContainer>
    ):(
      <PageContainer>
        <Login>
            <LoginInner>
                {/* <h3>redseer</h3> */}
                <img src = '/Images/BenchMarks_logo.svg' alt=''/>
            <form onSubmit={(e)=>login(e)}>
                <h4>Sign In!</h4>
                <div className="form-group">
                    <label></label>
                    <input type = 'text' name = 'email' id='email' placeholder='Enter your email' className="form-control" value={email}  onChange={(e) => inputChanged(e)}/>
                </div>
                <button type="submit" className="btn btn-primary btn-block" style={{backgroundColor:'#EE2D31' , border:'None'}} >Log In</button>
            </form>
            </LoginInner>
        </Login>
    </PageContainer>
    )
  )
}

export default FigmaLogin

const PageContainer = styled.div`
height:100vh;
display:flex;
@media (max-width:768px){
    overflow-x:hidden
}
`

const Login = styled.div`
margin-top: 30vh;
background-color:white;
width:56%;
justify-content:center;
flex-direction:column;
text-align:center;
@media (max-width:768px){
  width:100%;
}
`

const LoginInner = styled.div`
  width: 450px;
  margin: auto;
  background: #ffffff;
  padding: 40px 55px 45px 55px;
  img{
    position:absolute;
    width: 176px;
    height: 45px;
    left: 22.5vw;
    top: 160px;
  }
    
  h3 {
      font-family: "Abril Fatface" cursive;
      font-size: 40px;
      color:red;
    }
  @media (max-width:768px){
    width: 400px;
    margin: auto;
    padding: 40px 55px 45px 55px;
    img{
      position:absolute;
      width: 176px;
      height: 45px;
      left: 30vw;
      top: 160px;
    }
}
`

const SideImg = styled.div`
background-color:#EE2D31;
width:44%;
overflow:hidden;
`