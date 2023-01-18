import React from 'react'
import styled from 'styled-components'
import { useState , useEffect} from 'react'


const NewFigmaLogin = () => {
    const [ email, setEmail ] = useState('');
    const [FullName, setFullName] = useState('');
    const [Phone, setPhone] = useState(null);
    const [width, setWidth] = useState(window.innerWidth);

    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
      }

    useEffect(() => {
      window.addEventListener('resize', handleWindowSizeChange);
      return () => {
          window.removeEventListener('resize', handleWindowSizeChange);
      }
  }, []);

    let login = (e)=>{
        e.preventDefault();
        // console.log(email)
        // setLoggedIn(true)
      console.log('hello')
    }

    let inputChanged = (e) => {
        setEmail(e.target.value);
      }

  return (
    width>768 ?(<PageContainer>
        <SideImg>
            <img src = '/Images/lhs.png' alt = ''/>
        </SideImg>
         <Login>
            <ImgDiv>
                <img src = '/Images/benchmark_logo.png' alt = ''/>
            </ImgDiv>
            <LoginForm>
            <form onSubmit={(e)=>login(e)}>
                <h4>Create Free Account</h4>
                <div className="form-group">
                    <label></label>
                    <input type = 'text' name = 'fullname' id='fullname' placeholder='Full Name' className="form-control" value={email}  onChange={(e) => inputChanged(e)}/>
                    <label></label>
                    <input type = 'text' name = 'email' id='email' placeholder='Email' className="form-control" value={email}  onChange={(e) => inputChanged(e)}/>
                    <label></label>
                    <input type = 'text' name = 'phone' id='phone' placeholder='Your Phone Number' className="form-control" value={Phone}  onChange={(e) => inputChanged(e)}/>
                </div>
                <button type="submit" className="btn btn-primary btn-block" style={{backgroundColor:'blue' , border:'None'}} >Sign Up</button>
            </form>
            </LoginForm>
            <SocialLogin>
                Sign Up with <button><img src='/Images/google_icon.png'/></button> &nbsp;<button><img src = '/Images/ms_icon.png'/></button>
            </SocialLogin>
            <SignIn>
                Already have an account? <a href='/'>Sign In</a>
            </SignIn>
            <FooterDiv>
                Terms and Conditions | Privacy Policy  | Contact Us
            </FooterDiv>
        </Login>
    </PageContainer>):(
    <PageContainer>
         <Login>
            <ImgDiv>
                <img src = '/Images/benchmark_logo.png' alt = ''/>
            </ImgDiv>
            <LoginForm>
            <form onSubmit={(e)=>login(e)}>
                <h4>Create Free Account</h4>
                <div className="form-group">
                    <label></label>
                    <input type = 'text' name = 'fullname' id='fullname' placeholder='Full Name' className="form-control" value={email}  onChange={(e) => inputChanged(e)}/>
                    <label></label>
                    <input type = 'text' name = 'email' id='email' placeholder='Email' className="form-control" value={email}  onChange={(e) => inputChanged(e)}/>
                    <label></label>
                    <input type = 'text' name = 'phone' id='phone' placeholder='Your Phone Number' className="form-control" value={Phone}  onChange={(e) => inputChanged(e)}/>
                </div>
                <button type="submit" className="btn btn-primary btn-block" style={{backgroundColor:'blue' , border:'None'}} >Sign Up</button>
            </form>
            </LoginForm>
            <SocialLogin>
                Sign Up with <button><img src = '/Images/google_icon.png'/></button> &nbsp;<button><img src = '/Images/ms_icon.png'/></button>
            </SocialLogin>
            <SignIn>
                Already have an account? <a>Sign In</a>
            </SignIn>
            <FooterDiv>
                {/* Terms and Conditions | Privacy Policy  | Contact Us */}
            </FooterDiv>
        </Login>
    </PageContainer>
    )
  )
}

export default NewFigmaLogin

const PageContainer = styled.div`
height:100vh;
display:flex;
@media (max-width:768px){
    overflow-x:hidden
}
`

// const Login = styled.div`
// margin-top: 30vh;
// background-color:white;
// width:65%;
// justify-content:center;
// flex-direction:column;
// text-align:center;
// @media (max-width:768px){
//   width:100%;
// }
// `

const Login = styled.div`
/* margin-top: 10vh; */
text-align:center;
background-color:white;
width:65%;
display:flex;
flex-direction:column;
align-items:center;
@media (max-width:768px){
  width:100%;
}
`

const ImgDiv = styled.div`
/* border :1px solid red; */
margin-bottom: 40px;
margin-top:35px;
width:65vw;
flex-grow:1;
display:flex;
align-items:center;
justify-content:center;
img{

}
`

const LoginForm = styled.div`
margin-bottom: 10px;
/* flex-grow:1; */
width: 450px;
margin: auto;
margin-bottom: 20px;

@media (max-width:768px){
    width: 320px;
    margin: auto;
}
`

const SocialLogin = styled.div`
margin-bottom: 10px;
/* flex-grow:1; */
height:15vh;
button{
    background-color:white;
    border: None;
    img{
        height:30px;
    }
}
@media (max-width:768px){
    margin-top:20px;
}

`

const SignIn = styled.div`
margin-bottom: 10px;
flex-grow:1;
`

const FooterDiv = styled.div`
border-top :1px solid black;
margin-bottom: 10px;
/* flex-grow:1; */
height:7vh;
width:40vw;
color:blue;
/* display:flex;
justify-content:center;
align-items:center; */
`

const LoginInner = styled.div`
  width: 450px;
  margin: auto;
  background: #ffffff;
  /* padding: 40px 55px 45px 55px; */
  img{
    position:absolute;
    /* width: 210px;
    height: 90px; */
    left: 61vw;
    /* top: 160px; */
    top:22vh;
  }
  @media (max-width:768px){
    width: 400px;
    margin: auto;
    padding: 40px 55px 45px 55px;
    img{
      position:absolute;
      width: 176px;
      height: 45px;
      left: 30vw;
      top: 160px;
    }
}
`

const SideImg = styled.div`
background-color:#1C1C6C;
width:35%;
overflow:hidden;
`