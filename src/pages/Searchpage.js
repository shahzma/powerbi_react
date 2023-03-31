import React, { useEffect, useState } from 'react'
import Head from '../components/Head/Head'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import styled from 'styled-components'
import TableFilter from "react-table-filter";
import "react-table-filter/lib/styles.css";
import {PowerBIEmbed} from 'powerbi-client-react';
import {models} from 'powerbi-client';
import {Link, Navigate} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const Searchpage = () => {
    const [playerData, setPlayerData] = useState([]);
    const [savedPlayerData, setSavedPlayerData] = useState([]) 
    const [subplayerData, setSubPlayerData] = useState([]);
    const [savedsubPlayerData, setSavedSubPlayerData] = useState([]) ;
    const [newReportPages, setnewReportPages] = useState([])
    const [audit, setAudit] = useState([1,2,3]);
    const [showLoader, setshowLoader] = useState(false);
    //  report page is true view
    const [toggleView, settoggleView] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        let client_id = window.localStorage.getItem('clientID')
        if(client_id===null){
            client_id = 1
        }
        fetch(`${process.env.REACT_APP_API_ENDPOINT}/player/?client_id=${client_id}`, {
            method:'GET',
            headers:{
              'Content-Type': 'application/json',
            },
          })
          .then(res=>res.json())
          .then(
            res=>{
                console.log('players=',res)
              setPlayerData(res)
              setSavedPlayerData(res)

            }
          )
          fetch(`${process.env.REACT_APP_API_ENDPOINT}/subplayer/?client_id=${client_id}`, {
            method:'GET',
            headers:{
              'Content-Type': 'application/json',
            },
          })
          .then(res=>res.json())
          .then(
            res=>{                
            for(let i= 0; i<res.length;i++){
                res[i]['sub'] = true
            }
            console.log('subplayer=',res)
              setSubPlayerData(res)
              setSavedSubPlayerData(res)
            }
          )
    },[]);

    const items = [
        {
          id: 0,
          player_name: 'Cobol'
        },
        {
          id: 1,
          player_name: 'JavaScript'
        },
        {
          id: 2,
          player_name: 'Basic'
        },
        {
          id: 3,
          player_name: 'PHP'
        },
        {
          id: 4,
          player_name: 'Java'
        }
      ]

      const handleLogoClick = (item)=>{
        console.log('hello = ', item)
        let reportname = item.player_name
        let report_id = item.newreport.id
        let filter_value = item.newreport.filter_value
        // settoggleView(true)
        window.localStorage.setItem('searchcompany', reportname)
        window.localStorage.setItem('searchreportid', report_id)
        window.localStorage.setItem('searchfilterval', filter_value)
        navigate('/powerbicompany')
      }

      const elementsHtml = subplayerData.map((item, index) => {
        return (
          <tr key={"row_" + index}>
            <ComplianceColumnLogo onClick={()=>handleLogoClick(item)}>
                <img style = {{'height':'30px','width':'30px'}}src = {item.image===null?'/Images/ms_icon.png':item.image.file} alt = {item.player_name} onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src="/Images/ms_icon.png";
                  }}/>
            </ComplianceColumnLogo>
            <ComplianceColumn>{item.industry_name}</ComplianceColumn>
            <ComplianceColumn>{item.player_name}</ComplianceColumn>
            <ComplianceColumn>{item.status}</ComplianceColumn>
            <ComplianceColumn>{item.stage}</ComplianceColumn>
            <ComplianceColumn>{item.last_valuations}</ComplianceColumn>
          </tr>
        );
      });

      const elementsHtml1 = playerData.map((item, index) => {
        return (
          <tr key={"row_" + index}>
            <ComplianceColumnLogo>
                <img style = {{'height':'30px','width':'30px'}}src = {item.image===null?'/Images/ms_icon.png':item.image.file} alt = {item.player_name} onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src="/Images/ms_icon.png";
                  }}/>
            </ComplianceColumnLogo>
            <ComplianceColumn>{item.industry_name}</ComplianceColumn>
            <ComplianceColumn>{item.player_name}</ComplianceColumn>
            <ComplianceColumn>{item.status}</ComplianceColumn>
            <ComplianceColumn>{item.stage}</ComplianceColumn>
            <ComplianceColumn>{item.last_valuations}</ComplianceColumn>
          </tr>
        );
      });
    

      const handleOnSearch = (string, results) => {
        // onSearch will have as the first callback parameter
        // the string searched and for the second the results.
        setSubPlayerData(savedsubPlayerData.filter(x=>x.player_name.toLowerCase().includes(string.toLowerCase())))
        setPlayerData(savedPlayerData.filter(x => x.player_name.toLowerCase().includes(string.toLowerCase())))
        console.log(string, results)
        // console.log(savedPlayerData.filter(x => x.player_name.toLowerCase().includes(string.toLowerCase())))
      }
    
      const handleOnHover = (result) => {
        // the item hovered
        console.log(result)
      }
    
      const handleOnSelect = (item) => {
        // the item selected
        console.log(item)
      }
    
      const handleOnFocus = () => {
        console.log('Focused')
      }
    
      const formatResult = (item) => {
        return (
          <>
            
            <span style={{ display: 'block', textAlign: 'left' }}>{item.player_name}</span>
          </>
        )
      }
      if(window.localStorage.getItem('loginStatus')!=='true'){
        return <Navigate to = "/"/>
      }
  return (
    <div style={{'background':'#F5F8FC'}}>
        <Head/>
        <div style={{'paddingLeft':'5.8vw', 'fontSize':'33px', 'fontWeight':'bold', 'fontFamily':'system-ui', 'paddingTop':'5px'}}>Search Companies</div>
        <div style = {{'paddingLeft':'6vw','fontWeight':'500', 'fontFamily':'Fira Sans'}}>Products / Search Companies</div>
        <SearchArea>
            <SearchBox>
            <div style={{ width: 800 }}>
                <ReactSearchAutocomplete
                items={playerData}
                fuseOptions={{ keys: ["player_name"] }}
                resultStringKeyName="player_name"
                onSearch={handleOnSearch}
                onHover={handleOnHover}
                onSelect={handleOnSelect}
                onFocus={handleOnFocus}
                autoFocus
                maxResults={0}
                showNoResults = {false}
                formatResult={formatResult}
                // styles inside of search box
                styling = {{borderRadius: "5px", height: "40px",}}
                          />
            </div>
            </SearchBox>
            <TextBox>
                Type in search box for available companies
            </TextBox>
        </SearchArea>
        <ComplianceTable>
                <thead>
                    <ComplianceHeaderCompany>
                        Company
                    </ComplianceHeaderCompany>
                    <ComplianceHeader>Industry</ComplianceHeader>
                    <ComplianceHeader>Leadership</ComplianceHeader>
                    <ComplianceHeader>Status</ComplianceHeader>
                    <ComplianceHeader>Stage</ComplianceHeader>
                    <ComplianceHeader>Last valuation</ComplianceHeader>
                </thead>
                <tbody>{elementsHtml}</tbody>
                <tbody>{elementsHtml1}</tbody>
        </ComplianceTable>


    </div>
  )
}

