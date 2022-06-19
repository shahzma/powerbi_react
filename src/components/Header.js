import React from 'react';
import styled from 'styled-components'

function Header() {
  return (
    <Container>
        <Wrap>
            <img src = '/Images/Redseer_red.jpeg' alt = 'logo'></img>
        </Wrap>
    </Container>
  )
}

export default Header

const Container = styled.div`
    background-color:white;
`

const Wrap = styled.div`
    padding:0.5em;
    img{
        height:6vh;
        padding-left:4vw;
    }
`