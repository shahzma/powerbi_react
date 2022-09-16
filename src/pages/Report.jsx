import {PowerBIEmbed} from 'powerbi-client-react';
import {models} from 'powerbi-client';
import styled from 'styled-components';
import './Report.css';
import './Report.scss';
import React, { useState, useEffect } from 'react';
import { ProSidebar, Menu, MenuItem, SubMenu} from 'react-pro-sidebar';
import {Link, Navigate} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { FaAmazon, FaTrafficLight,FaUsers, FaDeezer,FaAlignLeft, FaKeyboard } from 'react-icons/fa';
import{MdOutlineSummarize, MdMonetizationOn, MdInsights, MdDashboard} from 'react-icons/md';
import { ImProfile } from "react-icons/im";
import {SiCoveralls, SiSimpleanalytics} from "react-icons/si"
import {FiUsers} from "react-icons/fi"
import {AiOutlineFileSearch} from 'react-icons/ai'
import { GiHamburgerMenu } from "react-icons/gi";
import { BiCategory, BiBookContent } from "react-icons/bi";
import $ from 'jquery';
import Modal from 'react-modal';
import { firestore, database } from "../utils/auth/firebase";
import { v4 as uuid } from "uuid";
import { useParams, withRouter } from "react-router";
import { Hidden } from '@material-ui/core';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';



