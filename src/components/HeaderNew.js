import React from 'react'
import styled from 'styled-components'

const HeaderNew = () => {
  return (
                    <User>
                        <a><img src = "/images/user.svg" alt = ""/></a>
                            <SignOut>
                                <a>Sign Out</a>
                            </SignOut>
                    </User>
  )
}

export default HeaderNew


const SignOut = styled.div`
display:none;
position:absolute;
top:48px;
right:25px;
background:#F6F6F6;
border:1px solid black;
border-radius: 0 0 5px 5px;
width:90px;
height: 40px;
font-size:16px;
/* transition-duration:160ms; */
text-align:center;
&:hover{
  background-color: #ddd;
}
`

const User = styled.div`
background-color:#F6F6F6;
img{
    float:right;
    width:48px;
    height:48px;
    border-radius:50%;
    padding:5px;
    margin-right:40px;
}

&:hover{
    ${SignOut}{
        align-items:center;
        display:flex;
        justify-content:center;
    }
  }
`