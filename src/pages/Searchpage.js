import React, { useEffect, useState } from 'react'
import Head from '../components/Head/Head'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import styled from 'styled-components'


const Searchpage = () => {
    const [playerData, setPlayerData] = useState([]);
    
    useEffect(()=>{
        fetch(`${process.env.REACT_APP_API_ENDPOINT}/player/`, {
            method:'GET',
            headers:{
              'Content-Type': 'application/json',
            },
          })
          .then(res=>res.json())
          .then(
            res=>{
                console.log('res=', res)
              setPlayerData(res)
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

      const handleOnSearch = (string, results) => {
        // onSearch will have as the first callback parameter
        // the string searched and for the second the results.
        console.log(string, results)
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
        {/* <CompanyList>
            {playerData.map((val, i)=>
                <span>
                    {val.player_name}
                </span>
            )}
        </CompanyList> */}
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
padding:40px;
min-height:40vh;
`