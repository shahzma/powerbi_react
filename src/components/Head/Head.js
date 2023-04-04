import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';
import { BsTag, BsFillCloudArrowDownFill } from "react-icons/bs";
import { MdHouseSiding , MdOutlineCasino} from "react-icons/md";
import { AiOutlineShoppingCart, AiOutlineSearch } from "react-icons/ai";
import { GiHealthNormal } from "react-icons/gi";
import { TbBooks } from "react-icons/tb";
import{ImConnection} from 'react-icons/im'
import { RiMoneyDollarBoxFill, RiArrowDropDownLine } from "react-icons/ri";
import { get } from 'jquery';
import { useState } from 'react';

const Head = () => {
    const [showDropDn, setShowDropDn] = useState(false)

    let today = new Date();
    let hour = today.getHours();
    const navigate = useNavigate();
    const handleSignOut = ()=>{
        console.log('signout')
        window.localStorage.setItem('loginStatus','false')
        let curr = window.localStorage.getItem('currency')
        let year = window.localStorage.getItem('year')
        let email = window.localStorage.getItem('email')
        let report = window.localStorage.getItem('report')
        const uploadData = new FormData();
        uploadData.append('email', email);
        uploadData.append('year', year);
        uploadData.append('currency', curr)
        uploadData.append('report', report)
        // fetch(`${process.env.REACT_APP_API_ENDPOINT}/usercurrency/`, {
        //     method: 'POST',
        //     body: uploadData
        //   }).then(data => data.json())
        //   .then( data => {
        //         console.log(data)
        //     })
        //   .catch(error => {
        //     // setSignIn(false);
        //     // alert('System Error.Contact Admin')
        //     console.log(error)
        // })
        window.location.href='/'
    }
  return (  <>
            {window.localStorage.getItem('loginStatus')==='false'?<PageHeader>
            <div><img src = '/Images/benchmark_logo.png' alt = ''/></div>
                <ProductDiv>
                Products
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
                        <Sector onClick={()=>{navigate('/newmainpage/?tag=Real Money Gaming 2.0')}}>
                            <div className='Browse'>Browse by Sector</div>
                            <h6><MdOutlineCasino style={{'color':'#15BEBE'}}/>RMG</h6>
                            <div className='Browse'>Lorem Ipsum Lorem IpsumLorem IpsumLorem IpsumLorem Ipsum</div>
                        </Sector>
                        <HealthCare onClick={()=>{navigate('/newmainpage/?tag=Food Tech 2.0')}}>
                            <br/>
                            <h6><GiHealthNormal style={{'color':'#15BEBE'}}/>Food Tech</h6>
                            <div className='Browse'>Lorem Ipsum Lorem IpsumLorem IpsumLorem IpsumLorem Ipsum</div>
                        </HealthCare>
                        <Company onClick={()=>{navigate('/newmainpage')}}>
                            <h6><MdHouseSiding style={{'color':'#15BEBE'}}/> Company</h6>
                            <div className='Browse'>Lorem Ipsum Lorem IpsumLorem IpsumLorem IpsumLorem Ipsum</div>
                        </Company>
                        <OnlineRetail onClick={()=>{navigate('/newmainpage/?tag=Online Retail 2.0')}}><h6> <AiOutlineShoppingCart style={{'color':'#15BEBE'}}/> OnlineRetail</h6>
                            <div className='Browse'>Lorem Ipsum Lorem IpsumLorem IpsumLorem IpsumLorem Ipsum</div></OnlineRetail>
                        <EdTech onClick={()=>{navigate('/newmainpage/?tag=Mobility 2.0')}}>
                            <h6><TbBooks style={{'color':'#15BEBE'}}/> Mobility</h6>
                            <div className='Browse'>Lorem Ipsum Lorem IpsumLorem IpsumLorem IpsumLorem Ipsum</div>
                            <div style={{'marginTop':'10px', 'marginLeft':'210px'}}><a style={{"text-decoration":"none", "fontSize":"12px"}}href="/newmainpage">Show More</a></div>
                        </EdTech>
                    </TypesDiv>
                </DropDiv>
                </ProductDiv>
                <div>Articles</div><SignInDiv><button style ={{'border':'1px solid #15BEBE', 'backgroundColor':'white', 'width':'120px', 'height':'30px'}} onClick={()=>{navigate('/')}}>Login</button></SignInDiv>
            </PageHeader>:<PageHeader>
            <div><img src = '/Images/benchmark_logo.png' alt = ''/></div>
                <ProductDiv>
                Products
                <DropDiv>
                    <OverViewDiv onClick={()=>{navigate('/mainpage')}}>
                    <div className = 'ProductsText'>Legacy Product</div>
                    <div className='Browse'>Users signed up before 1 March, 2023 , please click here</div>
                    <button className='OverViewButton'>Redirect</button>
                    </OverViewDiv>
                    <TypesDiv>
                        <Brands onClick={()=>{
                            navigate('/newreport')
                        }}>
                            {/* <div className = 'Browse'>
                                Browse by Type
                            </div> */}
                            <br/>
                            <h6><ImConnection style={{'color':'#15BEBE'}}/>Consumer Internet</h6>
                            <div className='Browse'>E-commerce, Food Delivery, Online education, Gaming and more</div>
                        </Brands>
                        <Sector onClick={()=>{navigate('/newreport')}}>
                            {/* <div className='Browse'>Browse by Sector</div> */}
                            <br/>
                            <h6><RiMoneyDollarBoxFill style={{'color':'#15BEBE'}}/>Fintech</h6>
                            <div className='Browse'> Payments, Loans, Insurance, Investments </div>
                        </Sector>
                        <HealthCare onClick={()=>{navigate('/newreport')}}>
                            <br/>
                            <h6><BsFillCloudArrowDownFill style={{'color':'#15BEBE'}}/>SAAS</h6>
                            <div className='Browse'>B2B and B2C companies of India</div>
                        </HealthCare>
                        <Company onClick={()=>{navigate('/newreport')}}>
                            <h6><BsTag style={{'color':'#15BEBE'}}/>Traditional Brands</h6>
                            <div className='Browse'>Consumer brands in grocery, fashion and everything else</div>
                        </Company>
                        <OnlineRetail onClick={()=>{navigate('/search')}}><h6> <AiOutlineSearch style={{'color':'#15BEBE'}}/>Search Companies</h6>
                            <div className='Browse'>Look up all companies data</div></OnlineRetail>
                        {/* <EdTech onClick={()=>{navigate('/newmainpage/?tag=Mobility 2.0')}}>
                            <h6><TbBooks style={{'color':'#15BEBE'}}/> Mobility</h6>
                            <div className='Browse'>Lorem Ipsum Lorem IpsumLorem IpsumLorem IpsumLorem Ipsum</div>
                            <div style={{'marginTop':'10px', 'marginLeft':'210px'}}><a style={{"text-decoration":"none", "fontSize":"12px"}}href="/newmainpage">Show More</a></div>
                        </EdTech> */}
                    </TypesDiv>
                </DropDiv>
                </ProductDiv>
                <div>Articles</div>
                <Man>
                {window.localStorage.getItem('gender_male')==='false'?<img src = "/Images/userWomen.png" alt = "" style={{width: '3vw', borderRadius:'40px'}}/>:<img src = "/Images/userMen.png" alt = "" style={{width: '3vw', borderRadius:'40px'}}/>}
                {hour<15?'Good Morning ':'Good Evening '}{window.localStorage.getItem('user_name')!==undefined?window.localStorage.getItem('user_name'):window.localStorage.getItem('email').split('@')[0]}
                <Dropbutton onClick = {()=>{setShowDropDn(!showDropDn)}}><RiArrowDropDownLine/></Dropbutton>
                    <SignOut display = {showDropDn?'flex':'none'} onClick={handleSignOut}>
                        <a>Sign Out</a>
                    </SignOut>
                </Man>
            </PageHeader>}
            </>
  )
}


