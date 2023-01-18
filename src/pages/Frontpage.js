import React from 'react'
import styled from 'styled-components'
import { useState, useEffect } from 'react';

const Frontpage = () => {

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

  return (
    
    width>768 ?(<>
        <PageHeader>
                <div><img src = '/Images/benchmark_logo.png' alt = ''/></div><div>Products</div><div>Articles</div><SignInDiv><a href='/signin'>Login</a> <button>Register</button></SignInDiv>
        </PageHeader>
        <FirstPage>
            <NewAge><h2>New Age <span style={{'color':'blue'}}>Market Intelligence</span><br></br>Platform of choice</h2> Benchmarks is an on - demand business intelligence platform that tracks 150+
                        business relevant KPIs, monthly across 1000+ companies, providing vast
                        market insights and competitive edge in a fraction of time.<br></br><br></br><button> Get Started</button>
                        <br/>
                        <br/>
                        <br/>
                        <img src = '/Images/graph.png'/>
            </NewAge>
            <Article>
                {/* <div><img src = '/Images/top_left.png'/></div> */}
                <img src = '/Images/top_left.png' style = {{'width':'44vw'}}  />
                <VerticalArticles>
                    <div style={{'marginLeft':'5px'}}> 
                        <div>B2B Service<br/> It is our pleasure to release our report The Most<br/> Inclusive Football Tournament</div>
                        <div><img src = '/Images/sidebar_demo.png'/></div>
                    </div>
                    <div style={{'marginLeft':'5px'}}>
                    <div>B2B Service<br/> It is our pleasure to release our report The Most<br/> Inclusive Football Tournament</div>
                        <div><img src = '/Images/sidebar_demo.png'/></div>
                    </div>
                    <div style={{'marginLeft':'5px'}}>
                    <div>B2B Service<br/> It is our pleasure to release our report The Most<br/> Inclusive Football Tournament</div>
                        <div><img src = '/Images/sidebar_demo.png'/></div>
                    </div>
                    <div style={{'marginLeft':'5px'}}>
                    <div>B2B Service<br/> It is our pleasure to release our report The Most<br/> Inclusive Football Tournament</div>
                        <div><img src = '/Images/sidebar_demo.png'/></div>
                    </div>
                </VerticalArticles>
            </Article>
        </FirstPage>
        <img src = '/Images/top_company.png'/>
        <div style = {{'display':'flex', 'alignItems': 'center', 'justifyContent':'center', 'height':'25vh', 'fontWeight':'bold', 'flexDirection':'column', 'gap':'5vh'}}>
            Trusted by the best and brightest digital brands
            <img src = '/Images/brands.png'/>
        </div>
        <img src='/Images/base.png'/>
        <img src = '/Images/get_started.png'/>
        {/* <div style = {{'display':'flex', 'alignItems': 'center', 'justifyContent':'center', 'height':'10vh', 'fontWeight':'bold'}}>
        <img src = '/Images/brands.png'/>
        </div> */}
        <Footer>
            {/* <img src = '/Images/benchmark_logo.png'/> */}
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div><img src = '/Images/benchmark_logo.png'/>
            <label></label>
            <FooterTextBox>Bringing the right kind of market intelligence and insights to their clients that are tailored for smart business decision</FooterTextBox>
            </div>
            <div></div>
            <MiniMenu>
                <div>About</div> 
                <div>Product</div>
                <div>Articles</div>
                <div>Contact Us</div>
            </MiniMenu>
            <div></div>
            <Socal>
                <div>Terms and Conditions</div>
                <div>Privacy Policy</div>
                <div></div>
            </Socal>
            <div></div>
            <div></div>
        </Footer>
    </>):(
        <>
        {/* <PageHeader>
                <div><img src = '/Images/benchmark_logo.png' alt = ''/></div> <div>Products</div><div>Articles</div><SignInDiv><div>Log In</div> <button>Register</button></SignInDiv>
        </PageHeader> */}
        <FirstPage>
            <NewAge><h2>New Age <span style={{'color':'blue'}}>Market Intelligence</span><br></br>Platform of choice</h2> Benchmarks is an on - demand business intelligence platform that tracks 150+
                        business relevant KPIs, monthly across 1000+ companies, providing vast
                        market insights and competitive edge in a fraction of time.<br></br><br></br><button> Get Started</button>
                        <br/>
                        <br/>
                        <br/>
                        <img src = '/Images/graph.png'/>
            </NewAge>
            <Article>
                {/* <div><img src = '/Images/top_left.png'/></div> */}
                <img src = '/Images/top_left.png' style = {{'width':'100vw'}}  />
                <VerticalArticles>
                    <div> 
                        <div>B2B Service<br/> It is our pleasure to release our report The Most<br/> Inclusive Football Tournament</div>
                        <div><img src = '/Images/sidebar_demo.png'/></div>
                    </div>
                    <div>
                    <div>B2B Service<br/> It is our pleasure to release our report The Most<br/> Inclusive Football Tournament</div>
                        <div><img src = '/Images/sidebar_demo.png'/></div>
                    </div>
                    <div>
                    <div>B2B Service<br/> It is our pleasure to release our report The Most<br/> Inclusive Football Tournament</div>
                        <div><img src = '/Images/sidebar_demo.png'/></div>
                    </div>
                    <div>
                    <div>B2B Service<br/> It is our pleasure to release our report The Most<br/> Inclusive Football Tournament</div>
                        <div><img src = '/Images/sidebar_demo.png'/></div>
                    </div>
                </VerticalArticles>
            </Article>
        </FirstPage>
        <img src = '/Images/top_company.png' style = {{'width':'100vw'}}/>
        <div style = {{'display':'flex', 'alignItems': 'center', 'justifyContent':'center', 'height':'25vh', 'fontWeight':'bold', 'flexDirection':'column', 'gap':'5vh'}}>
            Trusted by the best and brightest digital brands
            <img src = '/Images/brands.png' style = {{'width':'100vw'}}/>
        </div>
        <img src='/Images/base.png' style = {{'width':'100vw'}}/>
        <img src = '/Images/get_started.png' style = {{'width':'100vw'}}/>
        </>
    )
  )
}

