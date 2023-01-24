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
            <br></br><br></br>
            {/* <button onClick={()=>{navigate('/newmainpage')}}> Get Demo</button> */}
            <Popup trigger={<button className="button"> Get Demo </button>} modal>
                <FormDiv>
                <form>
                <label for="fname">First Name</label>
                <input type="text" id="fname" name="firstname" placeholder="Your name.."/>
                <label for="email">Email</label>
                <input type="text" id="lname" name="lastname" placeholder="Your email.."/>
                </form>
                <input type="submit" value="Submit"></input>
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
                            accessToken: 'H4sIAAAAAAAEACWWxa7FDI6E3-XfpqUwtdSLMPMJ7sLMnNG8-9xR7y3L_qps1f_8Y6fvMKfFP__-Z2vyp12WQ2b92JlpiJ6fjjzKp8aTSwCGcvxZ26j3YbxvPGMflbUGGGHjiaPjLGZP2yVNzGs3mlg43GHOo0XPzEZLhH7X4KKgELBd1npqdafEo3fP9HOIBOdZstulVXgGq5WkPtgrTge0eRg-r5G7yNXPvU4XMCAg4yxwFZNL16dZILv5g5PCcBYwPflgpLFqNjSg9MI-AzyhPAnZ4pVwBA9NmdMGwnRkmwPm4l4lqV4gLLC7jGn3zvt4RDMYEaq0JCzXtTBrlkYM31YaNrG_KTd6HQIBKdJL-GX6PdSVdMEzVIzRXJn-6hSGXNneBSIZ6a1whYlYh54MhtSF8gvP_HyNPtLTI-qjRiHKpb9N4qPqYlUzn4mQs8zCms4B6O6AoDtUy4MqaVaEM993YHbVFbwpAdLjrZnM8cU_-SoaSWw4GPe5IvbmalstVJ8rg_2iFG7pUottB5uf8Oc7YKGJdWMouSo3TMygSe92pKyTTRw9S5l8rcp8EtSJQL8U9_4ET0c96fWFTsewcuyuE2ujjb9R33QWbyqlbtOI0bD4Tv73dQXgAnr1ki4Gs4Y9RJzejqby4gmDNaNa-uL7FvswhKU7lw87BtsXloKLEEM6GVI0WUFvcapuxrbcc2V0WRM5mlzAX4mNUKy7fAIIBwjJI_Hg0XaObB4HU_th9SCRfb6UHu1hg0LhdW8rosuJCs6PS4IUbqQn5wLp5JiMyNdLHp2-Y5SIsJwiM6E-ZO_eAUCAPCLnfk2Q55CXsDa_FbIvmzWDx6ry-UK9rIYGgnK_LAvLkAmZ8hmJwO3Tb_djgX5thWOl_druSbvjwM04o-GDK7ODorNZC24eghTTuzuNIj0kZT4OoRm1jyfUng1jeR13qzK9AZY0BhFdJTVBI3ynApz1EzvTeUNflc7qRkkqd7R9QZCOsVwdTwe6XO4QE_vtdCY2E6PeL9VPrwTXrrBu1S2Tr4rtpR1FFdT5nR0O_zgqIpEmdz3iO4iqvDASWP8jPe_SejFzq9KNWcK47Gbf3tPtSfcrMvgIjw7K09wjhXswzkPq25l4Selyo7ja6j73LYeuagZZ3Xbn1NdaqXCK61utPO7R2rj31OTbl_xKtSdUa8xEP3ra6zVFnzq4gh7uxpXjALFZUcvGnrecGTAtWJY15Rdo7p-7VRh4LUhunDePvrI_rJq5Dd0IWqq1_s4kssLOwt72vSHpSNVUkOPHJ4fBxeKg7YJo8mwguuzdx0gKPKmlBDcYZsui0oH11bsMpWUB9OtiR2zu11xnxVLQkKzrCLCsfG9iwAC3NQZr5XT4NGZSax4WTvg-09q1CGiYPbxqtg5ITq_NlgSh02cAFYhh5IqOIjaGPHPKJ4GcYV9P3VOweoj1PSM_As9U5vM0K5sEQnu7aj6B9nvwiYGQdRZJ_YnVu6S8eZ5IEjchPYaw2vHIMJ5kOlEDaUThrlZk0zgZlq06feA8PwyOoxykDeg55KiL5pTQ32fzT6T3po__2c4d-LN1DBA5v5hcswq6vHZxzi3PtpJYo0kEOPDHblxEO01RQI5GG6Hj5qfodUlJ40qYjhdC0QYhW0PGt3on4FA82qYm2CuC85qhF6n2VYWUGQq-XHvgd7Me8kRy3y-wx0hPFUFGhe75mtGJDfrEhffY4uS7BY74q50NgHeq9Jp5PsA2yAEvvwSZ2Z9-DbVdLoG8O5cLqF_VgF9_069LT3_IWW4Xeqddg5CRWW5nzc3KSkp0HMHhNVDzA6O-TvcnGoNHANYkJGtpqLS2ruIevUieGFj6bnR9BpJUqqgG9JBrPM2xY0oiH_VDLwOzrzTNl1Dt8j113BODObETEQJiuyCnS1hgOACdgxz9YgDeOoCVeQ4_02CM-JLxHBxcowVZUL6Gtr32CgWjyFf9LIQmm0ehHmKGtoNYVTaYIe_g2x9oQJ1kKVYs505dVxaCSegEKnXepLa9C56BuZeIIJiLFk7uDhOJkuMexP7cZK2NVdRvKqqqPI1h2HDnRD2w4OSomSXL9fu9YBMDGFfNEKMvnUDu5rXP-yOOLU0YV1-N8NiB9r5NlhM8Vrfg7tO0oKSQzGKjDTpKR1hgoBjndRu2uuA1qdbTZ0zQHWQviNdfqBIaHBff5-8lgFqQQSVDp9Cm9wVm5vDFKGpxXI8mkwnuhI_bOqlsVLKMVkgxw23RfrTLdir2-1Q5Q09Eek-hQuvD-MpTbVhGn0e1QZDBM-D1wByvnKfd_ST3h2UfCO9OIS_RNfFbePKnZ-9yBdjPhAZK47rrCdDCcFGnfhZVPN1m7tCGFf91ooG5OuBoIy9u9PkGNi1ZCdE_RNjQhmBeTTNM14hwHLTHHDx_lgwGwWpiyqz1u956TeYw4dvoQRWJ6Cw4tGZTEHxWWVrPK_3A73_Tr-oNB3kB-8CRDOjrjUTPKwOm5PDrqc0gH6B_W4382BuKew5skzUcb--kYW6RgTZeam_RUqG97IeMkLk59BSuaExg9Sbe8YBY3UQkhPxn4l1rIV0yDDvbjNEFZLvIM5lPWTfzn__8869_uO1djlkr37-Y52TBb2FhuufyZp4kx7aa6u9pBrZWpnqIY7ZTcHWIaaD9nPfJ932qSks7MfX24sBRB0fXzYEeGPJ7P7N6hPgb6uFgUZ9sHw-X-yQEqhhN1zSc8hr07U_iJTPzw8J1zM6T_9QjC9sJLLIhmhQ3xWpxJD0HwVp_ZjUd-hKwgwMxI1ld_LJz2_Za8htYlL-1NLzDAK3ME5fbshPjOHiVZ9ir2aFDyPGX_ssriKE6wmJr8R80xH6HPqSCIcAoxB8xPk9w24EuzHY5o-Dkghqvirjodx1sCBLV703P2wvHN7u4Nizw3wXK8r00qqVKTp0e1u_oq1ZriQ2UkpNXo1rE_IfGkhe7_4v5XZpyU4I_yr6YLVIt_9j6zaLtJqjNjv3_iuG19ZQe51b-lTFcx4i8eKhZeF6pwTLA_Bd8kVwuxV8sYeAvLyE9lAASi9-HQykP6xQ-CmTldtCUMAFvIaIIUVrGQ7CJfOS5A2L70DpdQ_FUKsfElWCygZl4z7xPJytRGjGQISQQxST9U7X34ofVaaKqr55nF5n0NkegasZiDbIo-UAMDC1VgRlvv-ThwvhdmQrHvlC4cvpq9ulIrXiYfcjZzCvFT6bh7zv5-nS5-q3VTbsrwmkuIOrANE_-vO0-u3QQyWfbVLTZ8_PFN1RySGSlHP5FniwCbMKtAJHFoucHl12rAqyT900KfUpgXOtSDIx3ADrMT6Fqf84gKhhV7ThJXs8KRP3ffURH8v9i_O__AZ5OgMjaDAAA.eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLUlORElBLUNFTlRSQUwtQS1QUklNQVJZLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0IiwiZXhwIjoxNjc0NTY1OTc3LCJhbGxvd0FjY2Vzc092ZXJQdWJsaWNJbnRlcm5ldCI6dHJ1ZX0=',
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
                <img src = '/Images/Swiggy.png' style = {{'width':'44vw'}}  />
                {/* <TopRight>
                        HELLO WORLD
                </TopRight> */}
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
                {/* <img style = {{'width':'43.2vw'}}src ='/Images/Premium.png'/> */}
                <Premium>
                    <div style={{'color':'white', 'width':'24vw', 'font':'Libre Franklin 14px'}}>Bringing the right kind of market intelligence and insights to clients. Get your premium access now.</div>
                    <div style={{'width':'10vw','paddingTop':'10px'}}><button style={{'border':'none','backgroundColor':'#55E4E4', 'width':'10vw','height':'45px'}}> Get Premium</button></div>
                </Premium>
            </Article>
        </FirstPage>

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
                    <img src="/Images/IndiaNew1.png" style={{'height':'73vh'}}/>
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
            <span><img src = '/Images/graph.png'/> <span style={{'fontSize':'18px'}}>Brands We Cover</span></span>
            <PowerBIEmbed
                        embedConfig = {{
                            type: 'report',   // Supported types: report, dashboard, tile, visual and qna
                            id: '38a0d4f0-0990-474f-8082-637329e1b623',
                            embedUrl:'https://app.powerbi.com/reportEmbed?reportId=38a0d4f0-0990-474f-8082-637329e1b623&groupId=67294232-0c81-43c2-a16d-22544a0a390b&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLUlORElBLUNFTlRSQUwtQS1QUklNQVJZLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0IiwiZW1iZWRGZWF0dXJlcyI6eyJtb2Rlcm5FbWJlZCI6dHJ1ZSwidXNhZ2VNZXRyaWNzVk5leHQiOnRydWV9fQ%3d%3d',
                            //get from props
                            // embedUrl:'https://app.powerbi.com/view?r=eyJrIjoiM2UwNjU2MzgtZGE1Mi00YzQ3LTkxZGYtM2EwMGVjMjZjYWYwIiwidCI6IjAwYTlmZjhjLTk4MzAtNDg0Ny1hZTUxLTQ1NzllYzA5MmNiNCJ9',
                            // embedUrl:newUrl,
                            accessToken: 'H4sIAAAAAAAEADVWx67FCm77l7d1APcWYBbu9nHvZefee3eQf8_NALOnJIikBP7PP1b6DnNa_PPf_2hv9_On6ozsDNaucKlmTf6lFhhgeC2DDpkmbJ6DcMdm_S7kBqKz27HklRC07PBhhDicPf1W37sM5aMpXGlIZ11aadrP26_t4-0Tcb4_DkooyVm56wqtbMS6kZOUQ-iISLoUp8tsTwJjDwb9TFN9A3DbaLUqGrjCopaoC0RgzGMRC3LvvRwINwUYXJn06Hhy2pJWd3oOMeknOcNWG-0NUjiN2Bxld7nNrosue-A9EYq0wqKoLA04gz4UchhvM1G_J3MSfrXe44NQqG_-ALsvEkBGt0TaZ45EAIWsCoej9KXlHZKVZNydUhfaV4uujsGpZ4wya0LsGqB49WpnaCCJovWL3d0JGnzyje_CNqPqtNHHlg9KSqMwxE-VlOKOpL2-mB4UMq2ggnhjCb6tjqBLtkacfhfthfPUpcAiQmhVicQ9C5MDdQ7WFRfqYl0C5IJgWo7w2mxwp0VAg1wJ8Q7WnNJnCtYBM3gAeSU7IELoQF8qw7HPcyVwAZdnHtKDyidlpjNLVKGXcQnlVdFtCrA-MMkIFPpz6REkU8mjn1JrdqY-ykuv8THUR0Nlnd-wKKm5GXdXPiS3ksiu3_PXh6citsP2M-EhL3fOQaBp4FJ7gC-nsHHrBuNm8izC2sIlxpYvkfLULiZE1MFEUN3DHDWeRcen49QE6KrC3TrFzJKtwLUWPQc1PbhoqKf1gKPZEzLVTHyhIfPhPDsWUnjci1KivPkRxwpbgSoFrn_QrEl1DGRAOOM3CBIT4FX6LwUVSIXDJrJVy72KghbiEycwUJo6Bi_vVPTWzqei6gxRBYy--0fjdFwXMGEFPJNxvO5wRMgRnW9IE2Q6YYJWoKpeABNezxv66HVSGQ4mcDTYazpuEMyLCRfrkKHsXRwXxXsoLlOUnErlA-e49AnNhjvoW75B9CVlDUnjOjnJ3WZa5wGX6JH9opQyHkyspyio_Bcx8l_0dHiyCKhVeLRZzooQNUMPuC48DzfOYVPzwZICcSIsx4oDB1ZwJLZaE6fuKtXwKZhg0wklJO3IGDmzC1tu0OloZNGj13jcTcQxhrl7yo85nhuXNLdte24oSVZBUfZfWbWpMosSd3vsai5lgoajfvZ3q69psxXUulJx9e0RrT_mFvtxC4NSIrb2V_GYotoAmYkc_cEl4_jxcTE6sPnu34BV2o5gP8XubMjeiEx9gp7TkXWPffW2zomy9-yBojjXyp_yg9Y2Ud3O8IqRU24ge5KXHJSb8sYsmKUft_Yj4P_iWrjMbK1zC8WP49fXz5EG4XQx2sVlXfj31va9cdikurALe03Jwzi8dlGiQGfHc2va9EAQq1c2mNBIHTmryOC5SapXBGkZa-LKhPJ8J-8yEh5fME_95CtuGrKzeoeT38TqrZ9vQ3UL-OvRczuRZdn4A23OIaS9KCyl-KHkEwSQelra7lFJhdyP46j3tyKQdj7wKnHdSBdo2CS4MrEcoY5Xg5cUmNJPeA8zEVsXs8N0kJs3VbzJyhwawVnkDN93QV51gvf2QSw9sstnqaaDPW0BYkAgtGvlRncFs8SNsE6i7UijHdUwRjmdJRPL5dtBZ-iwRHi-gp-Kel55NfpHQAuIf7JHB16OY0NGE-Sn146xscnXwfILrMFdS-w_se6kGkh2i4cTpVnu_RRubxo_CuIy8zMqYonTY3ziFFngGrmzaqPt_auvUVJB_kMvjhiDDG1r1cbOxUpwNfcOK9I734KbO0q967fn-KMwduVrrZTHFcJLip2vRBbLSzmyhFjtnNG300XS2TDR3YEdbfakJ0mYs8ciZwgXUNXUO4kMx47hZqzUakqOUlmcTVEijBwB3LKxeGAARPmIaVqCsqjxVVLUOnxDoevrN4THuJiPL_9Sh73M1cs6thda8dB4uaRyx2QM_n0zfOHZhro-Dh34d0RVZ9pkCscccmRHBWhudsphBe6JlJP8YobBx2jY9js8nBwafby63px14nsT13EnM1ehcBwGYzPiFi8g8YMWezynMgc-Spm5WwZMomMq4mab8qBmAl0OfSGtuRcg1Axk93hSYhQUSedh9Mjgx_WL0eNUX9eO389N3SG0zLvgZQ5e4uoDaVq38xN4az0Pb6GD_JO4TQr6LHv3dT9VCXl8Xs468w-fp_bmvv18uIpXTFufS4TTXO7NrGuNrgpy0X1LDlTWka25YewHo6_OU2TFYZvgWXv6ZGBGKaXUN5D-qItWt3o1t3m885Uit0_7A8uoWFFaWdBhvOdcouLQNZwPiOcDC5T90TrZibh0N2rWosWmnjDFd6IdsI9hjKM8oeCVa143MwW9tdTkogqPh7MC2lU9zi4789mlvL-FP_w7J6xIpm4MJnhdObisl1qk9wKtXaAyFlseDqEsHIk5wygUuESYcpAf2B_4zr6GHn4EYbTFkh8rR1nsI5BKZlv0S5e6TQHG7aqlQNI9h1QuM0P1yQj53eR2PBAXqWFagViPeF_Y8Zd7PgJKrBC6uPUNpTwsVZk3bcZLH1ID2jqRzXZrbaRmZzJog4Xst4Vn_vWvf_7rH257l2NWy_cv5g0O656OCUEzQL3mVwEJTPSj_aB7EzKausegP8yR_vmDYMMLLhLVDXockhfbXwT057XoD6CEUhxYZSCF6UYffrFgFcwza08Fv01PIGKKqAwrIXPBVGOQlqgLExvgz1X4bLbmGGeVLcUVW_qdIfp2ybCZOk0PDjrpys5pBYHHpj7yHD-HYfdKdNRfYjPiO2zg9vx5Ssfa9G6WLjfy-LO_i00RFEjI_U-Eg-5zVsevFe3hXycgsXFcwYpODtDAz5__J83AWn2svkKTqA7urCS3EPY3o-AciIWa5tIYN5osuWawcSqH9UGtksxpuDmUJSwB95Dne0fHQFcPOIwFHPpmLAv8H5rfpSk3JfhjGcisQtMqcNrfiLOfihYFIr7_jXLbekqPcyv_YDsyTCwolbLmefextORaaNEFAYFtDln7xYslcQW3tSSLKJaJdpBc3LKN0LXTiOcrikMQdfcSeL0sFuITcmmLxM3SZqf4lF3CoZQlu1dY4p9nZrH_GMdTPvDC552-0nXxAq1vFQZJ7R-bNxHtnvtqLO0l__42_Uvt8TlX8nmjv_I7PzuYkm24wcIMSPiuQYeBt2D0EcmwCmEK2AD96gel5M8C9WcEbdr1jRUs25cIavQQvz0g-yBIQDkRPBn3WPmPdAGhXc6K_T8PI_O7fJhvx2lq3SxFVTVTukwL5i2m3bxMl011CrSoMFlHU2rq3oqAX2cHuie2NM4mKR697CCh7GT__2L87_8Bm8_P5toMAAA=.eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLUlORElBLUNFTlRSQUwtQS1QUklNQVJZLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0IiwiZXhwIjoxNjc0NTY3MTcwLCJhbGxvd0FjY2Vzc092ZXJQdWJsaWNJbnRlcm5ldCI6dHJ1ZX0=',
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

const FormDiv = styled.div`
background-color:#F9FAFB;
height:50vh;
width:55vw;
padding:5%;
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
min-height:90vh;
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
height:55vh;
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