function Report(props) {
//get id and reporturl and accesstoken from click
  const [ AccessToken, setAccessToken ] = useState('');
  const [report, setReport] = useState(null);
  const [ EmbedToken, setEmbedToken ] = useState('');
  const [ reportUrl, setReportUrl ] = useState('');
  const [ pages, setPages ] = useState([]);
  const [ ReportPages, setReportPages ] = useState([]);
  const [myPages, setMyPages] = useState([]);
  const [ reportId, setReportId ] = useState('');
  const [ newUrl, setNewUrl ] = useState('');
  const [width, setWidth] = useState(window.innerWidth);
  const [ toggle, setToggle ] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [comments, setComments] = useState({});
  const [bdata, setBdata] = useState({});
  const [comment, setComment] = useState("Hello");
  const [commentsOpen, setCommentsOpen] = useState(false);
  // const { form_id, instanceId, question_id } = useParams();
  // const [ form_id, setForm_id ] = useState('851');
  let [ formId, setFormId ] = useState('851');
  let [ quesId, setQuesId ] = useState(108);
  let [ selectedMonth, setselectedMonth] = useState('August');
  const [commentsData, setCommentsData] = useState({
    currentQuestion: 1,
    currentQuestionId: "",
    comments: [],
  });
  let [iconDict, setIconDict] = useState({
    'Sector Summary':<MdOutlineSummarize/>,
    'Sector Summary 2.0':<MdOutlineSummarize/>,
    'Company Profile':<ImProfile />,
    'Overall':<SiCoveralls/>,
    'Category':<BiCategory/>,
    'Amazon Specific':<FaAmazon />,
    'Traffic':<FaTrafficLight/>,
    'Engagement':<FaUsers/>,
    'Streams Analysis':<SiSimpleanalytics/>,
    'Monetization':<MdMonetizationOn/>,
    'User Profile':<FiUsers/>,
    'Engagement Profile':<AiOutlineFileSearch/>,
    'Sector Insights':<MdInsights/>,
    'Content':<BiBookContent/>,
    'Top Line Estimates':<FaDeezer/>,
    'Fulfilment Metrics':<FaAlignLeft/>,
    'Unit Economics':<MdMonetizationOn/>,
    'Keyboard':<FaKeyboard/>,
    'Dashboard':<MdDashboard/>
  })

  let subtitle;
  let form_id=0;
  let ques_id=0;
  // runs on first render

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  function lastSiXMonths(){
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var today = new Date();
    var d;
    var month;
    var monthArray = [];
    for(var i = 6; i > 0; i -= 1) {
      d = new Date(today.getFullYear(), today.getMonth() - i, 1);
      month = monthNames[d.getMonth()];
      monthArray.push(month)
    }
    return monthArray
  }

  useEffect(()=>{console.log('bdata=',bdata)}, [bdata])
  function openModal(company_name, ques_name) {
    console.log('company=', company_name)
    console.log('ques=', ques_name)
    var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    var month = "September";
    for(var i in months){
        if(months[i] === month){
            month = ++i;
        }
    }
    // const now = new Date();
    // console.log('fy=',now.getFullYear())
    // const firstDay = new Date(now.getFullYear(), month, 1);
    // const lastDay = new Date(now.getFullYear(), month, 0);
    // console.log(firstDay+"\n"+lastDay);
    let firstDate = '1/'+month+'/22'
    let lastDate = '30/'+month+'/22'
    // var s = new Date(2022, month, 1);
    // var e = new Date(2022, ++month, 0);
    // console.log(s+"\n"+e);
    const uploadData = new FormData();
    uploadData.append('company_name', company_name);
    uploadData.append('question_name', ques_name);
    uploadData.append('start_date', firstDate);
    uploadData.append('end_date', lastDate);
    fetch(`https://coeus.redseerconsulting.com/formID/`, {
      method: 'POST',
      body: uploadData
    }).then(data => data.json())
    .then((data) => {
      console.log('data=',data)
      setBdata(data)
      console.log('back_data=', bdata)
      // setFormId(data.report_version_id,()=>{console.log(form_id)})
      const temp_ques_id = data.question_id
      console.log('temp_ques_id=',temp_ques_id)
      setFormId('851')
      setQuesId(temp_ques_id)
    //   function sleep(ms) {
    //     return new Promise(resolve => setTimeout(resolve, ms));
    // }
    // sleep(5000)
      console.log('back_rep_ver_id=', formId)
      console.log('back_ques_id=', quesId)
      setIsOpen(true);
      ques_id = data.question_id
      form_id = data.report_version_id
      console.log('ques_id=', ques_id)
      console.log('new_form_id=', form_id)
      onClickComments(1, ques_id,form_id);
      })
    .catch(error => {
      // setSignIn(false);
      alert('System Error.Contact Admin')
      console.log(error)
  })
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }
  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
        window.removeEventListener('resize', handleWindowSizeChange);
    }
}, []);

  useEffect(() => {
    if(props.Token){
      window.sessionStorage.setItem("token", props.Token);
    }
    if(props.ReportName){
      window.sessionStorage.setItem("ReportName", props.ReportName);
    }
    window.sessionStorage.setItem("events", 'buttonClicked');
    // if(props.pseudo_email){
    //   window.sessionStorage.setItem("pseudo_email", props.pseudo_email);
    // }
  }, [props.Token, props.ReportName]);

  useEffect(()=>{
    // console.log('props=', props)
    let propsrep = ''
    if (props.ReportName){
      propsrep = props.ReportName
    }else{
      propsrep = window.sessionStorage.getItem("ReportName")
    }
    let prop_token = window.sessionStorage.getItem("token")
    let pseudo_email = window.sessionStorage.getItem("pseudo_email")
    console.log('pseudo_email=', pseudo_email)

    console.log('email=', window.sessionStorage.getItem("email"))
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/MSAccessToken/?rep=${propsrep}&email=${pseudo_email}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${prop_token}`
    },
    })
    .then( data => data.json())
    .then(
    data => {
        setAccessToken(data['access_token'])
        setEmbedToken(data['embed_token'])
        setReportUrl(data['report_url'])
        setPages(data['pages'])
        setReportId(data['report_id'])
        setNewUrl(data['report_url'])
        // console.log(reportUrl+'&pageName=ReportSection7446fb261ebfdaa647fa')
    }
    )
    .catch( error => console.error(error))
    
    // replace ott audio below with propsrep
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/PageReports/?rep=${propsrep}`, {
      method:'GET',
      headers:{
        'Content-Type': 'application/json',
      },
    })
    .then(res=>res.json())
    .then(
      res=>{
        console.log('tree=',res)
        setMyPages(res)
      }
    )
},[]);

let handleClick = (Name)=>{
  console.log('name=',Name)
  setNewUrl(reportUrl+'&pageName='+Name)
}