export default Searchpage

const SearchArea = styled.div`
display:flex;
/* align-items:center; */
padding-left:6vw;
justify-content:center;
min-height:20vh;
flex-direction:column;
gap:30px;
background-color:#F5F8FC;
`

const SearchBox = styled.div`
`
const TextBox = styled.div`
`

const CompanyList =styled.div`
background-color: ${props => props.bgcolor};
padding:40px;
min-height:40vh;
display:flex;
flex-wrap:wrap;
`
const SubCompanyBox = styled.span`
border:1px solid black;
margin:5px;
padding:5px;
max-height:40px;
background-color:#B6DCFE;
`

const CompanyBox = styled.span`
border:1px solid black;
margin:5px;
padding:5px;
max-height:40px;
`
const ComplianceTable = styled.table`
 /* font-family: arial, sans-serif; */
  /* border-collapse: collapse; */
  background-color:#F5F8FC;
  margin:6vw;
  margin-top:5px;
`

const ComplianceHeaderCompany = styled.th`
 border: 0px solid #dddddd;
 border-bottom:2px solid black;
 font-size:30px;
 padding:8px;
 /* text-align:center; */
 height:80px;
 /* background-color:blue; */
 /* color:white; */
 min-width:160px;
`

const ComplianceHeader = styled.th`
 border: 0px solid #dddddd;
 border-bottom:2px solid black;
 padding:8px;
 font-weight:normal;
 text-align:center;
 height:80px;
 /* background-color:blue; */
 /* color:white; */
 min-width:203px;
`

const ComplianceColumnLogo = styled.td`
  border: 1px solid black;
  border-left:0px;
  text-align: center;
  padding: 8px;
  height:150px;
`
const ComplianceColumn = styled.td`
  border: 0px solid #dddddd;
  border-bottom:1px solid black;
  text-align: center;
  padding: 8px;
  height:150px;
`