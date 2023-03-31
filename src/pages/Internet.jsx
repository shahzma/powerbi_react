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
import img from './top_left.png'
import Popup from 'reactjs-popup';
import Head from '../components/Head/Head';

const Internet = () => {

    const navigate = useNavigate();
    const options = [
        'one', 'two', 'three'
      ];
    const defaultOption = options[0];
    const [width, setWidth] = useState(window.innerWidth);
    const [ EmbedToken, setEmbedToken ] = useState('');
    const [ EmbedToken1, setEmbedToken1 ] = useState('');
    const [notsubmitted, setNotSubmitted] = useState(true);
    const [email,setEmail] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [msg,setMsg] = useState('')
    const [newUrl, setNewUrl ] = useState('');
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

    useEffect(()=>{
        // console.log('props=', props)
        let propsrep = 'Homepage_Platforms'
        let prop_token = window.localStorage.getItem("token")
        let pseudo_email = 'digital@redseerconsulting.com'
        console.log('pseudo_email=', pseudo_email)
    
        fetch(`${process.env.REACT_APP_API_ENDPOINT}/MSAccessToken/?rep=${propsrep}&email=${pseudo_email}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${prop_token}`
        },
        })
        .then( data => data.json())
        .then(
        data => {
            setEmbedToken(data['embed_token'])
        }
        )
        .catch( error => console.error(error))
        
        let rep2 = 'Homepage_Brands'
        fetch(`${process.env.REACT_APP_API_ENDPOINT}/MSAccessToken/?rep=${rep2}&email=${pseudo_email}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${prop_token}`
            },
            })
            .then( data => data.json())
            .then(
            data => {
                setEmbedToken1(data['embed_token'])
            }
            )
            .catch( error => console.error(error))
    },[]);

    // const changeStyle = () => {
    //     console.log("you just clicked");
      
    //     setStyle("visible");
    //   };

      let login = (e)=>{
        e.preventDefault();
        console.log('hello')
        console.log(name, phone, email, msg)
        const uploadData = new FormData();
        uploadData.append('name', name);
        uploadData.append('phone', phone);
        uploadData.append('email', email);
        uploadData.append('message', msg);
        fetch(`${process.env.REACT_APP_API_ENDPOINT}/userpopup/`, {
            method: 'POST',
            body: uploadData
            })
            .then( data => data.json())
            .then(
            data => {
                console.log(data)
            }
            )
            .catch( error => console.error(error))
            
        setNotSubmitted(false)
      }

      let inputChanged = (e) => {
        setEmail(e.target.value);
      }

  return (
    
    width>768 ?(<div className='front'>
        {/* <Head/> */}
        <FirstPage>
            <NewAge><h2>New age <span style={{'color':'blue'}}>alternative data</span><br></br>platform of choice</h2> We track 150+ business relevant KPIs of top 500 consumer internet businesses and brands in India by crunching billions of data points every day to provide accurate, granular insights. Over 200 investment funds and innovative companies rely on us to help them make better business decisions.
            <br></br><br></br>
            {/* <button onClick={()=>{navigate('/newmainpage')}}> Get Demo</button> */}
            <Popup trigger={<button className="button"> Get Demo </button>} modal>
                <FormDiv>
                <SideImg>
                    <img src = '/Images/handshake.png' alt = '' style={{'width':'20vw', 'min-height':'50vh'}}/>
                 </SideImg>
                 <InputDiv>
                 {notsubmitted?<form onSubmit={(e)=>login(e)}>
                    <h6>Find out what Benchmarks can do for you</h6>
                    <h6>To get started, fill out the form.</h6>
                    <div className="form-group" style={{"width":'26vw'}}>
                        <label></label>
                        <input type = 'text' name = 'fullname' id='fullname' placeholder='Full Name' className="form-control" value={name} onChange={(e) => {setName(e.target.value)}}/>
                        <label></label>
                        <input type = 'text' name = 'phone' id='phone' placeholder='Phone' className="form-control" value={phone} onChange={(e) => {setPhone(e.target.value)}} />
                        <label></label>
                        <input type = 'text' name = 'email' id='email' placeholder='Email' className="form-control" value={email} onChange={(e) => {setEmail(e.target.value)}}/>
                        <label></label>
                        <textarea style={{'width':'26vw', 'marginTop':'10px', 'padding':'2%'}} placeholder = '  Message' onChange={(e) => {setMsg(e.target.value)}}/>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block" style={{backgroundColor:'#55E4E3' , border:'None', 'color':'black'}} >Submit</button>
                </form>:<div style={{'marginTop':'140px'}}>
                    <h6>Thank you for contacting us.</h6>
                    <h6>Our experts will get back to you shortly.</h6>
                </div>}
                 </InputDiv>

                </FormDiv>
            </Popup>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <span><img src = '/Images/graph.png'/> <span style={{'fontSize':'18px'}}>Companies we cover</span></span>
                        <PowerBIEmbed
                        embedConfig = {{
                            type: 'report',   // Supported types: report, dashboard, tile, visual and qna
                            id: 'e1e73423-e921-4e6f-a1c6-1d78ad44303e',
                            embedUrl:'https://app.powerbi.com/reportEmbed?reportId=e1e73423-e921-4e6f-a1c6-1d78ad44303e&groupId=67294232-0c81-43c2-a16d-22544a0a390b&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLUlORElBLUNFTlRSQUwtQS1QUklNQVJZLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0IiwiZW1iZWRGZWF0dXJlcyI6eyJtb2Rlcm5FbWJlZCI6dHJ1ZSwidXNhZ2VNZXRyaWNzVk5leHQiOnRydWV9fQ%3d%3d',
                            //get from props
                            // embedUrl:'https://app.powerbi.com/view?r=eyJrIjoiM2UwNjU2MzgtZGE1Mi00YzQ3LTkxZGYtM2EwMGVjMjZjYWYwIiwidCI6IjAwYTlmZjhjLTk4MzAtNDg0Ny1hZTUxLTQ1NzllYzA5MmNiNCJ9',
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
                        }}/>
            </NewAge>
            <Article>
                <img src = '/Images/Swiggy.png' style = {{'width':'44vw', 'cursor':'pointer'}}  onClick= {()=>{window.location.href= 'https://redseer.com/newsletters/a-cup-full-of-food/'}}/>
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
                    <VerticalArticleDiv style={{'marginLeft':'5px', 'cursor':'pointer'}} onClick={()=>{window.location.href= 'https://redseer.com/newsletters/shared-mobility-in-the-post-pandemic-world/'}}>
                    <div>
                        <div style={{'color':'#25B0B0', 'fontSize':'13px'}}>Auto and Mobiltity</div> <div style={{'fontWeight':'bold'}}> Shared Mobility in the Post-Pandemic World</div> 
                        <div style={{'fontSize':'13px', 'color':'#797979', 'paddingTop':'35px'}}>Article .  April 11, 2022</div>
                    </div>
                        <div><img  style = {{'height':'105px', 'width':'190px', 'padding':'10px' , 'borderRadius':'16px'}} src = '/Images/shared_mobility.png'/></div>
                    </VerticalArticleDiv>
                    <VerticalArticleDiv style={{'marginLeft':'5px', 'cursor':'pointer'}} onClick={()=>{window.location.href= 'https://redseer.com/newsletters/how-e-commerce-made-a-comeback/'}}>
                    <div>
                        <div style={{'color':'#25B0B0', 'fontSize':'13px'}}>B2B Services</div> <div style={{'fontWeight':'bold'}}>How e-commerce made a comeback</div> 
                        <div style={{'fontSize':'13px', 'color':'#797979', 'paddingTop':'35px'}}>Article .  February 8, 2022</div>
                    </div>
                        <div><img  style = {{'height':'105px', 'width':'190px', 'padding':'10px' , 'borderRadius':'16px'}} src = '/Images/ecommerce_comeback.png'/></div>
                    </VerticalArticleDiv>
                    <VerticalArticleDiv1 style={{'marginLeft':'5px', 'cursor':'pointer'}} onClick={()=>{window.location.href= ' https://redseer.com/newsletters/inside-story-of-40000-crore-festive-season-2022/'}}>
                    <div>
                        <div style={{'color':'#25B0B0', 'fontSize':'13px'}}>Retail and Consumer goods</div> <div style={{'fontWeight':'bold'}}>Inside Story of 40,000 Crore Festive Season 2022</div>
                        <div style={{'fontSize':'13px', 'color':'#797979', 'paddingTop':'35px'}}>Article . October 26, 2022</div>
                    </div>
                        <div><img  style = {{'height':'105px', 'width':'190px', 'padding':'10px' , 'borderRadius':'16px'}} src = '/Images/40kCrore.png'/></div>
                    </VerticalArticleDiv1>
                </VerticalArticles>
                {/* <img style = {{'width':'43.2vw'}}src ='/Images/Premium.png'/> */}
                <Premium>
                    <div style={{'color':'white', 'width':'24vw', 'font':'Libre Franklin 14px'}}>Bringing the right kind of market intelligence and insights to clients. Get your premium access now.</div>
                    <div style={{'width':'10vw','paddingTop':'10px'}}><button style={{'border':'none','backgroundColor':'#55E4E4', 'width':'10vw','height':'45px'}}> Get Premium</button></div>
                </Premium>
            </Article>
        </FirstPage>
        {/* <div style={{'textAlign':'center', 'fontSize':'25px', 'fontWeight':'bold', "backgroundColor":'#1A1A58' , 'color':'white', 'height':'50px' , 'paddingTop':'15px'}}>Meaningful and granular Insights</div> */}
                <Carousel showThumbs = {false}>
                <div>
                    <img src="/Images/Carousal1.png" />
                </div>
                <div>
                    <img src="/Images/Carousal2.png" />
                </div>
                <div>
                    <img src="/Images/Carousal3.png" />
                </div>
                <div>
                    <img src="/Images/Carousal4.png" style={{'height':'73vh'}}/>
                </div>
                </Carousel>
        {/* <div style = {{'display':'flex', 'alignItems': 'center', 'justifyContent':'center', 'height':'25vh', 'fontWeight':'bold', 'flexDirection':'column', 'gap':'5vh'}}>
            Trusted by the best and brightest digital brands
            <img src = '/Images/brands.png'/>
        </div> */}
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
                    <VerticalArticleDiv style={{'marginLeft':'5px', 'cursor':'pointer'}} onClick={()=>{window.location.href= ' https://redseer.com/newsletters/value-first-egrocery-in-india-a-huge-opportunity/'}}>
                    <div>
                        <div style={{'color':'#25B0B0', 'fontSize':'13px'}}>Logisitcs and Enablers</div> <div style={{'fontWeight':'bold'}}>Value-first eGrocery in India</div> 
                        <div style={{'fontSize':'13px', 'color':'#797979', 'paddingTop':'10px'}}>Article .  October 28, 2022</div>
                    </div>
                        <div><img  style = {{'height':'105px', 'width':'190px', 'padding':'10px' , 'borderRadius':'16px'}} src = '/Images/e_grocery.png'/></div>
                    </VerticalArticleDiv>
                    <VerticalArticleDiv style={{'marginLeft':'5px', 'cursor':'pointer'}} onClick={()=>{window.location.href= ' https://redseer.com/newsletters/whats-cooking-in-foodtech-part-1-delivery/'}}>
                    <div>
                        <div style={{'color':'#25B0B0', 'fontSize':'13px'}}>Retail and Consumer Goods</div> <div style={{'fontWeight':'bold'}}>What's cooking in FoodTech: Part 1 - Delivery</div> 
                        <div style={{'fontSize':'13px', 'color':'#797979', 'paddingTop':'10px'}}>Article .  February 15, 2021</div>
                    </div>
                        <div><img  style = {{'height':'105px', 'width':'190px', 'padding':'10px' , 'borderRadius':'16px'}} src = '/Images/food_tech.png'/></div>
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
            <span><img src = '/Images/graph.png'/> <span style={{'fontSize':'18px'}}>Brands We Cover</span></span>
            <PowerBIEmbed
                        embedConfig = {{
                            type: 'report',   // Supported types: report, dashboard, tile, visual and qna
                            id: '38a0d4f0-0990-474f-8082-637329e1b623',
                            embedUrl:'https://app.powerbi.com/reportEmbed?reportId=38a0d4f0-0990-474f-8082-637329e1b623&groupId=67294232-0c81-43c2-a16d-22544a0a390b&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLUlORElBLUNFTlRSQUwtQS1QUklNQVJZLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0IiwiZW1iZWRGZWF0dXJlcyI6eyJtb2Rlcm5FbWJlZCI6dHJ1ZSwidXNhZ2VNZXRyaWNzVk5leHQiOnRydWV9fQ%3d%3d',
                            //get from props
                            // embedUrl:'https://app.powerbi.com/view?r=eyJrIjoiM2UwNjU2MzgtZGE1Mi00YzQ3LTkxZGYtM2EwMGVjMjZjYWYwIiwidCI6IjAwYTlmZjhjLTk4MzAtNDg0Ny1hZTUxLTQ1NzllYzA5MmNiNCJ9',
                            // embedUrl:newUrl,
                            accessToken: EmbedToken1,
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
        <div><img src = '/Images/Stay_updated.png'/></div>
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
                <Popup trigger={<div> Contact Us </div>} modal>
                <FormDiv>
                <SideImg>
                    <img src = '/Images/handshake.png' alt = '' style={{'width':'20vw', 'min-height':'50vh'}}/>
                 </SideImg>
                 <InputDiv>
                 {notsubmitted?<form onSubmit={(e)=>login(e)}>
                    <h6>Find out what Benchmarks can do for you</h6>
                    <h6>To get started, fill out the form.</h6>
                    <div className="form-group" style={{"width":'26vw'}}>
                        <label></label>
                        <input type = 'text' name = 'fullname' id='fullname' placeholder='Full Name' className="form-control" value={name} onChange={(e) => {setName(e.target.value)}}/>
                        <label></label>
                        <input type = 'text' name = 'phone' id='phone' placeholder='Phone' className="form-control" value={phone} onChange={(e) => {setPhone(e.target.value)}} />
                        <label></label>
                        <input type = 'text' name = 'email' id='email' placeholder='Email' className="form-control" value={email} onChange={(e) => {setEmail(e.target.value)}}/>
                        <label></label>
                        <textarea style={{'width':'26vw', 'marginTop':'10px', 'padding':'2%'}} placeholder = '  Message' onChange={(e) => {setMsg(e.target.value)}}/>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block" style={{backgroundColor:'#55E4E3' , border:'None', 'color':'black'}} >Submit</button>
                </form>:<div style={{'marginTop':'140px'}}>
                    <h6>Thank you for contacting us.</h6>
                    <h6>Our experts will get back to you shortly.</h6>
                </div>}
                 </InputDiv>
                </FormDiv>
            </Popup>
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
    </div>):(
        <div className='front'>
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
        </div>
    )
  )
}

export default Internet

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

const FormDiv = styled.div`
background-color:#F9FAFB;
min-height:50vh;
width:55vw;
display:flex;
`

const SideImg = styled.div`
width:44%;
overflow:hidden;
`

const InputDiv = styled.div`
padding-bottom:5%;
padding-top:5%;
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
margin-top:4vh;
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
min-height:90vh;
display:grid;
grid-template-columns: repeat(16, 1fr);
/* grid-template-rows: 0.23fr, 2.58fr, 0.19fr; -> causes invisible lines */
grid-template-rows: 0.3fr 2.4fr 0fr;
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
// const TopRight = styled.div`
// background-image:url(${img});
// `

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
min-height:55vh;
grid-template-rows: repeat(4, 1fr);
gap:0px 0px;
@media (max-width:768px) {
    min-height:90vh;
}
`
const Premium  = styled.div`
padding:4%;
display:flex;
background-color:#1A1A56;
gap:50px;
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