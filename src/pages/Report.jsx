import {PowerBIEmbed} from 'powerbi-client-react';
import {models} from 'powerbi-client';
import styled from 'styled-components';
import './Report.css';
import './Report.scss';
import React, { useState, useEffect } from 'react';
import { ProSidebar, Menu, MenuItem, SubMenu} from 'react-pro-sidebar';
import {Link, Navigate} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { FaAmazon, FaTrafficLight,FaUsers, FaDeezer,FaAlignLeft, FaKeyboard, FaCity } from 'react-icons/fa';
import{MdOutlineSummarize, MdMonetizationOn, MdInsights, MdDashboard} from 'react-icons/md';
import { ImProfile } from "react-icons/im";
import {SiCoveralls, SiSimpleanalytics} from "react-icons/si"
import {FiUsers} from "react-icons/fi"
import {AiOutlineFileSearch} from 'react-icons/ai'
import { GiBreakingChain } from "react-icons/gi";
import { RiMoneyDollarBoxFill } from "react-icons/ri";
import { BiCategory, BiBookContent, BiCartAlt } from "react-icons/bi";
import $ from 'jquery';
import Modal from 'react-modal';
import { firestore, database } from "../utils/auth/firebase";
import { v4 as uuid } from "uuid";
import { useParams, withRouter } from "react-router";
import { Hidden } from '@material-ui/core';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import ReactGA from 'react-ga'
import { useIsMount } from '../utils/custom_hooks/useIsMount';
import { TailSpin } from  'react-loader-spinner'

function Report(props) {
//get id and reporturl and accesstoken from click
  const [ AccessToken, setAccessToken ] = useState('');
  const [report, setReport] = useState(null);
  const [ EmbedToken, setEmbedToken ] = useState('');
  const [ reportUrl, setReportUrl ] = useState('');
  const [ pages, setPages ] = useState([]);
  const [myPages, setMyPages] = useState([]);
  const [pagename, setPageName] = useState([]);
  // is powerbi report id like efcac618-0e1a-4c7f-8e6c-850a686946df
  const [ reportId, setReportId ] = useState('');
  const [ newUrl, setNewUrl ] = useState('');
  const [width, setWidth] = useState(window.innerWidth);
  const [ toggle, setToggle ] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [comments, setComments] = useState({});
  const [bdata, setBdata] = useState({});
  const [comment, setComment] = useState("Hello");
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [excelLoader, setexcelLoader] = useState(false)
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
    'Dashboard':<MdDashboard/>,
    'City Split':<FaCity/>,
    'Supply Chain Metrics':<GiBreakingChain/>,
    'Revenue Metrics':<RiMoneyDollarBoxFill/>,
    'Operational Metrics':<BiCartAlt/>

  })

  let subtitle;

  useEffect(()=>{
    let email = window.localStorage.getItem("email")
    if (email.split('@')[1] in ['redseerconsulting.com','redseer.com' ,'redcore.co','benchmarks.digital','Beeroute.in'] === false){
    ReactGA.pageview(window.location.pathname)
  }

  
  // ReactGA.pageview(window.location.pathname)
  },[])
  
  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  function lastSiXMonths(){
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var today = new Date();
    var d;
    var month;
    var monthArray = [];
    for(var i = 3; i > 0; i -= 1) {
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
    const d = new Date();
    let month_digit = d.getMonth();
    var month = months[month_digit]
    for(var i in months){
        if(months[i] === month){
            month = ++i;
        }
    }
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
      console.log('back_rep_ver_id=', formId)
      console.log('back_ques_id=', quesId)
      setIsOpen(true);
      let ques_id = data.question_id
      let form_id = data.report_version_id
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
      window.localStorage.setItem("token", props.Token);
    }
    if(props.ReportName){
      window.localStorage.setItem("ReportName", props.ReportName);
    }
    window.localStorage.setItem("events", 'buttonClicked');
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
      propsrep = window.localStorage.getItem("ReportName")
    }
    let prop_token = window.localStorage.getItem("token")
    let pseudo_email = window.localStorage.getItem("pseudo_email")
    console.log('pseudo_email=', pseudo_email)

    console.log('email=', window.localStorage.getItem("email"))
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
        console.log('report_id=', data['report_id'])
        // console.log(reportUrl+'&pageName=ReportSection7446fb261ebfdaa647fa')
        if(window.localStorage.getItem("player_name")){
          let player_name = window.localStorage.getItem("player_name")
          fetch(`https://api.benchmarks.digital/player/?name=${player_name}`, {
            method:'GET',
            headers:{
              'Content-Type': 'application/json',
            },
          })
          .then(res=>res.json())
          .then(
            res=>{
              console.log('reportUrl=', data['report_url'])
              console.log('res=',res.powerbi_page)
              setNewUrl(data['report_url']+'&pageName='+res.powerbi_page)
              // window.sessionStorage.setItem('powerbi_page', res.powerbi_page)
            }
          )
        }else{
          setNewUrl(data['report_url'])
        }
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
  setPageName(Name)
  console.log('name=',Name)
  setNewUrl(reportUrl+'&pageName='+Name)
}

