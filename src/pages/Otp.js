import React from 'react'
import Header from '../components/Header'
import styled from 'styled-components'
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

function Otp() {
  const [ otp, setotp ] = useState("");
  const [signIn, setsignIn] = useState(false);
  let signiIn = () => {
    console.log('signin')
    // window.location.href='/mainpage'
  }
  let submitOTP = (otp) => {
    console.log('otp = ', otp)
    let email = 'shahzma@redseerconsulting.com'
    const uploadData = new FormData();
    uploadData.append('email', email);
    uploadData.append('OTP', otp);
    fetch('http://127.0.0.1:8000/authorise/login/', {
        method: 'POST',
        body: uploadData
      })
      .then( res => {
        console.log(res);
        setsignIn(true);
        })
      .catch(error => console.log(error))
    // signIn()
    console.log('signIN = ', signIn)
    if(signIn){
      window.location.href='/mainpage'
  }
  }
  let inputChanged = (e) => {
    setotp(e.target.value);
  }
  return (
    <PageContainer>
      <Header/>
      <label htmlFor = 'OTP'>OTP : </label>s̄
      <input id = 'OTP' onChange={(e) => inputChanged(e)}/>
      <input type="submit" value="Submit"  onClick={() => submitOTP(otp)}></input>
    </PageContainer>
  )
}

export default Otp

const PageContainer = styled.div`
 background-color:#F4F4F4;
 min-height:100vh;
`