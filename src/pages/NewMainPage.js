import React from 'react'
import styled from 'styled-components'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import './NewMainPage.css'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Autocomplete from "../components/Autocomplete/autocomplete";
import { useLocation } from 'react-router-dom';
import { BsTag } from "react-icons/bs";
import { MdHouseSiding , MdOutlineCasino} from "react-icons/md";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { GiHealthNormal } from "react-icons/gi";
import { TbBooks } from "react-icons/tb";
import Head from '../components/Head/Head';

const NewMainPage = () => {
    const [ ReportData, setReportData ] = useState([]);
    const [ReportDataBack, setReportDataBack] = useState([]);
    const [ ShowReportData, setShowReportData ] = useState([]);
    const [width, setWidth] = useState(window.innerWidth);
    const [UserReports, setUserReports] = useState([]);
    const [AllReports, setAllReports] = useState([]);
    const [tagData, setTagData] = useState([]);
    const [loginStatus, setloginStatus] = useState(true)
    const search = useLocation().search;
    const tag_name = new URLSearchParams(search).get('tag')
    const options = [
        'Bought', 'Buyable'
      ];
    const defaultOption = options[0];
      

    let today = new Date();
    let hour = today.getHours();
    const items = [
        // {   
        //     client_id
        //     : 
        //     41,
        //     end_date
        //     : 
        //     null,
        //     id
        //     : 
        //     133,
        //     players
        //     : 
        //     ['Amazon', 'Flipkart', 'Meesho', 'Zepto', 'Swiggy Stores', 'Milk Basket', 'Supr Daily', 'BB Daily', 'BigBasket', 'JioMart', 'Amazon (Verticals)', 'Flipkart (Verticals)', 'DMart Ready', 'Pepperfry', 'Urban Ladder', 'Snapdeal', 'Meesho', 'Amazon', 'Flipkart', 'Meesho (Social Commerce)', 'Glowroad', 'Citymall', 'Dealshare'],
        //     report_id
        //     : 
        //     3,
        //     report_name
        //     : 
        //     "Online Retail",
        //     start_date
        //     : 
        //     "2021-03-01"
        // },
        // {
        //     client_id
        //     : 
        //     41,
        //     end_date
        //     : 
        //     null,
        //     id
        //     : 
        //     134,
        //     players
        //     : 
        //     (2) ['Swiggy', 'Zomato'],
        //     report_id
        //     : 
        //     5,
        //     report_name
        //     : 
        //     "Food Aggregators",
        //     start_date
        //     : 
        //     "2021-03-01"
        // },
        {
          id: 2,
          report_name: 'online_r'
        },
        {
          id: 3,
          report_name: 'food_aggre'
        },
        {
          id: 4,
          report_name: 'shortform'
        }
      ]
    
    const item_data = [
      "Asparagus",
    "Beetroot",
    "Broccoli",
    "Cabbage", 
    "Carrot", 
    "Cauliflower", 
    "Celery", 
    "Corn", 
    "Eggplant", 
    "Lettuce", 
    "Mushroom", 
    "Onion", 
    "Parsnip", 
    "Pea", 
    "Potato", 
    "Pumpkin", 
    "Radish", 
    "Spinach",    
    "Tomato", 
    "Turnip"]

    const tag_data= [
      {
          "id": 1,
          "tag_name": "swiggy",
          "report_val": [
              {
                  "report_name": "Food Aggregators"
              },
              {
                  "report_name": "FoodTech Report"
              },
              {
                  "report_name": "Food Tech 2.0"
              }
          ],
          "reports": [
              "Food Aggregators",
              "FoodTech Report",
              "Food Tech 2.0"
          ]
      },
      {
          "id": 2,
          "tag_name": "flipkart",
          "report_val": [
              {
                  "report_name": "Online Retail"
              },
              {
                  "report_name": "Online Retail 2.0"
              }
          ],
          "reports": [
              "Online Retail",
              "Online Retail 2.0"
          ]
      }
  ]

    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
    }

    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    // useEffect(()=>{
    //   let loginStatus = window.localStorage.getItem('loginStatus')
    //   window.localStorage.setItem('loginStatus', 'false')
    //   console.log('loginStatus=', loginStatus)
    //   if(window.localStorage.getItem('loginStatus')==='true'){
    //     console.log('loginStatus is true')
    //   } else{
    //     console.log('loginStatus is false')
    //   }
    // })

    useEffect(()=>{
        console.log('tag_name = ',tag_name)
        let curr_id = 1
        if(window.localStorage.getItem('loginStatus')==='true')
        {curr_id = 1}else{
          curr_id=0
        }
        console.log('real_email=', window.localStorage.getItem("email"))
        console.log('pseudo_email=', window.localStorage.getItem("pseudo_email"))
        console.log('curr_id=', curr_id)
        let prop_token = window.localStorage.getItem("token")
        fetch(`${process.env.REACT_APP_API_ENDPOINT}/report/?client_id=${curr_id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${prop_token}`
        },
        // body: JSON.stringify({})
        })
        .then( data => data.json())
        .then(
        data => {
            let res = []
            for(var i=0; i<data.length; i++){
                console.log('data_bought =', data[i].bought)
                if(data[i].bought===true){
                    res.push(data[i])
                }
            }
            for (var j=0; j<data.length; j++){
                if (data[j].bought!==true){
                    res.push(data[j])
                }
            }
            // convert ressuch that it has description = list of company
          fetch(`${process.env.REACT_APP_API_ENDPOINT}/tags/`)
          .then(data =>data.json())
          .then(data =>{
            console.log('data_tag = ', data)
            setTagData(data)
            console.log('tags=', tagData)
            console.log('userrepData = ', res)
            // let li = ['Mobility 2.0','Food Tech 2.0','Real Money Gaming 2.0', 'OTT Audio 2.0', 'Online Retail 2.0', 'Online Retail 2.0 - Category']
            // let new_reps = res.filter(rep=>li.includes(rep.report_name))
            let new_reps = res
            if(tag_name){
              new_reps = new_reps.filter(rep=>[tag_name].includes(rep.report_name))
            }
            console.log('new_reps=', new_reps)
            setReportData(new_reps)
            setReportDataBack(new_reps)
            let arr = new_reps.slice(0, 8);
            setShowReportData(arr)
          })
        }
        )
        .catch( error => console.error(error))
        
        
    }, [])

    // useEffect(()=>{
    //   fetch(`${process.env.REACT_APP_API_ENDPOINT}/tags/`)
    //     .then(data =>data.json())
    //     .then(data =>{
    //       console.log('data_tag = ', data)
    //       setTagData(data)
    //     })
    // },[])
    
      const handleOnSearch = (string, results) => {
        // onSearch will have as the first callback parameter
        // the string searched and for the second the results.
        // to clear out selction on clicking cross
        // let arr = ReportDataBack.slice(0, 8);
        // setShowReportData(arr)
        // setReportData(ReportDataBack)
        console.log(string, results)
      }
    
      const handleOnHover = (result) => {
        // the item hovered
        console.log(result)
      }
    
      const handleOnSelect = (item) => {
        // the item selected. item is a dict containing tagname  and reports associated with that tag
        console.log('handle on select')
        console.log('item=', item)
        // console.log('new = ',ShowReportData.filter(rep=>item.reports.includes(rep.report_name)))
        setShowReportData(ShowReportData.filter(rep=>item.reports.includes(rep.report_name)))
      }
    
      const handleOnFocus = () => {
        // setReportData(ReportDataBack)
        console.log('Focused')
      }

      const formatResult = (item) => {
        return (
          <>
            {/* <span style={{ display: 'block', textAlign: 'left' }}>id: {item.id}</span> */}
            {/* <span style={{ display: 'block', textAlign: 'left' }}>{item.name}</span> */}
            <span style={{ display: 'block', textAlign: 'left' }}>{item.tag_name}</span>
          </>
        )
      }

      let setDropDownValue = (e)=>{
        console.log('value=', e.value)
        let val  = e.value
        // setselectedMonth(val, ()=>{
        //   console.log(selectedMonth)
        // })
        // setselectedMonth(val)
        // console.log('month=', selectedMonth)
        // console.log('bdata=', bdata)
      }

      let goBuyReport = () =>{
        alert('You need to buy this report first')
      }
      const navigate = useNavigate();

      let handleOnClick=(rep, start_date, end_date)=>{
        // if youu pass wrong prop then link will act like window.location.href. use e.preventDefault() to check
            // console.log('rep=', rep)
            window.localStorage.setItem('ReportName', rep)
            console.log('rep=',rep)
            window.localStorage.setItem('start_date',start_date)
            window.localStorage.setItem('end_date', end_date)
            navigate('/newreport');
          }
      function loadMore(){
        let len = ShowReportData.length + 4
        setShowReportData(ReportDataBack.slice(0, len))
      }

      let showSubscribed = ()=>{
        console.log('showreportdata=', ShowReportData) 
        let arr = [] 
        for (let i=0;i<ShowReportData.length; i++){
          if(ShowReportData[i].bought){
            arr.push(ShowReportData[i])
          }
        }
        setShowReportData(arr)
      }
      const handleSignOut = ()=>{
        console.log('signout')
        window.localStorage.setItem('loginStatus','false')
        window.location.reload()
    }
  return (
    width>768 ?(<>
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
        </PageHeader>:
        <PageHeader1>
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
              <div onClick={showSubscribed}>My Subscriptions</div>
                <div>Articles</div>
                <Man>
                  {hour<15?'Good Morning ':'Good Evening '}<img src = "/Images/user.svg" alt = "" style={{width: '3vw', borderRadius:'40px'}}/>
                  <SignOut onClick={handleSignOut}>
                        <a>Sign Out</a>
                    </SignOut>
                </Man>
        </PageHeader1>}
        <img src = '/Images/company_acess.png'/>
        <IconBar>
        <h3 style={{'marginLeft':'30px'}}>All Products</h3>
        <FilterBar>
        <div style={{ width: 250 }}>
          {/* <ReactSearchAutocomplete
            items={ReportData}
            fuseOptions={{ keys: ["report_name", 'players'] }}
            resultStringKeyName="report_name"
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            autoFocus
            formatResult={formatResult}
            styling = {{borderRadius: "5px", height: "40px",}}
          /> */}
          <ReactSearchAutocomplete
            items={tagData}
            fuseOptions={{ keys: ["tag_name"] }}
            resultStringKeyName="tag_name"
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            autoFocus
            formatResult={formatResult}
            styling = {{borderRadius: "5px", height: "40px",}}
          />
          {/* <Autocomplete data={item_data} /> */}
        </div>
        {/* <Dropdown options={options} onChange={(e)=>setDropDownValue(e)} placeholder="Status" controlClassName='myClassName'/> */}
        {/* <button>NormalView</button>
        <button>GridView</button>
        <button>Notif</button> */}
        </FilterBar>
        </IconBar>
        <Content>
            {ShowReportData.map( repver=>{
                return (
                <Wrap key={repver.id}>
                  <img src = '/Images/suit.png'/>
                  <MidRow>{repver.report_name}</MidRow>
                  <CompanyRow>
                    {(repver.players.slice(0, 3)).join(',  ').length>0?(repver.players.slice(0, 2)).join(',  ')+' & more':'no companies available'}
                    {/* {ReportPlayer.find(element=> element.report_name === repver.report_name)?.player_name} */}
                    {/* {console.log('rep_player=',(ReportPlayer.find(element=> element.report_name === repver.report_name)).player_name)} */}
                  </CompanyRow>
                  <TextRow>Flipkart, Amazon, MyntraFlipkart, Amazon, MyntraFlipkart, Amazon, MyntraFlipkart, Amazon, Myntra</TextRow>
                  <EndRow>
                    <div>6th Jan</div><div>{repver.bought?<button  onClick = {()=>handleOnClick(repver.report_name, repver.start_date, repver.end_date)}>View</button>:<button onClick={goBuyReport}>Subscribe</button>}</div>
                  </EndRow>
                </Wrap>
                )
            }
            )}
        </Content>
        <Load><button onClick={loadMore} style = {{'border':'1px solid #26CDCD', 'backgroundColor':'white', 'width':'176px', 'height':'39px'}}>Load More</button></Load>
        <img src = '/Images/study_perf.png'/>
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
        <PageHeader>
            <div><img src = '/Images/benchmark_logo.png' alt = ''/></div> <div>About</div> <div>Products</div><div>Articles</div><div>{hour<15?'Good Morning ':'Good Evening '}<img src = "/Images/user.svg" alt = "" style={{width: '3vw', borderRadius:'40px'}}/></div>
        </PageHeader>
        </>
    )
  )
}

