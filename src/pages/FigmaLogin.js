import React from 'react'
import styled from 'styled-components'
import { useState } from 'react'
import {Navigate} from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import MicrosoftLogin from "react-microsoft-login";
import GoogleButton from 'react-google-button'
import{ useCallback, useContext } from 'react';
import TagManager from 'react-gtm-module';
import './FigmaLogin.css'

const FigmaLogin = (props) => {
    const [ email, setEmail ] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [isMobile, setisMobile] = useState(false);
    const [width, setWidth] = useState(window.innerWidth);

    const search = useLocation().search;
    const player_name = new URLSearchParams(search).get('name')
    

    const responseGoogle = (response) => {
    console.log(response);
    }

    function handleWindowSizeChange() {
      setWidth(window.innerWidth);
    }

    useEffect(() => {
      window.addEventListener('resize', handleWindowSizeChange);
      return () => {
          window.removeEventListener('resize', handleWindowSizeChange);
      }
  }, []);
    useEffect(()=>{
      console.log('company = ', player_name)
      if(player_name)
      {window.localStorage.setItem("player_name", player_name.split(' ')[0]);}
    })

    let inputChanged = (e) => {
        setEmail(e.target.value);
      }
    
    let login = (e)=>{
        e.preventDefault();
      console.log(email)
      window.localStorage.setItem('email', email)
      const isInternalUser = email.endsWith('@redseerconsulting.com');
      console.log('is_internal= ' , isInternalUser)
      // TagManager.dataLayer({
      //   event: 'userLogin',
      //   'isInternalUser':isInternalUser,
      //   email,
      // });
      props.getRealEmail(email)
      fetch(`${process.env.REACT_APP_API_ENDPOINT}/authorise/login/?email=${email}`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
      })
      .then(
          data => data.json(),        )
      .then(
        data => {
          console.log(data)
          if(data['otp_access']===true){
            setLoggedIn(true)
            console.log('data=',data['pseudo_email'])
            props.userLogin(data['pseudo_email'])
            window.localStorage.setItem("pseudo_email", data['pseudo_email'])
            props.setClientID(data['client_id'])
            window.localStorage.setItem("clientID", data['client_id'])
            window.localStorage.setItem('unregistered',data['unregistered'])
          }else{
            alert('Login with Gmail or Microsoft only')
          }
          // this.props.navigate('/reportlist')
        }
      )
      .catch( error => console.error(error))
    }

    const authHandler = useCallback((err, data) => {
      window.sessionStorage.clear()
      console.log('error=', err);
      console.log('data=', data)
      if(data && !err){
        console.log('acc=', data['account'].userName)
        let email = data['account'].userName
        const uploadData = new FormData();
        uploadData.append('email', data['account'].userName);
        uploadData.append('access_token', data['accessToken']);
        fetch(`${process.env.REACT_APP_API_ENDPOINT}/login/ms/`, {
            method: 'POST',
            body: uploadData
          }).then(data => data.json())
          .then( data => {
            if (data.token){
                window.localStorage.setItem("token", data.token)
                window.localStorage.setItem("pseudo_email", data.pseudo_email)
                window.localStorage.setItem("clientID", data.client_id)
                window.localStorage.setItem("email", email)
                window.location.href='/mainpage'
            }
            else{
            }
            })
          .catch(error => {
            // setSignIn(false);
            alert('System Error.Contact Admin')
            console.log(error)
        })
        }
    },[]);

    const openGoogleLoginPage = useCallback(() => {
      const googleAuthUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
      const redirectUri = 'api/v1/auth/login/google/';
    
      const scope = [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile'
      ].join(' ');
    
      const params = {
        response_type: 'code',
        client_id: '560541008989-k0er5bb7onv6dj7d46fh05cjes2qb9p5.apps.googleusercontent.com',
        // redirect_uri: `http://localhost:8001/api/v1/auth/login/google/`,
        redirect_uri: `https://api.benchmarks.digital/api/v1/auth/login/google/`,
        prompt: 'select_account',
        access_type: 'offline',
        scope
      };
    
      const urlParams = new URLSearchParams(params).toString();
    
      window.location = `${googleAuthUrl}?${urlParams}`;
    }, []);

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
                <img src = '/Images/benchmark.svg' alt=''/>
            <form onSubmit={(e)=>login(e)}>
                <h4>Sign In!</h4>
                <div className="form-group">
                    <label></label>
                    <input type = 'text' name = 'email' id='email' placeholder='Enter your email' className="form-control" value={email}  onChange={(e) => inputChanged(e)}/>
                </div>
                <button type="submit" className="btn btn-primary btn-block" style={{backgroundColor:'#EE2D31' , border:'None'}} >Log In</button>
            </form>
            </LoginInner>
            {/* <GoogleLogin
            clientId="560541008989-k0er5bb7onv6dj7d46fh05cjes2qb9p5.apps.googleusercontent.com"  // your Google app client ID
            buttonText="Sign in with Google"
            onSuccess={responseGoogle} // perform your user logic here
            onFailure={responseGoogle} // handle errors here
          /> */}
          <MicrosoftLogin clientId='9a7ffe59-718e-40ee-b04e-d6f85b53f512' authCallback={authHandler} className = 'msLogin'/>
          <GoogleButton
            onClick={openGoogleLoginPage} style ={{'marginLeft':'20vw', 'marginTop':'20px', 'width':'15vw'}}
          />
        </Login>
        <SideImg>
            <img src = '/Images/sidegraph_be.svg' alt = ''/>
        </SideImg>
    </PageContainer>
    ):(
      <PageContainer>
        <Login>
            <LoginInner>
                {/* <h3>redseer</h3> */}
                <img src = '/Images/bold_logo.svg' alt=''/>
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
    width: 210px;
    height: 90px;
    left: 21vw;
    /* top: 160px; */
    top:22vh;
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