let handleSignOut = ()=>{
  console.log('signout')
  let prop_email = window.sessionStorage.getItem("email")
  let prop_token = window.sessionStorage.getItem("token")
  fetch(`${process.env.REACT_APP_API_ENDPOINT}/logout/?email=${prop_email}`,{
      method:'GET',
      headers:{
        'Content-Type': 'application/json',
        Authorization: `Token ${prop_token}`
      }
    }).then((res) => res.json())
    .then(
      res => {
          console.log('logout= ', res)
      }
      )
      .catch( error => {
        console.error(error)
      })
  sessionStorage.clear();
  window.location.href='/'
}

let handleToggle = ()=>{
  setToggle(!toggle)
}

let gotoMainPage = ()=>{
  window.location.href='/mainpage'
}

const postComment = async(comment, formId, instanceId, questionId)=>{
  console.log('comment=', comment)
  if (comment?.length){
    // let { author, author_email, author_display_picture, message } = comment;
    let author_display_picture = "https://lh3.googleusercontent.com/a/AATXAJx2Vaf3laKf8D7hz6W6c9YgjOK8rEqLsZEk9mzS=s96-c"
    let author_email = 'shahzmaalif@gmail.com'
    let author = author_email.split('@')[0]
    console.log('author=', author)
    const commentObj = {
        id: `RC_${uuid()?.replace(/-/g, "_")}`,
        author,
        author_email,
        author_display_picture,
        created_at: new Date().toUTCString(),
        comment: comment,
        replies: [],
    };

  // console.log('comentObj=',{ commentObj });

  const commentsRef = database.ref(
      `comments/${formId}/${instanceId}/${questionId}`
  );
    // console.log('commentref=', commentsRef)
    console.log('com_form_id=',comments[formId])
    console.log('com_ques_id=',comments[formId][questionId])
  if (comments[formId] && comments[formId][questionId]){
    console.log('works')
    commentsRef.set([...comments[formId][questionId], commentObj]);
  }else{
    console.log('skip')
  }

  }
  else
  {
    throw new Error("Invalid comment!");
  }
};

const addComment = (e) => {
  e.preventDefault();
  let form_curr_instance_id = 851
  let curr_ques_id = 107
  console.log('sub_form_id=', bdata.report_version_id)
  console.log('sub_ques_id=', bdata.question_id)
  postComment(
    comment,
    bdata.report_version_id,
    bdata.report_version_id,
    bdata.question_id
  );
};
const getFormQuestionComments = async (
  formId,
  questionId,
  instanceId,
  callback
) => {
  console.log('formId_call=', formId.length)
  console.log('run_condn=',questionId?.toString().length)
  if (formId?.length && questionId?.toString().length) {
    const prevFormComments = comments[formId];
    console.log('prevFormComm=', prevFormComments)
    if (false) {
      if (prevFormComments[questionId]?.length) {
        console.log("Yes found");
        callback(prevFormComments[questionId]);
      }
    } else {
      console.log('formRef_url=',`/comments/${formId}/${instanceId}/${questionId}`)
      const formRef = database.ref(
        `/comments/${formId}/${instanceId}/${questionId}`
      );
      console.log('formRef_CommentList=', formRef)
      formRef.on("value", async (snap) => {
        const commentsData = (await snap.val()) ?? [];
        console.log('comData=',{ commentsData });
        // console.log("Not found");
        if (prevFormComments) {
          setComments((curr) => ({
            ...curr,
            [formId]: { ...curr[formId], [questionId]: commentsData },
          }));
        } else {
          setComments((curr) => ({
            ...curr,
            [formId]: { [questionId]: commentsData },
          }));
        }
        callback(commentsData);
      });
    }
  } else {
    throw new Error("Invalid questionId or FormId");
  }
};

const onClickComments = async (questionNo, questionId, formId) => {
  setCommentsOpen(!commentsOpen);
  setCommentsData({
    // currentQuestion: questionNo,
    currentQuestionId: questionId,
    comments: [],
  });
  let form_curr_instance_id = 851
  console.log('commetns = ',  questionId)
  console.log('form_id = ',  formId)
  console.log('curr_instance_id = ', form_curr_instance_id)
  // if (!commentsOpen) {
  await getFormQuestionComments(
    formId.toString(),
    questionId,
    formId,
    (comments) => {
      setCommentsData((curr) => ({
        ...curr,
        // currentQuestion: questionNo,
        currentQuestionId: questionId,
        comments,
      }));
    }
  );
  console.log('commentsData = ',commentsData)
  // console.log({ questionId, form_id });
  // }
};

  const addReplyToQuestion = (reply, commentId) => {
    console.log('hello')
  };

