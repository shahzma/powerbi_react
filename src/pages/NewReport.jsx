import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { ProSidebarProvider } from 'react-pro-sidebar';
import {Menu, MenuItem } from 'react-pro-sidebar';
import { FaAmazon, FaTrafficLight,FaUsers, FaDeezer,FaAlignLeft, FaKeyboard, FaCity } from 'react-icons/fa';
import{MdOutlineSummarize, MdMonetizationOn, MdInsights, MdDashboard} from 'react-icons/md';
import { ImProfile } from "react-icons/im";
import {SiCoveralls, SiSimpleanalytics} from "react-icons/si"
import {FiUsers} from "react-icons/fi"
import {AiOutlineFileSearch} from 'react-icons/ai'
import { GiBreakingChain } from "react-icons/gi";
import { RiMoneyDollarBoxFill } from "react-icons/ri";
import { BiCategory, BiBookContent, BiCartAlt } from "react-icons/bi";
import { ProSidebar, SubMenu} from 'react-pro-sidebar';
import './NewReport.scss';
import {PowerBIEmbed} from 'powerbi-client-react';
import {models} from 'powerbi-client';
import { firestore, database } from "../utils/auth/firebase";
import Modal from 'react-modal';
import Dropdown from 'react-dropdown';
import { v4 as uuid } from "uuid";
import { useIsMount } from '../utils/custom_hooks/useIsMount';
import './NewReport.css';