export default Frontpage

const PageHeader = styled.div`
height:10vh;
background-color:#F9FAFB;
display:flex;
justify-content:center;
align-items:center;
gap:12vw;
div{
    display:flex;
    align-items:center;
    justify-content:space-between;
    gap:10vw;
    button {
        border:1px solid blue;
        color:blue;
        padding:10px 40px;
        background-color:#F9FAFB;
    }

@media (max-width:768px){
}
}
`

const SignInDiv = styled.div`
color:blue;
`
const FirstPage = styled.div`
height:90vh;
display:grid;
grid-template-columns: repeat(16, 1fr);
/* grid-template-rows: 0.23fr, 2.58fr, 0.19fr; -> causes invisible lines */
grid-template-rows: 0.3fr 2.4fr 0.3fr;
grid-template-areas:
'. . . . . . . . . . . . . . . . '
'. NewAge NewAge NewAge NewAge NewAge NewAge NewAge Article Article Article Article Article Article Article  .'
'. . . . . . . . . . . . . . . . ';


@media (max-width:768px){
    display:block;
    width:100vw;
    min-height:205vh;
}
`

const NewAge = styled.div`
grid-area:NewAge;
button{
    background-color:#F9FAFB;
    border:none;
    padding:10px 40px;
    border:1px solid blue;
}

@media (max-width:768px){
    display:block;
    width:100vw;
    padding:5px;
    min-height:95vh;
    img{
        width:95vw;
    }
}
`

const Article  = styled.div`
grid-area: Article;
/* display:grid;
grid-template-rows: repeat(1, 1fr);
gap:5px 0px; */
`

const VerticalArticles = styled.div`
display:grid;
height:55vh;
grid-template-rows: repeat(4, 1fr);
gap:0px 0px;
div{
    display: flex;
    justify-content:space-between;
    /* align-items:center; */
    gap:10px;
    border-bottom: 1px solid black;

}
@media (max-width:768px) {
    min-height:90vh;
}
`

const Footer = styled.div`
/* height:30vh; */
display:grid;
background-color:#F4F4FD;
/* horizontal */
grid-template-columns: [first] 10vw [line2] 20vw [line3] 10vw [line4] 10vw [line5] 20vw [line6] 16vw [line7] auto [end];
grid-template-rows: [row1-start] 30px [row1-end] 150px [third-line] 20px [last-line];
`

const FooterTextBox = styled.div`
margin-top:10px;
font-size: 15px;
`

const MiniMenu = styled.div`
display:flex;
flex-direction:column;
div{
    font-weight: bold;
    font-size:13px;
    margin-bottom:14px;
}
`
const Socal = styled.div`
display:flex;
flex-direction:column;
div{
    font-weight: bold;
    font-size:13px;
    margin-bottom:25px;
}
`