import React from 'react'
import styled from 'styled-components'



const Article = () => {

    let today = new Date();
    let hour = today.getHours();

  return (
    <>
    <PageHeader>
            <div><img src = '/Images/benchmark_logo.png' alt = ''/></div> <div>About</div> <div>Products</div><div>Articles</div><div>{hour<15?'Good Morning ':'Good Evening '}<img src = "/Images/user.svg" alt = "" style={{width: '3vw', borderRadius:'40px'}}/></div>
    </PageHeader>
    <h3 style={{'textAlign':'center', 'marginTop':'5vh'}}> Articles and Case studies</h3>
    <div>

    </div>
    <TopArticle>
        <Article1>Hello</Article1>
        <Article2>World</Article2>
    </TopArticle>
    </>
  )
}

export default Article

const PageHeader = styled.div`
height:10vh;
background-color:#F9FAFB;
display:flex;
justify-content:center;
align-items:center;
gap:12vw;

`
const TopArticle = styled.div`
display:grid;
margin-left:10vw;
border:1px solid black;
min-height:10vh;
width:80vw;
grid-template-columns: 1fr 1fr 1fr;
gap: 0px 10px;
grid-auto-flow: row;
grid-template-areas:
    "Article1 Article1 Article2";
`

const Article1 =styled.div`
grid-area:Article1;

`

const Article2 = styled.div`
grid-area: Article;
`