const NewReport = () => {
    // const { collapseSidebar } = useProSidebar();
    const [myPages, setMyPages] = useState([]);
    const [ toggle, setToggle ] = useState(false);
    const [ reportId, setReportId ] = useState('');
    const [ newUrl, setNewUrl ] = useState('');
    const [ EmbedToken, setEmbedToken ] = useState('');
    const [bdata, setBdata] = useState({});
    let [ formId, setFormId ] = useState('851');
    let [ quesId, setQuesId ] = useState(108);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [comments, setComments] = useState({});
    const [comment, setComment] = useState("Hello");
    const [ AccessToken, setAccessToken ] = useState('');
    const [ reportUrl, setReportUrl ] = useState('');
    const [ pages, setPages ] = useState([]);
    const [pagename, setPageName] = useState([]);
    const [pagenameVerbose, setPageNameVerbose] = useState('');
    const [commentsOpen, setCommentsOpen] = useState(false);
    const [commentsData, setCommentsData] = useState({
      currentQuestion: 1,
      currentQuestionId: "",
      comments: [],
    });
    let [ selectedMonth, setselectedMonth] = useState('August');
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
        'Operational Metrics':<BiCartAlt/>,
        'Social Commerce Specific':<MdMonetizationOn/>
      })
      let subtitle;

      useEffect(()=>{
        // console.log('props=', props)
        let propsrep = window.localStorage.getItem("ReportName")
        // propsrep = window.localStorage.getItem("ReportName")
        let prop_token = window.localStorage.getItem("token")
        let pseudo_email = 'Gladebrook@redseerconsulting.com'
        // let pseudo_email = window.localStorage.getItem("pseudo_email")
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

      let gotoMainPage = ()=>{
        window.location.href='/mainpage'
      }
      let handleClick = (Name, NameVerbose)=>{
        setPageName(Name)
        setPageNameVerbose(NameVerbose)
        console.log('name=',Name)
        setNewUrl(reportUrl+'&pageName='+Name)
      }

      let handleToggle = ()=>{
        setToggle(!toggle)
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
      const options = lastSiXMonths()
      const defaultOption = options.at(-1);
      let today = new Date();
      let hour = today.getHours();

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
  return (
    <>
        <PageHeader>
            <div><img src = '/Images/benchmark_logo.png' alt = ''/></div> <div>About</div> <div>Products</div><div>Articles</div><div>{hour<15?'Good Morning ':'Good Evening '}<img src = "/Images/user.svg" alt = "" style={{width: '3vw', borderRadius:'40px'}}/></div>
        </PageHeader>
        <div>Hello</div>
        <BodyContainer>
            <ProSidebarContainer collapsed={toggle}>
            {/* <SideBarHeader onClick={()=>gotoMainPage()}>
              <img src= '/Images/bold_strategy.svg' alt= ''/>
            </SideBarHeader> */}
              <Menu>
                <MenuItem></MenuItem>
                <MenuItem><button onClick={()=>handleToggle()}><img src = "/Images/menu.png" style={{width: '20px', height:'15px'}}/></button></MenuItem>
                <MenuItem></MenuItem>
                {myPages.map((repver)=>{
                  return repver.children_page_name.length===0?(
                    <ProMenuItem icon={iconDict[repver.page_name]} onClick={()=>handleClick(repver.link, repver.page_name)}>
                      {repver.page_name}
                    </ProMenuItem>
                  ):(
                    <ProSubMenu title={repver.page_name} icon={iconDict[repver.page_name]}>
                      {repver.children_page_name.map(i=>{
                          return(
                            <ProMenuItem key={i.id} onClick={()=>handleClick(i.link, i.page_name)}>
                                <div style = {{fontFamily:'Arial'}}>{'\u2022'}&nbsp;{i.page_name}</div>
                            </ProMenuItem>
                          )
                        })}
                    </ProSubMenu>
                  )
                })}
                {/* <ProMenuItem icon={<FaAmazon fontSize="1.5em"/>}>Winds of death</ProMenuItem>
                <ProMenuItem icon={<FaAmazon fontSize="1.5em"/>}>Purple sun of xereus</ProMenuItem>
                <ProMenuItem icon={<FaAmazon fontSize="1.5em"/>}>Doom And Darkness</ProMenuItem> */}
                {/* <ProMenuDivItem icon={<FaAmazon fontSize="1.5em"/>}>Doom And Darkness</ProMenuDivItem> */}
              </Menu>
            </ProSidebarContainer>
            <PowerbiContainer>
                <BreadCrumbTop>
                  <h2 style={{'marginLeft':'3.5vw', 'marginTop':'1vh'}}>{window.localStorage.getItem("ReportName")}</h2>
                  <div  style={{'marginLeft':'3.5vw'}}>
                  <a href='/newmainpage'>Home</a> / {window.localStorage.getItem("ReportName")} / {pagenameVerbose}
                  </div>
                  <div>
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
                  </div>
                </BreadCrumbTop>
                <PowerBiDiv>
                  <PowerBIEmbed
                  embedConfig = {{
                    type: 'report',   // Supported types: report, dashboard, tile, visual and qna
                    id: reportId,
                    //get from props
                    embedUrl:'https://app.powerbi.com/reportEmbed?reportId=f87ed8df-7267-4a8a-835f-6a786edf57ed&groupId=d786d974-91ce-43e8-a52c-c0e6b402f74f&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLUlORElBLUNFTlRSQUwtQS1QUklNQVJZLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0IiwiZW1iZWRGZWF0dXJlcyI6eyJtb2Rlcm5FbWJlZCI6dHJ1ZSwiYW5ndWxhck9ubHlSZXBvcnRFbWJlZCI6dHJ1ZSwiY2VydGlmaWVkVGVsZW1ldHJ5RW1iZWQiOnRydWUsInVzYWdlTWV0cmljc1ZOZXh0Ijp0cnVlLCJza2lwWm9uZVBhdGNoIjp0cnVlfX0%3d&pageName=ReportSection19fe81eb665f9dc58332&w=2',
                    // embedUrl:newUrl,
                    accessToken: EmbedToken,
                    tokenType: models.TokenType.Embed,
                    // filters: [datefilter],
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
                </PowerBiDiv>
            </PowerbiContainer>
        </BodyContainer>
    </>
  )
}

export default NewReport

const PageContainer = styled.div`

`
const PageHeader = styled.div`
height:10vh;
background-color:#F9FAFB;
display:flex;
justify-content:center;
align-items:center;
gap:12vw;

`

const BodyContainer = styled.div`
    display:flex;
    height:90vh;
`

const SidebarContainer = styled.div`
    
`
const PowerbiContainer = styled.div`
    width:100%;
    overflow-y:hidden;
    display:flex;
    flex-direction:column;
    height:90vh;
`
const BreadCrumbTop = styled.div`
  min-height:10vh;
`
const PowerBiDiv = styled.div`
  overflow-y:hidden;
`

const SideBarHeader = styled.div`
padding-left:20px;
padding-top:10px;
img{
  height:50px;
}
`

const ProMenu = styled(Menu)`

`

const ProSubMenu = styled(SubMenu)`
  color:white !important;
  &:hover{
    background-color:#2323C8;
    border-radius:5px;
}
`
const ProMenuItem = styled(MenuItem)`
font-size: 15px !important;
color:white !important;
&:hover{
    /* background-color:#18183F; */
    background-color:#2323C8;
    border-radius:5px;
}
/* &::selection{
  background-color:green !important;
} */
`
const ProMenuDivItem = styled.div`
    &:hover{
        background-color:#18183F;
        color:white;
    }
`

const ProSidebarContainer = styled(ProSidebar)`
width:20%;
`
const BreadCrumbContainer = styled.div`
    height:5vh;
    /* display:flex;
    justify-content:center;
    align-items:center; */
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

const Commenter = styled.h4`
img{
  border-radius:50%;
  width:43px;
  height:43px;
  margin-left:5px;
  margin-right:5px;
}`

const CommentValue = styled.div`
margin-bottom:25px;
`
const CommentTextInput = styled.textarea`
width:43vw;
`