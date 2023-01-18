import React from 'react'
import styled from 'styled-components'
import { useState, useEffect } from 'react'
import {Navigate} from 'react-router-dom';
import { Tooltip as ReactTooltip} from 'react-tooltip'
import "react-tooltip/dist/react-tooltip.css";
import './Report.css';

const NewFigmaOTP = () => {
    const [ otp, setotp ] = useState("");
    const [phone,setphone] = useState('')
    const [signIn, setSignIn] = useState(false);
    const [width, setWidth] = useState(window.innerWidth);
    const [wrongOTP, setWrongOTP] = useState(false);
    const[username, setusername] = useState(null)
    const [lastname, setlastname] = useState(null)

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
        // console.log(email)
        // setLoggedIn(true)
      console.log('hello')
    }

    let inputChanged = (e) => {
        setotp(e.target.value);
      }
    
      let submitOTP = (e) => {
        e.preventDefault()
        // console.log('otp = ', otp)
        // console.log('email=', props.email)
        const uploadData = new FormData();
        let email = window.localStorage.getItem('email')
        uploadData.append('email', email);
        uploadData.append('OTP', otp);
        fetch(`${process.env.REACT_APP_API_ENDPOINT}/authorise/login/`, {
            method: 'POST',
            body: uploadData
          }).then(data => data.json())
          .then( data => {
            if (data.token){
                setSignIn(true);
                window.localStorage.setItem("token", data.token)
                setWrongOTP(false)
            }
            else{
                setSignIn(false);
                setWrongOTP(true)
                // alert('Wrong OTP')
            }
            })
          .catch(error => {
            setSignIn(false);
            alert('System Error.Contact Admin')
            console.log(error)
        })
        
        // signIn() .below alwasy is false
    //     if(signIn){
    //       window.location.href='/mainpage'
    //   }
      }

      let handleGoBack = ()=>{
        window.location.href = '/'
    }

      if(signIn){
        // below is always true
        console.log('signIn=',signIn)
        let player_name = window.localStorage.getItem("player_name")
        if (player_name){
          window.localStorage.setItem("ReportName", "Sectors_Company_Profile")
          return <Navigate to = "/report"/>
        }else{
          return <Navigate to = "/newmainpage"/>
        }
    }

  return (
    width>768 ?(
    <PageContainer>
        <SideImg>
            <img src = '/Images/lhs.png' alt = ''/>
        </SideImg>
         <Login>
            <ImgDiv>
                <img src = '/Images/benchmark_logo.png' alt = ''/>
            </ImgDiv>
            <LoginForm>
            <form onSubmit={(e)=>submitOTP(e)}>
                <h3>Sign In</h3>
                <label></label>
                <h5>Enter your OTP</h5>
                {wrongOTP?<div style={{color:'red'}}>Wrong OTP</div>:<div></div>}
                <div className="form-group">
                    <label></label>
                    <input type = 'text' name = 'otp' id='otp' data-tooltip-content="wrong otp" placeholder='OTP' className="form-control" value={otp}  onChange={(e) => inputChanged(e)}/>
                </div>
                <label></label>
                <label></label>
                <button type="submit" className="btn btn-primary btn-block" style={{backgroundColor:'blue' , border:'None'}} >Continue</button>
                <label></label>
                <button type="button" className="btn btn-primary btn-block" style={{backgroundColor:'White' , border:'1px solid blue', color:'black'}} onClick={handleGoBack}>Not Now</button>
            </form>
            </LoginForm>
            <SocialLogin>
                {/* Sign In with <button><img src = '/Images/google_icon.png'/></button> &nbsp;<button><img src = '/Images/ms_icon.png'/></button> */}
            </SocialLogin>
            <SignIn>
                {/* Don't have an account? <a>Sign Up</a> */}
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
                <h3>Sign In</h3>
                <label></label>
                <h5>Enter your OTP</h5>
                <div className="form-group">
                    <label></label>
                    <input type = 'text' name = 'otp' id='otp' placeholder='OTP' className="form-control" value={otp}  onChange={(e) => inputChanged(e)}/>
                </div>
                <label></label>
                <label></label>
                <button type="submit" className="btn btn-primary btn-block" style={{backgroundColor:'blue' , border:'None'}} >Continue</button>
                <label></label>
                <button type="button" className="btn btn-primary btn-block" style={{backgroundColor:'White' , border:'1px solid blue', color:'black'}} onClick={handleGoBack}>Not Now</button>
            </form>
            </LoginForm>
            <SocialLogin>
                {/* Sign In with <button><img src = '/Images/google_icon.png'/></button> &nbsp;<button><img src = '/Images/ms_icon.png'/></button> */}
            </SocialLogin>
            <SignIn>
                {/* Don't have an account? <a>Sign Up</a> */}
            </SignIn>
            <FooterDiv>
                {/* Terms and Conditions | Privacy Policy  | Contact Us */}
            </FooterDiv>
            </Login>
        </PageContainer>
    )
  )
}

export default NewFigmaOTP

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