import React from 'react'
import styled from 'styled-components'
import { useState } from 'react'
import {Navigate} from 'react-router-dom';
import { useEffect } from 'react';

const FigmaOtp = (props) => {

    const [ otp, setotp ] = useState("");
    const [signIn, setSignIn] = useState(false);
    const [width, setWidth] = useState(window.innerWidth);
    const [wrongOTP, setWrongOTP] = useState(false);


    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
      }
  
    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        // console.log(props.email)
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    let inputChanged = (e) => {
        setotp(e.target.value);
    }
    
    let login = (e)=>{
        e.preventDefault();
        console.log(otp)
        setSignIn(true)
    }

    let submitOTP = (e) => {
        e.preventDefault()
        console.log('otp = ', otp)
        console.log('email=', props.email)
        const uploadData = new FormData();
        uploadData.append('email', props.email);
        uploadData.append('OTP', otp);
        fetch(`${process.env.REACT_APP_API_ENDPOINT}/authorise/login/`, {
            method: 'POST',
            body: uploadData
          }).then(data => data.json())
          .then( data => {
            props.setTokenVal(data.token)
            if (data.token){
                setSignIn(true);
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
        return <Navigate to = "/Mainpage"/>
    }

  return (
    width>768 ? (
    <PageContainer>
    <Login>
        <LoginInner>
            <img src = '/Images/new_bold_logo.svg' alt=''/>
        <form onSubmit={(e)=>submitOTP(e)}>
            <h4>Please Enter OTP</h4>
            {wrongOTP?<div style={{color:'red'}}>Wrong OTP</div>:<div></div>}
            <div className="form-group">
                <label></label>
                <input type = 'text' name = 'otp' id='otp' placeholder='Enter the code' className="form-control" value={otp}  onChange={(e) => inputChanged(e)}/>
            </div>
            <button type="submit" className="btn btn-primary btn-block" style={{backgroundColor:'#EE2D31' , border:'None'}} >Verify</button>
            <button type="button" className="btn btn-primary btn-block" style={{backgroundColor:'White' , border:'1px solid #E3E3E3', color:'black'}} onClick={handleGoBack}>Go Back !</button>
        </form>
        </LoginInner>
    </Login>
    <SideImg>
        <img src = '/Images/sidegraph_be.svg' alt = ''/>
    </SideImg>
    </PageContainer>
    ):(
    <PageContainer>
    <Login>
        <LoginInner>
            <img src = '/Images/bold_logo.svg' alt=''/>
        <form onSubmit={(e)=>submitOTP(e)}>
            <h4>Please Enter OTP</h4>
            <div className="form-group">
                <label></label>
                <input type = 'text' name = 'otp' id='otp' placeholder='Enter the code' className="form-control" value={otp}  onChange={(e) => inputChanged(e)}/>
            </div>
            <button type="submit" className="btn btn-primary btn-block" style={{backgroundColor:'#EE2D31' , border:'None'}} >Verify</button>
            <button type="button" className="btn btn-primary btn-block" style={{backgroundColor:'White' , border:'1px solid #E3E3E3', color:'black'}} onClick={handleGoBack}>Go Back !</button>
        </form>
        </LoginInner>
    </Login>
    </PageContainer>
    )
  )
}

export default FigmaOtp

const PageContainer = styled.div`
height:100vh;
display:flex;
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
    top: 160px;
  }
    
  h3 {
      font-family: "Abril Fatface" cursive;
      font-size: 40px;
      color:red;
    }
  @media (max-width:768px) {
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