export default NewMainPage

const PageHeader = styled.div`
height:10vh;
background-color:#F9FAFB;
display:flex;
justify-content:center;
align-items:center;
gap:18vw;

`

const PageHeader1 = styled.div`
height:10vh;
background-color:#F9FAFB;
display:flex;
justify-content:center;
align-items:center;
gap:10.5vw;

`
const SignOut = styled.div`
display:none;
position:absolute;
top:10vh;
right:10vw;
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

const Man = styled.div`
height:10vh;
padding-top:3vh;
&:hover{
    ${SignOut}{
        align-items:center;
        display:flex;
        justify-content:center;
    }
  }
`

const IconBar = styled.div`
height: 10vh;
background-color:#F4F4FD;
display:flex;
align-items:center;
justify-content:center;
gap:52vw;
`
const FilterBar = styled.div`
margin-left:30px;
display:flex;
align-items:center;
justify-content:center;
gap: 1vw;
/* background-color:#F4F4FD; */
`

const Content = styled.div`
  margin:20px 140px;
  display:grid;
  grid-column-gap:10px;
  grid-row-gap:20px;
  grid-template-columns: 25% 25% 25% 25%;
  @media (max-width:768px){
    grid-template-columns:100%;
    margin:20px 40px;
}
`

// const DropDiv = styled.div`
// display:none;
// position:absolute;
// top:58px;
// right:25px;
// background:#F6F6F6;
// border:1px solid black;
// border-radius: 0 0 5px 5px;
// width:90px;
// height: 40px;
// font-size:16px;
// /* transition-duration:160ms; */
// text-align:center;
// &:hover{
//   background-color: #ddd;
// }
// `

