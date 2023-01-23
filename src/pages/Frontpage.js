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
import { BsTag } from "react-icons/bs";
import { MdHouseSiding , MdOutlineCasino} from "react-icons/md";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { GiHealthNormal } from "react-icons/gi";
import { TbBooks } from "react-icons/tb";

const Frontpage = () => {

    const navigate = useNavigate();
    const options = [
        'one', 'two', 'three'
      ];
    const defaultOption = options[0];
    const [width, setWidth] = useState(window.innerWidth);
    const [ EmbedToken, setEmbedToken ] = useState('');
    const [ newUrl, setNewUrl ] = useState('');
    const [style, setStyle] = useState("invisible");

    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
    }

    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    const changeStyle = () => {
        console.log("you just clicked");
      
        setStyle("visible");
      };
  return (
    
    width>768 ?(<>
        <PageHeader>
                <div><img src = '/Images/benchmark_logo.png' alt = ''/></div>
                <ProductDiv>
                Products
                {/* <div onClick={changeStyle} className={style}>
                    <div className='overview'>
                        <h5>Products</h5>
                        <div>Hello My</div>
                    </div>
                    <div className='types'>
                        World
                    </div>
                </div> */}
                <DropDiv>
                    <OverViewDiv onClick={()=>{navigate('/newmainpage')}}>
                    <div className = 'ProductsText'>Products</div>
                    <div className='ProductsTextBottom'>Hello World Hello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello </div>
                    <button className='OverViewButton'>OverView</button>
                    </OverViewDiv>
                    <TypesDiv>
                        <Brands onClick={()=>{
                            navigate('/newmainpage')
                        }}>
                            <div className = 'Browse'>
                                Browse by Type
                            </div>
                            <h6><BsTag style={{'color':'#15BEBE'}}/> Brands</h6>
                            <div className='Browse'>Lorem Ipsum Lorem IpsumLorem IpsumLorem IpsumLorem Ipsum</div>
                        </Brands>
                        <Sector onClick={()=>{navigate('/newmainpage')}}>
                            <div className='Browse'>Browse by Sector</div>
                            <h6><MdOutlineCasino style={{'color':'#15BEBE'}}/> RMG</h6>
                            <div className='Browse'>Lorem Ipsum Lorem IpsumLorem IpsumLorem IpsumLorem Ipsum</div>
                        </Sector>
                        <HealthCare onClick={()=>{navigate('/newmainpage')}}>
                            <br/>
                            <h6><GiHealthNormal style={{'color':'#15BEBE'}}/> E-Health</h6>
                            <div className='Browse'>Lorem Ipsum Lorem IpsumLorem IpsumLorem IpsumLorem Ipsum</div>
                        </HealthCare>
                        <Company onClick={()=>{navigate('/newmainpage')}}>
                            <h6><MdHouseSiding style={{'color':'#15BEBE'}}/> Company</h6>
                            <div className='Browse'>Lorem Ipsum Lorem IpsumLorem IpsumLorem IpsumLorem Ipsum</div>
                        </Company>
                        <OnlineRetail onClick={()=>{navigate('/newmainpage')}}><h6> <AiOutlineShoppingCart style={{'color':'#15BEBE'}}/> OnlineRetail</h6>
                            <div className='Browse'>Lorem Ipsum Lorem IpsumLorem IpsumLorem IpsumLorem Ipsum</div></OnlineRetail>
                        <EdTech onClick={()=>{navigate('/newmainpage')}}>
                            <h6><TbBooks style={{'color':'#15BEBE'}}/> EdTech</h6>
                            <div className='Browse'>Lorem Ipsum Lorem IpsumLorem IpsumLorem IpsumLorem Ipsum</div>
                            <div style={{'marginTop':'10px', 'marginLeft':'210px'}}><a style={{"text-decoration":"none", "fontSize":"12px"}}href="/newmainpage">Show More</a></div>
                        </EdTech>
                    </TypesDiv>
                    <ViewDiv>
                        {/* <a style={{"text-decoration":"none"}}href="/newmainpage">Show More</a> */}
                    </ViewDiv>
                </DropDiv>
              </ProductDiv>
                <div>Articles</div><SignInDiv><button style ={{'border':'1px solid #15BEBE', 'backgroundColor':'white', 'width':'120px', 'height':'30px'}} onClick={()=>{navigate('/signin')}}>Login</button></SignInDiv>
        </PageHeader>
        <FirstPage>
            <NewAge><h2>New age <span style={{'color':'blue'}}>alternative data</span><br></br>platform of choice</h2> We track 150+ business relevant KPIs of top 500 consumer internet businesses and brands in India by crunching billions of data points every day to provide accurate, granular insights. Over 200 investment funds and innovative companies rely on us to help them make better business decisions.
            <br></br><br></br><button onClick={()=>{navigate('/newmainpage')}}> Get Demo</button>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <span><img src = '/Images/graph.png'/> <span style={{'fontSize':'18px'}}>Companies we cover</span></span>
                        <PowerBIEmbed
                        embedConfig = {{
                            type: 'report',   // Supported types: report, dashboard, tile, visual and qna
                            id: 'reportId',
                            //get from props
                            embedUrl:'https://app.powerbi.com/view?r=eyJrIjoiNmFjOTNlYmQtOTQxNi00MmNkLTk0N2UtMWIyNDY5ZjVkNzE3IiwidCI6IjAwYTlmZjhjLTk4MzAtNDg0Ny1hZTUxLTQ1NzllYzA5MmNiNCJ9',
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
                <img src = '/Images/Swiggy.png' style = {{'width':'44vw'}}  />
                <VerticalArticles>
                    <VerticalArticleDiv style={{'marginLeft':'5px', 'cursor':'pointer'}} onClick={()=>{window.location.href= 'https://redseer.com/newsletters/700-mn-indian-digital-consumer-funnel/'}}   > 
                        <div>
                            <div style={{'color':'#25B0B0', 'fontSize':'13px'}}>Emerging Tech</div>
                            <div style={{'fontWeight':'bold'}}>700 Mn+ Indian Digital Consumer Funnel</div>
                            <div style={{'fontSize':'13px', 'color':'#797979', 'paddingTop':'35px'}}>Article . January 6, 2023</div>
                        </div>
                        <div>
                            <img style = {{'height':'105px', 'width':'190px', 'padding':'10px' , 'borderRadius':'16px'}} src = '/Images/funnel.png'/>
                        </div>
                    </VerticalArticleDiv>
                    <VerticalArticleDiv style={{'marginLeft':'5px', 'cursor':'pointer'}} onClick={()=>{window.location.href= ' https://redseer.com/newsletters/looking-back-at-indias-internet-economy-in-2022/'}}>
                    <div>
                        <div style={{'color':'#25B0B0', 'fontSize':'13px'}}>Emerging Tech</div> <div style={{'fontWeight':'bold'}}>Looking Back at India's Internet Economy in 2022</div>
                        <div style={{'fontSize':'13px', 'color':'#797979', 'paddingTop':'35px'}}>Article .  January 2, 2023</div>
                        </div>
                        <div><img  style = {{'height':'105px', 'width':'190px', 'padding':'10px', 'borderRadius':'16px'}} src = '/Images/InternetEconomy.png'/></div>
                    </VerticalArticleDiv>
                    <VerticalArticleDiv style={{'marginLeft':'5px', 'cursor':'pointer'}} onClick={()=>{window.location.href= 'https://redseer.com/newsletters/digital-native-brands-transforming-retail-landscape/'}}>
                    <div>
                        <div style={{'color':'#25B0B0', 'fontSize':'13px'}}>B2B Services</div> <div style={{'fontWeight':'bold'}}>Digital Native Brands - Transforming Retail Landscape</div> 
                        <div style={{'fontSize':'13px', 'color':'#797979', 'paddingTop':'35px'}}>Article .  December 2, 2022</div>
                    </div>
                        <div><img  style = {{'height':'105px', 'width':'190px', 'padding':'10px' , 'borderRadius':'16px'}} src = '/Images/nativeBrands.png'/></div>
                    </VerticalArticleDiv>
                    <VerticalArticleDiv1 style={{'marginLeft':'5px', 'cursor':'pointer'}} onClick={()=>{window.location.href= ' https://redseer.com/newsletters/inside-story-of-40000-crore-festive-season-2022/'}}>
                    <div>
                        <div style={{'color':'#25B0B0', 'fontSize':'13px'}}>Retail and Consumer goods</div> <div style={{'fontWeight':'bold'}}>Inside Story of 40,000 Crore Festive Season 2022</div>
                        <div style={{'fontSize':'13px', 'color':'#797979', 'paddingTop':'35px'}}>Article . October 26, 2022</div>
                    </div>
                        <div><img  style = {{'height':'105px', 'width':'190px', 'padding':'10px' , 'borderRadius':'16px'}} src = '/Images/40kCrore.png'/></div>
                    </VerticalArticleDiv1>
                </VerticalArticles>
                <img style = {{'width':'43.2vw'}}src ='/Images/Premium.png'/>
            </Article>
        </FirstPage>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <div style={{'textAlign':'center', 'fontSize':'25px', 'fontWeight':'bold', "backgroundColor":'#1A1A58' , 'color':'white', 'height':'50px' , 'paddingTop':'15px'}}>Meaningful and granular Insights</div>
                <Carousel showThumbs = {false}>
                <div>
                    <img src="/Images/RadarNew.png" />
                </div>
                <div>
                    <img src="/Images/GOVNew.png" />
                </div>
                <div>
                    <img src="/Images/GOVPay.png" />
                </div>
                <div>
                    <img src="/Images/IndiaNew.png" />
                </div>
                </Carousel>
        <div style = {{'display':'flex', 'alignItems': 'center', 'justifyContent':'center', 'height':'25vh', 'fontWeight':'bold', 'flexDirection':'column', 'gap':'5vh'}}>
            Trusted by the best and brightest digital brands
            <img src = '/Images/brands.png'/>
        </div>
        <ProductGridContainer>
            <ArticleProduct>
            <VerticalArticleDiv style={{'marginLeft':'5px', 'cursor':'pointer'}} onClick={()=>{window.location.href= 'https://redseer.com/newsletters/online-festive-sales-the-biggest-gmv-churner-of-e-tailing-industry/'}}   > 
                        <div>
                            <div style={{'color':'#25B0B0', 'fontSize':'13px'}}>Retail and Consumer Goods</div>
                            <div style={{'fontWeight':'bold'}}>The Biggest GMV Churner of E-Tailing industry</div>
                            <div style={{'fontSize':'13px', 'color':'#797979', 'paddingTop':'35px'}}>Article . September 15, 2022</div>
                        </div>
                        <div>
                            <img style = {{'height':'105px', 'width':'190px', 'padding':'10px' , 'borderRadius':'16px'}} src = '/Images/ConsumerGoods.png'/>
                        </div>
                    </VerticalArticleDiv>
                    <VerticalArticleDiv style={{'marginLeft':'5px', 'cursor':'pointer'}} onClick={()=>{window.location.href= 'https://redseer.com/newsletters/supercharging-20-of-indias-gdp-with-a-digital-touch/'}}>
                    <div>
                        <div style={{'color':'#25B0B0', 'fontSize':'13px'}}>Agriculture</div> <div style={{'fontWeight':'bold'}}>Supercharging 20% Of India's GDP With A Digital Touch</div>
                        <div style={{'fontSize':'13px', 'color':'#797979', 'paddingTop':'10px'}}>Article .  October 13, 2022</div>
                        </div>
                        <div><img  style = {{'height':'105px', 'width':'190px', 'padding':'10px', 'borderRadius':'16px'}} src = '/Images/Agriculture.png'/></div>
                    </VerticalArticleDiv>
                    <VerticalArticleDiv style={{'marginLeft':'5px', 'cursor':'pointer'}} onClick={()=>{window.location.href= 'https://redseer.com/newsletters/galvanized-by-ecommerce-indias-ecommerce-logistics-sector-scaling-new-heights/'}}>
                    <div>
                        <div style={{'color':'#25B0B0', 'fontSize':'13px'}}>Logisitcs and Enablers</div> <div style={{'fontWeight':'bold'}}>Galvanized by eCommerce, Logistics Sector is Scaling New Heights!</div> 
                        <div style={{'fontSize':'13px', 'color':'#797979', 'paddingTop':'10px'}}>Article .  October 28, 2022</div>
                    </div>
                        <div><img  style = {{'height':'105px', 'width':'190px', 'padding':'10px' , 'borderRadius':'16px'}} src = '/Images/elogistics.png'/></div>
                    </VerticalArticleDiv>
                    <VerticalArticleDiv1 style={{'marginLeft':'5px', 'cursor':'pointer'}} onClick={()=>{window.location.href= ' https://redseer.com/newsletters/inside-story-of-40000-crore-festive-season-2022/'}}>
                    <div>
                        <div style={{'color':'#25B0B0', 'fontSize':'13px'}}>Emerging Tech</div> <div style={{'fontWeight':'bold'}}>Unlocking the Digital Potential of Traditional Brands</div>
                        <div style={{'fontSize':'13px', 'color':'#797979', 'paddingTop':'10px'}}>Article . January 20, 2023</div>
                    </div>
                        <div><img  style = {{'height':'105px', 'width':'190px', 'padding':'10px' , 'borderRadius':'16px'}} src = '/Images/EmergingTech.png'/></div>
                    </VerticalArticleDiv1>
            </ArticleProduct>
            <Graph>
                <br/>
            <span><img src = '/Images/graph.png'/> <span style={{'fontSize':'18px'}}>Brands We Cover</span></span>
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
        </ProductGridContainer>
        <img src = '/Images/Stay_updated.png'/>
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
gap:20vw;
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
/* display: grid !important;
        grid-auto-rows: 1fr; 
        grid-template-columns: 0.25fr 1.05fr 2.45fr 0.25fr; 
        grid-template-rows: 0.2fr 2.6fr 0.2fr; 
        gap: 0px 0px; 
        grid-template-areas: 
            ". . . ."
            ". Products Types ."
            ". . . View";  */
position:absolute;
top:10vh;
right:1px;
left:1px;
background-color:#FFFFFF;
border:1px solid aquamarine;
border-radius: 0 0 5px 5px;
width:100vw;
height: 32.5vh;
font-size:16px;
/* transition-duration:160ms; */
/* text-align:center; */
&:hover{
  background-color: #ddd;
}
`

const OverViewDiv = styled.div`
grid-area: Products;
background-color:#EBF1F4;
border-radius:10px;
padding:30px;
`
const TypesDiv = styled.div`
grid-area:Types;
margin-left:30px;
display: grid; 
grid-auto-rows: 1fr; 
grid-template-columns: 1fr 1fr 1fr; 
grid-template-rows: 1fr 1fr; 
gap: 10px 10px; 
grid-template-areas: 
"Brands Sector HealthCare"
"Company OnlineRetail EdTech"; 
`
const ViewDiv = styled.div`
grid-area:View;
text-align:right;
font-size:12px;
`

const Brands = styled.div`
`
const Sector = styled.div``
const HealthCare = styled.div``
const Company = styled.div``
const OnlineRetail = styled.div``
const EdTech = styled.div``

const ProductDiv = styled.div`
height:10vh;
padding-top:3.5vh;
cursor:pointer;

&:hover{
    text-decoration:underline;
    text-decoration-color: #0000FF;
    text-underline-offset: 8px;
    ${DropDiv}{
        display: grid !important;
        grid-auto-rows: 1fr; 
        grid-template-columns: 0.25fr 1.05fr 2.45fr 0.25fr; 
        grid-template-rows: 0.2fr 2.6fr 0.2fr; 
        gap: 0px 0px; 
        grid-template-areas: 
            ". . . ."
            ". Products Types ."
            ". . View ."; 
        background-color:#FFFFFF;
    }
    /* ${OverViewDiv}{
        grid-area: Products;
    }
    ${TypesDiv}{
        grid-area:Types;
    } */
  }
`
const ProductGridContainer = styled.div`
display: grid; 
  grid-auto-rows: 1fr; 
  grid-template-columns: 0.5fr 2.5fr 0.1fr 1.4fr 0.5fr; 
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
margin-top:3vh;
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
padding-top:40px;
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
    border-bottom: 1px solid #BCBCBC;
`

const VerticalArticleDiv1 = styled.div`
display: flex;
    justify-content:space-between;
    gap:10px;
    border-bottom: 0px solid #BCBCBC;
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