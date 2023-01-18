import React from 'react'
import './ArticleDetail.css';
import styled from 'styled-components';


const ArticleDetail = () => {

    let today = new Date();
    let hour = today.getHours();
  return (
    <>
    <PageHeader>
            <div><img src = '/Images/benchmark_logo.png' alt = ''/></div> <div>About</div> <div>Products</div><div>Articles</div><div>{hour<15?'Good Morning ':'Good Evening '}<img src = "/Images/user.svg" alt = "" style={{width: '3vw', borderRadius:'40px'}}/></div>
    </PageHeader>
    <div id = 'main'></div>
    </>
  )
}

export default ArticleDetail

const PageHeader = styled.div`
height:10vh;
background-color:#F9FAFB;
display:flex;
justify-content:center;
align-items:center;
gap:12vw;
`