// const ProductDiv = styled.div`
// &:hover{
//     ${DropDiv}{
//         align-items:center;
//         display:flex;
//         justify-content:center;
//     }
//   }
// `

const Wrap = styled.div`
  position: relative;
  border-radius:10px;
  /* overflow:hidden; */
  height:374px;
  width:275px;
  /* display:flex;
  justify-content:center;
  align-items:center; */
  border: 1px solid #5C9FD8;
  cursor:pointer;
  background-color:white;
  img{
    width:275px;
  }
  &:hover {
      /* transform: scale(1.05); */
      background-color:#faf2fc;
      border-color:#AA68FF;
  }
  @media (max-width:768px){
    width: 80vw;
    height:26vh;
}
`

const MidRow =  styled.div`
margin-left:10px;
margin-top:5px;
font-size: 22px;
font-weight: bold;
`
const CompanyRow = styled.div`
font-size:16px;
margin-left:10px;
`
const TextRow = styled.div`
font-size:12px;
margin-left:10px;
margin-top:5px;
max-height:112px;
`

const EndRow = styled.div`
margin-left:10px;
margin-right:10px;
color:gray;
display:flex;
justify-content:space-between;
div{
    button{
        border:none;
        width:100px;
        background-color:white;
        border: 1px solid #5C9FD8;
        /* height: 30px; */
    }
}
`

const Load = styled.div`
display:flex;
align-items:center;
justify-content:center;
height:100px;
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

const Brands = styled.div`
`
const Sector = styled.div``
const HealthCare = styled.div``
const Company = styled.div``
const OnlineRetail = styled.div``
const EdTech = styled.div``



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
