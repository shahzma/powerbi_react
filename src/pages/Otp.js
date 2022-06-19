import React from 'react'
import Header from '../components/Header'
import styled from 'styled-components'

function Otp() {
  return (
    <PageContainer>
      <Header/>
      <label for = 'OTP'>OTP : </label>
      <input id = 'OTP'/>
      <input type="submit" value="Submit"></input>
    </PageContainer>
  )
}

export default Otp

const PageContainer = styled.div`
 background-color:#F4F4F4;
 min-height:100vh;
`