let inputChanged = (e) => {
  setComment(e.target.value);
}
let setDropDownValue = (e)=>{
  console.log('value=', e.value)
  setselectedMonth(e.value)
  // console.log('selectedMonth=', selectedMonth)
}


useEffect(()=>{
  console.log('will sign out in 30 min')
  const interval = setTimeout(() => {
    console.log('Logs every minute');
    handleSignOut()
  }, 1000*60*30);

  return () => clearInterval(interval);
},[])

useEffect(()=>{
  setInterval(function () {
    console.log("check token");
    let prop_token = window.sessionStorage.getItem("token")
    let prop_email = window.sessionStorage.getItem("email")
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/validateToken/?email=${prop_email}`,{
      method:'GET',
      headers:{
        'Content-Type': 'application/json',
        Authorization: `Token ${prop_token}`
      }
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }else{
        sessionStorage.clear();
        window.location.href='/'
      }
    })
    .then(
      res => {
          console.log('tokenValidation= ', res)
      }
      )
      .catch( error => {
        console.error(error)
      })
  }, 1000*60*5);
},[])

// sets filter


// useEffect(()=>{
//   window.report.on('buttonClicked',function(event){
//     // console.log('target=',event.detail['title'])
//     let ques_name = event.detail['title']
//     let company_name = ''
//     window.report.getActivePage().then(
//       (activePage=>{
//         activePage.getVisuals().then(
//           (visuals=>{
//             let slicers = visuals.filter(function (visual) {
//               return visual.type === "slicer";
//           });
//             slicers.forEach(async (slicer) => {
//             const state = await slicer.getSlicerState();    
//             // console.log("Slicer name: \"" + slicer.name + "\"\nSlicer state:\n", state);
//             if(state.targets[0].column==="player_name"){
//               company_name=state.filters[0].values[0]
//               openModal(company_name, ques_name)
//             }
    
//         })      
//             // console.log('slicer=', slicers)
//           })
//         )
//       })
//     )
//     // console.log('company_name=', company_name)
//     // console.log('ques_name=', ques_name)
//     // openModal()
//   });
// })

// const options = [
//   'August', 'July', 'June','May', 'April'
// ];
const options = lastSiXMonths()
const defaultOption = options.at(-1);

if(!props.Token){
  if(!window.sessionStorage.getItem("token"))
  {return <Navigate to = "/"/>}
}

  return (
    width>768 ?
        (
        <PageContainer>
          <ProSidebarContainer collapsed={false}>
          <SideBarHeader onClick={()=>gotoMainPage()}>
            <img src= '/Images/benchmark_side.svg' alt= ''/>
          </SideBarHeader>
            <Menu>
              <MenuItem></MenuItem>
              <MenuItem><h5>{window.sessionStorage.getItem("ReportName")}</h5></MenuItem>
              {myPages.map((repver,index)=>{
                return repver.children_page_name.length===0?(
                  <MenuItem key={1} icon={iconDict[repver.page_name]} onClick={()=>handleClick(repver.link)}>
                    {repver.page_name}
                  </MenuItem>
                ):(
                  <SubMenu title={repver.page_name} icon={iconDict[repver.page_name]}>
                    {repver.children_page_name.map(i=>{
                        return(
                          <MenuItem key={i.id} onClick={()=>handleClick(i.link)}>
                              <div style = {{fontFamily:'Arial'}}>{'\u2022'}&nbsp;&nbsp;{i.page_name}</div>
                          </MenuItem>
                        )
                      })}
                  </SubMenu>
                )
              })}
            </Menu>
          </ProSidebarContainer>
          <ReportContainer>
              <User>
                    <Button onClick={openModal}>Comment</Button>
                    <Modal
                      isOpen={modalIsOpen}
                      onAfterOpen={afterOpenModal}
                      onRequestClose={closeModal}
                      style={customStyles}
                      contentLabel="Example Modal"
                    >
                      <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Add comment</h2>
                      <div>
                        {commentsData.comments.map((comObj, index)=>{
                        return (
                          <>
                            <Commenter>
                              <img src = "/Images/user.svg" alt = ""/>
                              {comObj.author}
                            </Commenter>
                            <CommentValue>{comObj.comment}</CommentValue>
                          </>
                          )
                      })}
                      </div>
                      <form>
                        <Dropdown options={options} onChange={(e)=>setDropDownValue(e)}  value={defaultOption} placeholder="Select an option" />
                        <CommentTextInput onChange={(e) => inputChanged(e)}/>
                        <button onClick={(e)=>addComment(e)}>Submit</button>
                      </form>
                    </Modal>

                  {/* <Comments
                    open={commentsOpen}
                    setOpen={setCommentsOpen}
                    comments={commentsData || {}}
                    postCommentOnQuestion={postComment}
                    postReplyOnQuestion={addReplyToQuestion}
                  /> */}
                    <a><img src = "/Images/user.svg" alt = ""/></a>
                        <SignOut onClick={handleSignOut}>
                            <a>Sign Out</a>
                        </SignOut>
              </User>
              <PowerBIEmbed  
                embedConfig = {{
                  type: 'report',   // Supported types: report, dashboard, tile, visual and qna
                  id: reportId,
                  //get from props
                  embedUrl:newUrl,
                  accessToken: EmbedToken,
                  tokenType: models.TokenType.Embed,
                  // filters: [filter1,filter2],
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
                      console.log('Report loaded');
                      console.log('player_name=',window.sessionStorage.getItem("player_name"))
                      const filter = {
                        $schema: "http://powerbi.com/product/schema#advanced",
                        target: {
                            table: "content_data player",
                            column: "player_name"
                        },
                        filterType: models.FilterType.Advanced,
                        logicalOperator: "Is",
                        conditions: [
                            {
                                operator: "Is",
                                value: window.sessionStorage.getItem("player_name")
                            }
                        ]  
                    };
                      let company_name = ''
                      window.report.getActivePage().then(
                        (activePage=>{
                          activePage.getVisuals().then(
                            (visuals=>{
                              let slicers = visuals.filter(function (visual) {
                                return visual.type === "slicer";
                            });
                              slicers.forEach(async (slicer) => {
                              const state = await slicer.getSlicerState();    
                              console.log("Slicer name: \"" + slicer.name + "\"\nSlicer state:\n", state);
                              if(state.targets[0].column==="player_name"){
                                console.log('slicer_name=',slicer.name)
                                let target_slicer = visuals.filter(function (visual) {
                                  return visual.type === "slicer" && visual.name === slicer.name;             
                              })[0];
                                await target_slicer.setSlicerState({ filters: [filter] });
                                // company_name=state.filters[0].values[0]
                                // openModal(company_name, ques_name)
                              }
                              
                      
                          })      
                              // console.log('slicer=', slicers)
                            })
                          )
                        })
                      )
                    }],
                    ['rendered', function () {
                      console.log('report render')
                    }],
                    ['buttonClicked', function(event, report){
                      let ques_name = event.detail['title']
                      let company_name = ''
                      window.report.getActivePage().then(
                        (activePage=>{
                          activePage.getVisuals().then(
                            (visuals=>{
                              let slicers = visuals.filter(function (visual) {
                                return visual.type === "slicer";
                            });
                              slicers.forEach(async (slicer) => {
                              const state = await slicer.getSlicerState();    
                              // console.log("Slicer name: \"" + slicer.name + "\"\nSlicer state:\n", state);
                              if(state.targets[0].column==="player_name"){
                                company_name=state.filters[0].values[0]
                                // company_name=window.sessionStorage.getItem("player_name")
                                openModal(company_name, ques_name)
                              }
                      
                          })      
                              // console.log('slicer=', slicers)
                            })
                          )
                        })
                      )
                    }],
                    ['error', function (event) {console.log(event.detail);}]
                  ])
                }
              
                cssClassName = { "report-style-class" }
                getEmbeddedComponent = {async(embeddedReport) => {
                  // console.log('winRow=', window.report)
                  window.report = embeddedReport ;
                  // window.report.getActivePage().then(
                  //   (activePage=>{console.log(activePage)})
                  // )
                  // console.log('winRow1=', window.report)
                  // const pages = awa(embeddedReport).getPages();
                  // setReport(embeddedReport)
                  // console.log('embedReport=',embeddedReport)
                  // const pages = embeddedReport.getPages();
                  // console.log('pages1=',pages)
                  // const getPages= async (embeddedReport) => {
                  //   console.log('start')
                  //   const pagesgp = await embeddedReport.getPages()
                  //   console.log('pagegp=', pagesgp)
                  //   setReportPages(pagesgp);
                  //   console.log('rp=', ReportPages)
                  //   console.log('done')
                  // };
                
                  // getPages(window.report);
                }
              
              }
                    />
          </ReportContainer>
        </PageContainer>
        ):(
          <PageContainer>
            <ProSidebarContainer collapsed={toggle} width={200}>
            <SideBarHeader onClick={()=>gotoMainPage()}>
              <img src= '/Images/bold_strategy.svg' alt= ''/>
            </SideBarHeader>
              <Menu>
                <MenuItem></MenuItem>
                <MenuItem>{window.sessionStorage.getItem("ReportName")}</MenuItem>
                <MenuItem></MenuItem>
                {myPages.map((repver)=>{
                  return repver.children_page_name.length===0?(
                    <MenuItem icon={iconDict[repver.page_name]} onClick={()=>handleClick(repver.link)}>
                      {repver.page_name}
                    </MenuItem>
                  ):(
                    <SubMenu title={repver.page_name} icon={iconDict[repver.page_name]}>
                      {repver.children_page_name.map(i=>{
                          return(
                            <MenuItem key={i.id} onClick={()=>handleClick(i.link)}>
                                <div style = {{fontFamily:'Arial'}}>{'\u2022'}&nbsp;{i.page_name}</div>
                            </MenuItem>
                          )
                        })}
                    </SubMenu>
                  )
                })}
              </Menu>
            </ProSidebarContainer>
          <ReportContainer>
            <User>
              <ToggleButton onClick={()=>handleToggle()}><img src = "/Images/menu.png"/></ToggleButton>
              <a><img src = "/Images/user.svg" alt = ""/></a>
                  <SignOut onClick={handleSignOut}>
                      <a>Sign Out</a>
                  </SignOut>
            </User>
            <PowerBIEmbed
              embedConfig = {{
                type: 'report',   // Supported types: report, dashboard, tile, visual and qna
                id: reportId,
                //get from props
                // embedUrl: 'https://app.powerbi.com/reportEmbed?reportId=f87ed8df-7267-4a8a-835f-6a786edf57ed&groupId=d786d974-91ce-43e8-a52c-c0e6b402f74f&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLUlORElBLUNFTlRSQUwtQS1QUklNQVJZLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0IiwiZW1iZWRGZWF0dXJlcyI6eyJtb2Rlcm5FbWJlZCI6dHJ1ZSwiYW5ndWxhck9ubHlSZXBvcnRFbWJlZCI6dHJ1ZSwiY2VydGlmaWVkVGVsZW1ldHJ5RW1iZWQiOnRydWUsInVzYWdlTWV0cmljc1ZOZXh0Ijp0cnVlLCJza2lwWm9uZVBhdGNoIjp0cnVlfX0%3d&pageName=ReportSection19fe81eb665f9dc58332&w=2',
                embedUrl:newUrl,
                accessToken: EmbedToken,
                tokenType: models.TokenType.Embed,
                settings: {
                  panes: {
                    filters: {
                      expanded: false,
                      visible: false
                    }
                  },
                }
              }}
              eventHandlers = {
                new Map([
                  [window.sessionStorage.getItem('events'), function(event){
                    openModal();
                  }]
                ])
              }
            
              cssClassName = { "report-style-class" }
              getEmbeddedComponent = { (embeddedReport) => {
                setReport(embeddedReport)
                window.report = embeddedReport ;
              }}
                  />
          </ReportContainer>
          </PageContainer>
        )
  )
}

export default Report;

// const Comments = ({
//   open,
//   setOpen,
//   comments = [],
//   postCommentOnQuestion,
//   postReplyOnQuestion,
// }) => {
//   const { currentUser } = useContext(AuthContext);
//   const [comment, setComment] = useState("");
//   const [commentsLoading, setCommentsLoading] = useState(true);

//   const onSubmitComment = (e) => {
//     e.preventDefault();
//     const commentObj = {
//       author: currentUser.displayName,
//       author_email: currentUser.email,
//       author_display_picture: currentUser.photoURL,
//       message: comment,
//     };
//     postCommentOnQuestion(commentObj);
//     setComment("");
//   };

//   useEffect(() => {
//     if (comments.comments?.length) {
//       setCommentsLoading(false);
//       return;
//     }

//     setTimeout(() => {
//       setCommentsLoading(false);
//     }, 3000);
//   }, [comments.comments, open]);

//   useEffect(() => {
//     return () => {
//       setComment("");
//       setCommentsLoading(true);
//     };
//   }, [open]);
//   return (
//     <Sidebar open={open} setOpen={setOpen}>
//       <div className={styles.commentsContainer}>
//         <IconButton className={styles.closeIcon} onClick={() => setOpen(false)}>
//           <IoMdClose size="20" />
//         </IconButton>
//         <h2>Q{comments.currentQuestion} &nbsp; Comments</h2>
//         <div className={styles.hLine}></div>
//         <form className={styles.commentBox} onSubmit={onSubmitComment}>
//           <InputField
//             variant="normal"
//             placeholder="Type your comment here..."
//             value={comment}
//             required
//             onChange={(e) => setComment(e.target.value)}
//           />
//         </form>
//         <div className={styles.comments}>
//           {!commentsLoading && comments.comments.length ? (
//             comments?.comments?.map((comment) => (
//               <Comment
//                 key={comment?.id}
//                 comment={comment}
//                 onSubmitReply={postReplyOnQuestion}
//               />
//             ))
//           ) : !commentsLoading && !comments.comments.length ? (
//             <div className={styles.notFound}>
//               <p>No comments found</p>
//             </div>
//           ) : (
//             <div className={styles.loading}>
//               <CircularProgress className={styles.circularProgress} />
//             </div>
//           )}
//         </div>
//       </div>
//     </Sidebar>
//   );
// };

// const Comment = ({ comment: commentData, onSubmitReply: submitReply }) => {
//   const [reply, setReply] = useState("");
//   const [replyOpen, setReplyOpen] = useState(false);

//   // useEffect(() => {
//   //   return () => {
//   //     setReply("");
//   //   };
//   // }, [open]);
//   const { currentUser } = useContext(AuthContext);

//   const onSubmitReply = (e) => {
//     e.preventDefault();
//     const commentObj = {
//       author: currentUser.displayName,
//       author_email: currentUser.email,
//       author_display_picture: currentUser.photoURL,
//       message: reply,
//       replied_to: commentData.author_email,
//     };

//     submitReply(commentObj, commentData.id);
//     setReply("");
//   };

//   const onSubmitInnerReply = (commentObj) => {
//     submitReply(commentObj, commentData.id);
//   };

//   return (
//     <div className={styles.comment}>
//       <div className={styles.header}>
//         <div className={styles.displayPicture}>
//           <img src={commentData.author_display_picture} alt="display" />
//         </div>
//         <div className={styles.details}>
//           <h4>{commentData.author}</h4>
//           <p>{getTimeAgo(commentData.created_at)}</p>
//         </div>
//       </div>
//       <div className={styles.content}>
//         <p>{commentData.comment}</p>
//       </div>
//       <button
//         type="button"
//         className={styles.replyBtn}
//         onClick={() => setReplyOpen(!replyOpen)}
//       >
//         Reply
//       </button>
//       {replyOpen && (
//         <form className={styles.commentBox} onSubmit={onSubmitReply}>
//           <InputField
//             variant="normal"
//             placeholder="Type your reply here..."
//             value={reply}
//             onChange={(e) => setReply(e.target.value)}
//             required
//           />
//         </form>
//       )}
//       {commentData?.replies?.length && (
//         <div className={styles.replies}>
//           {commentData?.replies?.map((reply) => (
//             <Reply
//               key={reply?.id}
//               reply={reply}
//               onSubmitReply={onSubmitInnerReply}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// const Reply = ({ reply: replyData, onSubmitReply: submitReply }) => {
//   const [reply, setReply] = useState(`@${replyData.author_email} `);
//   const [replyOpen, setReplyOpen] = useState(false);

//   const { currentUser } = useContext(AuthContext);

//   const onSubmitReply = (e) => {
//     e.preventDefault();
//     const commentObj = {
//       author: currentUser.displayName,
//       author_email: currentUser.email,
//       author_display_picture: currentUser.photoURL,
//       message: reply,
//       replied_to: replyData.author_email,
//     };

//     submitReply(commentObj);
//     setReply("");
//   };

//   return (
//     <div className={styles.comment}>
//       <div className={styles.header}>
//         <div className={styles.displayPicture}>
//           <img src={replyData.author_display_picture} alt="display" />
//         </div>
//         <div className={styles.details}>
//           <h4>{replyData.author}</h4>
//           <p>{getTimeAgo(replyData.created_at)}</p>
//         </div>
//       </div>
//       <div className={styles.content}>
//         <p>{replyData.comment}</p>
//       </div>
//       <button
//         type="button"
//         className={styles.replyBtn}
//         onClick={() => setReplyOpen(!replyOpen)}
//       >
//         Reply
//       </button>
//       {replyOpen && (
//         <form className={styles.commentBox} onSubmit={onSubmitReply}>
//           <InputField
//             variant="normal"
//             placeholder="Type your reply here..."
//             value={reply}
//             onChange={(e) => setReply(e.target.value)}
//             required
//           />
//         </form>
//       )}
//     </div>
//   );
// };

// const InvalidForm = ({ formId }) => {
//   return (
//     <div className={styles.noForms}>
//       <img src={noFormsImage} alt="no-forms-found" />
//       <p>
//         Couldn't find any form assigned to you with the ID:{" "}
//         <strong>{formId}</strong>
//       </p>
//     </div>
//   );
// };

// const getTimeAgo = (date) => {
//   const diff = moment().diff(moment(new Date(date)), "minutes");
//   if (diff < 1) {
//     return "Just now";
//   } else if (diff >= 1440) {
//     return `${Math.floor(diff / 1440)} days ago`;
//   } else if (diff === 1440) {
//     return `${Math.floor(diff / 1440)} day ago`;
//   } else if (diff >= 60) {
//     return `${Math.floor(diff / 60)} hr ago`;
//   } else if (diff >= 1) {
//     return `${diff} min ago`;
//   }
// };

const PageContainer =styled.div`
display:flex;
`
const ToggleButton = styled.button`
/* height:20px; */
/* width:70px; */
border:none;
background-color:white;

`

const ReportContainer = styled.div`
width:80%;
@media (max-width:768px){
    width:100%
}
`
const ProSidebarContainer = styled(ProSidebar)`
width:20%
`
const SidebarContainer = styled.div`
width:21%
`
const SideBarHeader = styled.div`
padding-left:20px;
padding-top:10px;
img{
  height:50px;
}
`

const SignOut = styled.div`
display:none;
position:absolute;
top:48px;
right:25px;
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

@media (max-width:768px){
  display:none;
  position:absolute;
  top:48px;
  right:23px
}
`

const User = styled.div`
/* background-color:#F6F6F6; */
/* display:flex;
align-items:center; */
/* justify-content:center; */
img{
    float:right;
    width:48px;
    height:48px;
    border-radius:50%;
    padding:5px;
    margin-right:20px;
}

&:hover{
    ${SignOut}{
        align-items:center;
        display:flex;
        justify-content:center;
    }
  }
`

const customStyles = {
  content: {
    top: '50%',
    left: '55%',
    right: '45%',
    bottom: 'auto',
    height: 340,
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    overflow:'scroll',
  },
};

const CommentValue = styled.div`
margin-bottom:25px;
`

const Commenter = styled.h4`
img{
  border-radius:50%;
  width:43px;
  height:43px;
  margin-left:5px;
  margin-right:5px;
}
`
const CommentInput = styled.input`
width:42vw;
`

const CommentTextInput = styled.textarea`
width:43vw;
`


