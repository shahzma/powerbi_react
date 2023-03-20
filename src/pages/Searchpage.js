import React, { useEffect, useState } from 'react'
import Head from '../components/Head/Head'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import styled from 'styled-components'


const Searchpage = () => {
    const [playerData, setPlayerData] = useState([]);
    const [savedPlayerData, setSavedPlayerData] = useState([]) 
    const [subplayerData, setSubPlayerData] = useState([]);
    const [savedsubPlayerData, setSavedSubPlayerData] = useState([]) 
    useEffect(()=>{
        let client_id = window.localStorage.getItem('client_id')
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

    //   const onError = () => {
    //     setImageSrc(fallbackSrc);
    //   };
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

  return (
    <div>
        <Head/>
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
        <CompanyList>
            {subplayerData.map((val, i)=>
                <SubCompanyBox>
                   <img style = {{'height':'10px','width':'10px'}}src = {val.image===null?'http://0.0.0.0:8001/media/uploads/download.png':val.image.file} alt = {val} onError={({ currentTarget }) => {
    currentTarget.onerror = null; // prevents looping
    currentTarget.src="http://0.0.0.0:8001/media/uploads/download.png";
  }}/> {val.player_name}  
                </SubCompanyBox>
            )}
            {playerData.map((val, i)=>
                <CompanyBox>
                   <img style = {{'height':'10px','width':'10px'}}src = {val.image===null?'http://0.0.0.0:8001/media/uploads/download.png':val.image.file} alt = {val} onError={({ currentTarget }) => {
    currentTarget.onerror = null; // prevents looping
    currentTarget.src="http://0.0.0.0:8001/media/uploads/download.png";
  }}/> {val.player_name}  
                </CompanyBox>
            )}
        </CompanyList>
    </div>
  )
}

export default Searchpage

const SearchArea = styled.div`
display:flex;
align-items:center;
justify-content:center;
min-height:40vh;
flex-direction:column;
gap:30px;
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