let handleSignOut = ()=>{
  console.log('signout')
  let prop_email = window.localStorage.getItem("email")
  let prop_token = window.localStorage.getItem("token")
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
  localStorage.clear();
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
    // let author_email = 'shahzmaalif@gmail.com'
    let author_email = window.localStorage.getItem("email")
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


let inputChanged = (e) => {
  setComment(e.target.value);
}
let setDropDownValue = (e)=>{
  console.log('value=', e.value)
  let val  = e.value
  // setselectedMonth(val, ()=>{
  //   console.log(selectedMonth)
  // })
  setselectedMonth(val)
  console.log('month=', selectedMonth)
  console.log('bdata=', bdata)
}

let downloadExcel = ()=>{
  setexcelLoader(true)
  let client_id = window.localStorage.getItem("clientID")
  let report_name = window.localStorage.getItem("ReportName")
  console.log(client_id, report_name)
  fetch(`${process.env.REACT_APP_API_ENDPOINT}/excel_link/?client_id=${client_id}&report_name=${report_name}`,{
      method:'GET',
      headers:{
        'Content-Type': 'application/json',
        // Authorization: `Token ${prop_token}`
      }
    }).then((res) => res.json())
    .then(
      res => {
          console.log('link= ', res)
          window.open(res['excel_link'], "_blank")
          setexcelLoader(false)
      }
      )
      .catch( error => {
        console.error(error)
      })
}

const isMount = useIsMount();
useEffect(()=>{
  if (isMount){
    console.log('First Render')
  }else{
    console.log('selected_month=',selectedMonth)
    let month = selectedMonth
    var months = ['Zero',"January","February","March","April","May","June","July","August","September","October","November","December"];
    for(var i in months){
      if(months[i] === month){
          month = ++i;
      }
    }
    let firstDate = '1/'+month+'/22'
    let lastDate = '30/'+month+'/22'
    console.log('firstDate=', firstDate)
    const uploadData = new FormData();
    uploadData.append('company_name', 'Swiggy');
    uploadData.append('question_name', "Business Metrics");
    uploadData.append('start_date', firstDate);
    uploadData.append('end_date', lastDate);
    fetch(`https://coeus.redseerconsulting.com/formID/`, {
      method: 'POST',
      body: uploadData
    }).then(data => data.json())
    .then((data) => {
      console.log('data=',data)
      setBdata(data)
      // setFormId(data.report_version_id,()=>{console.log(form_id)})
      setIsOpen(true);
      let ques_id = data.question_id
      let form_id = data.report_version_id
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
}
,[selectedMonth])

useEffect(()=>{
  console.log('will sign out in 30 min')
  const interval = setTimeout(() => {
    console.log('Logs every minute');
    handleSignOut()
  }, 1000*60*30);

  return () => clearInterval(interval);
},[pagename])

useEffect(()=>{
  setInterval(function () {
    console.log("check token");
    let prop_token = window.localStorage.getItem("token")
    let prop_email = window.localStorage.getItem("email")
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
        localStorage.clear();
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

const options = lastSiXMonths()
const defaultOption = options.at(-1);
const datefilter = {



  $schema: "http://powerbi.com/product/schema#basic",



target: {



      table: "date_table",



      column: "date"



  },



  filterType: models.FilterType.Advanced,



  logicalOperator: "And",



  conditions: [



      {



          operator: "GreaterThanOrEqual",



          value: window.localStorage.getItem("start_date")+"T21:00:00.000Z"



      },



      {



          operator: "LessThan",



          value: window.localStorage.getItem("end_date")+"T22:00:00.000Z"



      }



  ]



};



if(!props.Token){
  if(!window.localStorage.getItem("token"))
  {return <Navigate to = "/"/>}
}

  return (
    width>768 ?
        (
        excelLoader===false?(<PageContainer>
          <ProSidebarContainer collapsed={false}>
          <SideBarHeader onClick={()=>gotoMainPage()}>
            <img src= '/Images/benchmark_side.svg' alt= ''/>
          </SideBarHeader>
            <Menu>
              {['redseerconsulting.com','redseer.com' ,'redcore.co','benchmarks.digital','Beeroute.in'].includes(window.localStorage.getItem("email").split('@')[1])?<></>:<MenuItem><button onClick={()=>downloadExcel()}>Excel File</button></MenuItem>}
              <MenuItem><h5>{window.localStorage.getItem("ReportName")}</h5></MenuItem>
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
                  filters: [datefilter],
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
                      if(true){
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
                                  value: window.localStorage.getItem("player_name")
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
                                console.log('slicer_name=',slicer)
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
                      }else{
                        const filter = {

                          $schema: "http://powerbi.com/product/schema#basic",
                      
                          target: {
                      
                              table: "date_table",
                      
                              column: "date"
                      
                          },
                      
                          filterType: models.FilterType.Advanced,
                      
                          logicalOperator: "And",
                      
                          conditions: [
                      
                              {
                      
                                  operator: "GreaterThanOrEqual",
                      
                                  value: "2020-10-12T21:00:00.000Z"
                      
                              },
                      
                              {
                      
                                  operator: "LessThan",
                      
                                  value: "2021-11-28T22:00:00.000Z"
                      
                              }
                      
                          ]
                      
                      };
                      try{
                        report.updateFilters(models.FiltersOperations.Add, [filter]).then(
                          console.log("Report filter was added.")
                        );
                      }catch(error){
                        console.log(error)
                      }
                      }
                    }],
                    ['rendered', function () {
                      console.log('report render')
                      window.report.getActivePage().then(
                        (activePage=>{
                          activePage.getVisuals().then(
                            (visuals=>{
                              let slicers = visuals.filter(function (visual) {
                                return visual.type === "slicer";
                            });
                              slicers.forEach(async (slicer) => {
                              const state = await slicer.getSlicerState();    
                              if(state.targets[0].column==="player_name"){
                                console.log('slicer_name=',slicer)
                              //   let target_slicer = visuals.filter(function (visual) {
                              //     return visual.type === "slicer" && visual.name === slicer.name;             
                              // })[0];
                              //   await target_slicer.setSlicerState({ filters: [filter] });
                              }
                              
                      
                          })      
                            })
                          )
                        })
                      )
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
                    ['error', function (event) {console.log('powerbi_error=',event.detail);}]
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
        </PageContainer>):(<TailSpin
  height="80"
  width="80"
  color="red"
  ariaLabel="tail-spin-loading"
  radius="1"
  wrapperStyle={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}
  wrapperClass=""
  visible={true}
/>)
        ):(
          <PageContainer>
            <ProSidebarContainer collapsed={toggle} width={200}>
            <SideBarHeader onClick={()=>gotoMainPage()}>
              <img src= '/Images/bold_strategy.svg' alt= ''/>
            </SideBarHeader>
              <Menu>
                <MenuItem></MenuItem>
                <MenuItem>{window.localStorage.getItem("ReportName")}</MenuItem>
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
                  [window.localStorage.getItem('events'), function(event){
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


