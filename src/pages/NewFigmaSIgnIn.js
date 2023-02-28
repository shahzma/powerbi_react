import React from 'react'
import styled from 'styled-components'
import { useState, useEffect, useCallback } from 'react'
import {Navigate} from 'react-router-dom';
import * as Msal from "msal";
// import {PublicClientApplication} from `@azure/msal-browser`

const NewFigmaSIgnIn = () => {
    const [ email, setEmail ] = useState('');
    const [FullName, setFullName] = useState('');
    const [Phone, setPhone] = useState(null);
    const [width, setWidth] = useState(window.innerWidth);
    const [loggedIn, setLoggedIn] = useState(false);

    const msalConfig = {
        auth: {
          clientId: "9a7ffe59-718e-40ee-b04e-d6f85b53f512",
          authority: "https://login.microsoftonline.com/00a9ff8c-9830-4847-ae51-4579ec092cb4",
        },
        cache: {
          cacheLocation: "localStorage",
          storeAuthStateInCookie: true,
        },
      };
      
    const msalInstance = new Msal.UserAgentApplication(msalConfig);

    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
      }

    useEffect(() => {
      window.addEventListener('resize', handleWindowSizeChange);
      return () => {
          window.removeEventListener('resize', handleWindowSizeChange);
      }
  }, []);

    let login = (e)=>{
      e.preventDefault();
      console.log(email)
      window.localStorage.setItem('email', email)
      const isInternalUser = email.endsWith('@redseerconsulting.com');
      fetch(`${process.env.REACT_APP_API_ENDPOINT}/authorise/login/?email=${email}`, {
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
        //   props.userLogin(data['pseudo_email'])
          window.localStorage.setItem("pseudo_email", data['pseudo_email'])
        //   props.setClientID(data['client_id'])
          window.localStorage.setItem("clientID", data['client_id'])
          window.localStorage.setItem('unregistered',data['unregistered'])
          window.localStorage.setItem('user_name', data['user_name'])
          // this.props.navigate('/reportlist')
        }
      )
      .catch( error => console.error(error))
    }

    let inputChanged = (e) => {
        setEmail(e.target.value);
      }
    
    const handleLogin = () => {
        console.log(msalInstance)
        msalInstance.loginPopup(["user.read"]).then(function (loginResponse) {
            // the user has successfully logged in
            // you can now get the user's access token using the getAccessToken method
            console.log('lr=',loginResponse)
            if (msalInstance.getAccount()){
                var tokenRequest = {
                    scopes: ["user.read", "mail.send"]
                };
                msalInstance.acquireTokenSilent(tokenRequest)
                    .then(response => {
                        // get access token from response
                        // response.accessToken
                        console.log('rt=',response)
                        let data = response
                        if(data){
                            console.log('work dammit')
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
                    })
                    .catch(err => {
                        // could also check if err instance of InteractionRequiredAuthError if you can import the class.
                        if (err.name === "InteractionRequiredAuthError") {
                            return msalInstance.acquireTokenPopup(tokenRequest)
                                .then(response => {
                                    // get access token from response
                                    // response.accessToken
                                })
                                .catch(err => {
                                    // handle error
                                });
                        }
                    });

            }else{
                console.log('wrong')
            }
            // msalInstance.acquireTokenSilent(params).then(response=>{
            //     console.log('at=', response.accessToken)
            // }).catch(err=>{console.log(err)})
          });
        
    };


    const authHandler = useCallback((err, data) => {
      window.sessionStorage.clear()
      console.log('error=', err);
      console.log('data=', data)
      if(data && !err){
        console.log('work dammit')
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
        return <Navigate to = "/otp"/>
    }

  return (
    width>768 ?(<PageContainer>
        <SideImg>
            <img src = '/Images/lhs.png' alt = ''/>
        </SideImg>
         <Login>
            <ImgDiv>
                <img src = '/Images/benchmark_logo.png' alt = ''/>
            </ImgDiv>
            <LoginForm>
            <form onSubmit={(e)=>login(e)}>
                <h4>Sign In</h4>
                <div className="form-group">
                    <label></label>
                    <input type = 'text' name = 'email' id='email' placeholder='Email' className="form-control" value={email}  onChange={(e) => inputChanged(e)}/>
                </div>
                <button type="submit" className="btn btn-primary btn-block" style={{backgroundColor:'blue' , border:'None'}} >Sign In</button>
            </form>
            </LoginForm>
            <SocialLogin>
                Sign In with <button onClick={openGoogleLoginPage}><img src = '/Images/google_icon.png'/></button> &nbsp;<button onClick={handleLogin}><img src = '/Images/ms_icon.png'/></button>
            </SocialLogin>
            <SignIn>
                Don't have an account? <a href='/login'>Sign Up</a>
            </SignIn>
            <FooterDiv>
                Terms and Conditions | Privacy Policy  | Contact Us
            </FooterDiv>
        </Login>
    </PageContainer>):(
        <PageContainer>
            <Login>
            <ImgDiv>
                <img src = '/Images/benchmark_logo.png' alt = ''/>
            </ImgDiv>
            <LoginForm>
            <form onSubmit={(e)=>login(e)}>
                <h4>Sign In</h4>
                <div className="form-group">
                    <label></label>
                    <input type = 'text' name = 'email' id='email' placeholder='Email' className="form-control" value={email}  onChange={(e) => inputChanged(e)}/>
                </div>
                <button type="submit" className="btn btn-primary btn-block" style={{backgroundColor:'blue' , border:'None'}} >Sign In</button>
            </form>
            </LoginForm>
            <SocialLogin>
                Sign In with <button><img src='/Images/google_icon.png'/></button> &nbsp;<button><img src = '/Images/ms_icon.png'/></button>
            </SocialLogin>
            <SignIn>
                Don't have an account? <a>Sign Up</a>
            </SignIn>
            <FooterDiv>
                {/* Terms and Conditions | Privacy Policy  | Contact Us */}
            </FooterDiv>
            </Login>
        </PageContainer>
    )
  )
}

export default NewFigmaSIgnIn

const PageContainer = styled.div`
height:100vh;
display:flex;
@media (max-width:768px){
    overflow-x:hidden
}
`

// const Login = styled.div`
// margin-top: 30vh;
// background-color:white;
// width:65%;
// justify-content:center;
// flex-direction:column;
// text-align:center;
// @media (max-width:768px){
//   width:100%;
// }
// `

const Login = styled.div`
/* margin-top: 10vh; */
text-align:center;
background-color:white;
width:65%;
display:flex;
flex-direction:column;
align-items:center;
@media (max-width:768px){
  width:100%;
}
`

const ImgDiv = styled.div`
/* border :1px solid red; */
margin-bottom: 40px;
margin-top:35px;
width:65vw;
flex-grow:1;
display:flex;
align-items:center;
justify-content:center;
img{

}
`

const LoginForm = styled.div`
margin-bottom: 10px;
/* flex-grow:1; */
width: 450px;
margin: auto;
margin-bottom: 20px;
@media (max-width:768px){
    width: 320px;
    margin: auto;
}
`

const SocialLogin = styled.div`
margin-bottom: 10px;
/* flex-grow:1; */
height:15vh;
display:flex;
align-items:center;
justify-content:center;
button{
    background-color:white;
    border: None;
    img{
        height:30px;
    }
}
@media (max-width:768px){
    margin-top:20px;
}
`

const SignIn = styled.div`
margin-bottom: 10px;
flex-grow:1;
`

const FooterDiv = styled.div`
border-top :1px solid black;
margin-bottom: 10px;
/* flex-grow:1; */
height:7vh;
width:40vw;
color:blue;
/* display:flex;
justify-content:center;
align-items:center; */
`

const LoginInner = styled.div`
  width: 450px;
  margin: auto;
  background: #ffffff;
  /* padding: 40px 55px 45px 55px; */
  img{
    position:absolute;
    /* width: 210px;
    height: 90px; */
    left: 61vw;
    /* top: 160px; */
    top:22vh;
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
background-color:#1C1C6C;
width:35%;
overflow:hidden;
`