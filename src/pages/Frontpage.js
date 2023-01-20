import React from 'react'
import styled from 'styled-components'
import { useState, useEffect } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import {PowerBIEmbed} from 'powerbi-client-react';
import {models} from 'powerbi-client';
import {Navigate} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import './FrontPage.css';


const Frontpage = () => {

    const navigate = useNavigate();
    const options = [
        'one', 'two', 'three'
      ];
    const defaultOption = options[0];
    const [width, setWidth] = useState(window.innerWidth);
    const [ EmbedToken, setEmbedToken ] = useState('');
    const [ newUrl, setNewUrl ] = useState('');

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
                <div><img src = '/Images/benchmark_logo.png' alt = ''/></div>
                <ProductDiv>
                Products
                <DropDiv>
                    <OverViewDiv>
                    <h5>Products</h5>
                    <div>Hello World</div>
                    </OverViewDiv>
                    <TypesDiv>World</TypesDiv>
                </DropDiv>
              </ProductDiv>
                <div>Articles</div><SignInDiv><a href='/signin'>Login</a></SignInDiv>
        </PageHeader>
        <FirstPage>
            <NewAge><h2>New Age <span style={{'color':'blue'}}>Market Intelligence</span><br></br>Platform of choice</h2> Benchmarks is an on - demand business intelligence platform that tracks 150+
                        business relevant KPIs, monthly across 1000+ companies, providing vast
                        market insights and competitive edge in a fraction of time.<br></br><br></br><button> Get Started</button>
                        <br/>
                        <br/>
                        <br/>
                        <PowerBIEmbed
                  embedConfig = {{
                    type: 'report',   // Supported types: report, dashboard, tile, visual and qna
                    id: 'reportId',
                    //get from props
                    embedUrl:'https://app.powerbi.com/view?r=eyJrIjoiM2UwNjU2MzgtZGE1Mi00YzQ3LTkxZGYtM2EwMGVjMjZjYWYwIiwidCI6IjAwYTlmZjhjLTk4MzAtNDg0Ny1hZTUxLTQ1NzllYzA5MmNiNCJ9',
                    // embedUrl:newUrl,
                    accessToken: EmbedToken,
                    tokenType: models.TokenType.Embed,
                    // filters: [datefilter],
                    settings: {
                      panes: {
                        filters: {
                          expanded: false,
                          visible: false,
                        },
                      },
                      navContentPaneEnabled:false
                    }
                  }}
                  eventHandlers = {
                    new Map([
                      ['loaded', function (event, report) {
                        console.log('loaded')
                      }],
                      ['rendered', function () {
                        console.log('render')
                      }],
                      ['buttonClicked', function(event, report){
                        console.log('buttonclick')
                      }],
                      ['error', function (event) {console.log('powerbi_error=',event.detail);}]
                    ])
                  }
                  cssClassName = { "report-style-class" }
                  getEmbeddedComponent = {async(embeddedReport) => {
                    window.report = embeddedReport ;
                  }
                  
                                }
                      />
            </NewAge>
            <Article>
                {/* <div><img src = '/Images/top_left.png'/></div> */}
                <img src = '/Images/top_left.png' style = {{'width':'44vw'}}  />
                <VerticalArticles>
                    <VerticalArticleDiv style={{'marginLeft':'5px', 'cursor':'pointer'}} onClick={()=>{window.location.href= 'https://redseer.com/newsletters/700-mn-indian-digital-consumer-funnel/'}}   > 
                        <div><div style={{'color':'#25B0B0', 'fontSize':'13px'}}>Emerging Tech</div><div style={{'fontWeight':'bold'}}>700 Mn+ Indian Digital Consumer Funnel</div></div>
                        <div><img style = {{'height':'105px', 'width':'190px', 'padding':'10px'}} src = '/Images/funnel.png'/></div>
                    </VerticalArticleDiv>
                    <VerticalArticleDiv style={{'marginLeft':'5px', 'cursor':'pointer'}} onClick={()=>{window.location.href= ' https://redseer.com/newsletters/looking-back-at-indias-internet-economy-in-2022/'}}>
                    <div><div style={{'color':'#25B0B0', 'fontSize':'13px'}}>Emerging Tech</div> <div style={{'fontWeight':'bold'}}>Looking Back at India's Internet Economy in 2022</div></div>
                        <div><img  style = {{'height':'105px', 'width':'190px', 'padding':'10px'}} src = '/Images/InternetEconomy.png'/></div>
                    </VerticalArticleDiv>
                    <VerticalArticleDiv style={{'marginLeft':'5px', 'cursor':'pointer'}} onClick={()=>{window.location.href= 'https://redseer.com/newsletters/digital-native-brands-transforming-retail-landscape/'}}>
                    <div><div style={{'color':'#25B0B0', 'fontSize':'13px'}}>B2B Services</div> <div style={{'fontWeight':'bold'}}>Digital Native Brands - Transforming Retail Landscape</div> </div>
                        <div><img  style = {{'height':'105px', 'width':'190px', 'padding':'10px'}} src = '/Images/nativeBrands.png'/></div>
                    </VerticalArticleDiv>
                    <VerticalArticleDiv style={{'marginLeft':'5px', 'cursor':'pointer'}} onClick={()=>{window.location.href= ' https://redseer.com/newsletters/inside-story-of-40000-crore-festive-season-2022/'}}>
                    <div><div style={{'color':'#25B0B0', 'fontSize':'13px'}}>Retail and Consumer goods</div> <div style={{'fontWeight':'bold'}}>Inside Story of 40,000 Crore Festive Season 2022</div></div>
                        <div><img  style = {{'height':'105px', 'width':'190px', 'padding':'10px'}} src = '/Images/40kCrore.png'/></div>
                    </VerticalArticleDiv>
                </VerticalArticles>
            </Article>
        </FirstPage>
                <Carousel>
                <div>
                    <img src="/Images/top_company.png" />
                    <p className="legend"></p>
                </div>
                <div>
                    <img src="/Images/top_company.png" />
                    <p className="legend"></p>
                </div>
                <div>
                    <img src="/Images/top_company.png" />
                    <p className="legend"></p>
                </div>
                </Carousel>
        <div style = {{'display':'flex', 'alignItems': 'center', 'justifyContent':'center', 'height':'25vh', 'fontWeight':'bold', 'flexDirection':'column', 'gap':'5vh'}}>
            Trusted by the best and brightest digital brands
            <img src = '/Images/brands.png'/>
        </div>
        {/* <ProductGridContainer>
            <ArticleProduct>
                <VerticalArticleDiv style={{'marginLeft':'5px', 'cursor':'pointer'}} onClick={()=>{window.location.href= 'https://redseer.com/newsletters/700-mn-indian-digital-consumer-funnel/'}}   > 
                    <div><div style={{'color':'#25B0B0', 'fontSize':'13px'}}>Emerging Tech</div><div style={{'fontWeight':'bold'}}>700 Mn+ Indian Digital Consumer Funnel</div></div>
                    <div><img style = {{'height':'105px', 'width':'190px', 'padding':'10px'}} src = '/Images/funnel.png'/></div>
                </VerticalArticleDiv>
                <VerticalArticleDiv style={{'marginLeft':'5px', 'cursor':'pointer'}} onClick={()=>{window.location.href= ' https://redseer.com/newsletters/looking-back-at-indias-internet-economy-in-2022/'}}>
                <div><div style={{'color':'#25B0B0', 'fontSize':'13px'}}>Emerging Tech</div> <div style={{'fontWeight':'bold'}}>Looking Back at India's Internet Economy in 2022</div></div>
                    <div><img  style = {{'height':'105px', 'width':'190px', 'padding':'10px'}} src = '/Images/InternetEconomy.png'/></div>
                </VerticalArticleDiv>
                <VerticalArticleDiv style={{'marginLeft':'5px', 'cursor':'pointer'}} onClick={()=>{window.location.href= 'https://redseer.com/newsletters/digital-native-brands-transforming-retail-landscape/'}}>
                <div><div style={{'color':'#25B0B0', 'fontSize':'13px'}}>B2B Services</div> <div style={{'fontWeight':'bold'}}>Digital Native Brands - Transforming Retail Landscape</div> </div>
                    <div><img  style = {{'height':'105px', 'width':'190px', 'padding':'10px'}} src = '/Images/nativeBrands.png'/></div>
                </VerticalArticleDiv>
                <VerticalArticleDiv style={{'marginLeft':'5px', 'cursor':'pointer'}} onClick={()=>{window.location.href= ' https://redseer.com/newsletters/inside-story-of-40000-crore-festive-season-2022/'}}>
                <div><div style={{'color':'#25B0B0', 'fontSize':'13px'}}>Retail and Consumer goods</div> <div style={{'fontWeight':'bold'}}>Inside Story of 40,000 Crore Festive Season 2022</div></div>
                    <div><img  style = {{'height':'105px', 'width':'190px', 'padding':'10px'}} src = '/Images/40kCrore.png'/></div>
                </VerticalArticleDiv>
            </ArticleProduct><Graph>
            <PowerBIEmbed
                  embedConfig = {{
                    type: 'report',   // Supported types: report, dashboard, tile, visual and qna
                    id: 'reportId',
                    //get from props
                    embedUrl:'https://app.powerbi.com/view?r=eyJrIjoiM2UwNjU2MzgtZGE1Mi00YzQ3LTkxZGYtM2EwMGVjMjZjYWYwIiwidCI6IjAwYTlmZjhjLTk4MzAtNDg0Ny1hZTUxLTQ1NzllYzA5MmNiNCJ9',
                    // embedUrl:newUrl,
                    accessToken: EmbedToken,
                    tokenType: models.TokenType.Embed,
                    // filters: [datefilter],
                    settings: {
                      panes: {
                        filters: {
                          expanded: false,
                          visible: false,
                        },
                      },
                      navContentPaneEnabled:false
                    }
                  }}
                  eventHandlers = {
                    new Map([
                      ['loaded', function (event, report) {
                        console.log('loaded')
                      }],
                      ['rendered', function () {
                        console.log('render')
                      }],
                      ['buttonClicked', function(event, report){
                        console.log('buttonclick')
                      }],
                      ['error', function (event) {console.log('powerbi_error=',event.detail);}]
                    ])
                  }
                  cssClassName = { "report-style-classProduct" }
                  getEmbeddedComponent = {async(embeddedReport) => {
                    window.report = embeddedReport ;
                  }
                  
                                }
                      />
            </Graph>
        </ProductGridContainer> */}
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
gap:22vw;
/* div{
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
} */
`

const SignInDiv = styled.div`
color:blue;
`

const DropDiv = styled.div`
display:none;
position:absolute;
top:10vh;
right:1px;
left:1px;
background:#FFFFFF;
border:1px solid aquamarine;
border-radius: 0 0 5px 5px;
width:100vw;
height: 24vh;
font-size:16px;
/* transition-duration:160ms; */
text-align:center;
&:hover{
  background-color: #ddd;
}
`

const OverViewDiv = styled.div``
const TypesDiv = styled.div``
const ProductDiv = styled.div`
&:hover{
    ${DropDiv}{
        display: grid !important;
        grid-auto-rows: 1fr; 
        grid-template-columns: 0.3fr 1fr 2.4fr 0.3fr; 
        grid-template-rows: 0.2fr 2.6fr 0.2fr; 
        gap: 0px 0px; 
        grid-template-areas: 
            ". . . ."
            ". Products Types ."
            ". . . ."; 
            
    }
    ${OverViewDiv}{
        grid-area: Products;
    }
    ${TypesDiv}{
        grid-area:Types;
    }
  }
`
const ProductGridContainer = styled.div`
display: grid; 
  grid-auto-rows: 1fr; 
  grid-template-columns: 0.5fr 1.8fr 0.56fr 1.64fr 0.5fr; 
  grid-template-rows: 0.3fr 2.4fr 0.3fr; 
  gap: 0px 0px; 
  grid-template-areas: 
    ". . . . ."
    ". ArticleProduct . Graph ."
    ". . . . ."; 
`

const ArticleProduct = styled.div`
grid-area: ArticleProduct;
display:grid;
height:55vh;
grid-template-rows: repeat(4, 1fr);
gap:0px 0px;
`
const Graph = styled.div`
grid-area: Graph;

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
    background-color:#55E4E4;
    border:none;
    padding:10px 40px;
    border:none;
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
@media (max-width:768px) {
    min-height:90vh;
}
`

const VerticalArticleDiv = styled.div`
    display: flex;
    justify-content:space-between;
    /* align-items:center; */
    gap:10px;
    border-bottom: 1px solid black;
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