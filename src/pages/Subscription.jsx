import React, { useState, useEffect, useRef, Suspense } from 'react'
import styled from 'styled-components'
import { AiFillCheckCircle } from "react-icons/ai";


const Subscription = () => {
    const [showSubscribeButton, setshowSubscribeButton] = useState(true);
    const handleClick = () => {
        // Update the state by incrementing the count
        setshowSubscribeButton(false)
        let email = window.localStorage.getItem('email')
        console.log('email = ', email)
        fetch(`${process.env.REACT_APP_API_ENDPOINT}/sendmail/?email=${email}`, {
            method:'GET',
            headers:{
              'Content-Type': 'application/json',
            },
          })
          .then(res=>res.json())
          .then(
            res=>{
              console.log(res)
            }
          )
      };

  return (

    <SubscribeBox>
       {showSubscribeButton?<SubscribeButton onClick={handleClick}>Subscribe for data</SubscribeButton>:<AltSubscribe >Thank you for showing interest, our sales team will contact you soon</AltSubscribe>}
       <SubscribeText>To access below data, please subscribe to our premium subscritpion</SubscribeText>
        <SubscribeText><AiFillCheckCircle/>  Platform metrics (includes Gross and Shipped: GMV, Items and ASP with a Category filter)</SubscribeText>
        <SubscribeText><AiFillCheckCircle/>Geographic view of - Platform wise performance of GMV & Leaders overall India</SubscribeText>
        <SubscribeText><AiFillCheckCircle/>Industry cancellation metrics</SubscribeText>
        <SubscribeText><AiFillCheckCircle/>Platform wise User & Order Metrics</SubscribeText>
        <SubscribeText><AiFillCheckCircle/> Platform wise revenue metrics</SubscribeText>
        <SubscribeText><AiFillCheckCircle/> Categories we cover - Horizontals, Fashion, Beauty & Personal Care, Home & Furniture , Grocery & many more</SubscribeText>
        <SubscribeText><AiFillCheckCircle/> Players we cover -  Amazon, Flipkart, Myntra, Meesho, Nykaa, Purplle, Pepperfry, Urban Ladder, Bigbasket, Blinkit, Dunzo and many more</SubscribeText>
        <SubscribeText><AiFillCheckCircle/> Features - </SubscribeText>
        <FeaturesText>1. Visual presentation of data on - Annually, Quarterly & Monthly view provided (Both CY & FY)</FeaturesText>
        <FeaturesText>2. Insights & definitions provided for graphs & graph parameters</FeaturesText>
        <FeaturesText>3. Conversion of currency from USD to INR or vice versa</FeaturesText>
    </SubscribeBox>
    // <Subscribe>
    //     Subscribe for report
    // </Subscribe>
  )
}

export default Subscription


const Subscribe = styled.div`
  display:flex;
  align-items:center;
  justify-content:center;
  color:black;
  font-family:system-ui;
  font-size:48px;
  min-height:70vh;
`

const SubscribeBox = styled.div`
    margin-left:45px;
    background-color:white;
    font-size:18px;
    padding-top:20px;
    padding-left:20px;
    padding-bottom:20px;
    width:075vw;
    border-radius:10px;
`
const AltSubscribe = styled.div`
border:1px solid black;
padding-left:10px;
line-height:50px;
`

const SubscribeButton = styled.button`
    background-color:#51E0DF;
    border:1px solid black;
    height:50px;
    width:200px;
    /* border:None; */

`
const SubscribeText = styled.div`
    font-weight:400;
    font-size:16px;
    margin-top:10px;
`

const FeaturesText = styled.div`
    font-weight:400;
    font-size:16px;
    margin-left:30px;
`