export default Head

const PageHeader = styled.div`
height:10vh;
background-color:white;
display:flex;
justify-content:center;
align-items:center;
gap:19vw;

`
const SignOut = styled.div`
display: ${props => props.display};;
position:relative;
/* top:8.8vh; */
right:-110px;
align-items:center;
justify-content:center;
background:#F6F6F6;
/* border:1px solid black; */
border-radius: 5px;
box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.5);

width:90px;
height: 40px;
font-size:16px;
/* transition-duration:160ms; */
text-align:center;
&:hover{
  background-color: #ddd;
}
`

const Dropbutton = styled.button`
border-radius:50%;
border:0px;
background-color:white;
outline:none !important;
&:hover{
    background-color:#EFEFEF;
}
`
const Man = styled.div`
height:10vh;
padding-top:3vh;
/* &:hover{
    ${SignOut}{
        align-items:center;
        display:flex;
        justify-content:center;
    }
  } */
`


const SignInDiv = styled.div`
color:blue;
`


const DropDiv = styled.div`
z-index:1000;
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
"Brands Sector "
"Company OnlineRetail"; 
`

const Brands = styled.div`
`
const Sector = styled.div``
const HealthCare = styled.div``
const Company = styled.div``
const OnlineRetail = styled.div``
const EdTech = styled.div``