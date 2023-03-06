import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { ProSidebarProvider } from 'react-pro-sidebar';
import {Menu, MenuItem } from 'react-pro-sidebar';
import { FaAmazon, FaTrafficLight,FaUsers, FaDeezer,FaAlignLeft, FaKeyboard, FaCity } from 'react-icons/fa';
import{MdOutlineSummarize, MdMonetizationOn, MdInsights, MdDashboard, MdOutlinePersonalVideo} from 'react-icons/md';
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { ImProfile } from "react-icons/im";
import {SiCoveralls, SiSimpleanalytics} from "react-icons/si"
import {FiUsers} from "react-icons/fi"
import {AiOutlineFileSearch, AiOutlineMobile , AiTwotoneVideoCamera} from 'react-icons/ai'
import { GiBreakingChain, GiConsoleController, GiEvilFork, GiHealthNormal, GiCarWheel, GiClothes,GiMedicines,GiFruitBowl, GiVideoConference, GiHamburgerMenu } from "react-icons/gi";
import { RiMoneyDollarBoxFill } from "react-icons/ri";
import {GoFileSymlinkDirectory} from 'react-icons/go'
import { BiCategory, BiBookContent, BiCartAlt, BiFridge } from "react-icons/bi";
import { IoFastFood } from "react-icons/io5";
import {FaCarAlt, FaBusinessTime ,FaBabyCarriage, FaRegFileAudio} from 'react-icons/fa';
import {BsGear, BsArrowBarRight, BsArrowBarLeft} from 'react-icons/bs'
import{ImConnection} from 'react-icons/im'
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
import TreeMenu from 'react-simple-tree-menu';
// import default minimal styling or your own styling
import '../../node_modules/react-simple-tree-menu/dist/main.css'
import Head from '../components/Head/Head';
import { ListGroupItem, Input, ListGroup } from 'reactstrap';
import { FallingLines, TailSpin } from  'react-loader-spinner'
import {Link, Navigate} from 'react-router-dom';
import 'react-dropdown/style.css';
import SelectSearch from 'react-select-search';
import 'react-select-search/style.css'


const NewReport = () => {
    // const { collapseSidebar } = useProSidebar();
    const [myPages, setMyPages] = useState([]);
    const [allNodes,setallNodes] = useState([])
    const [selectedpage, setSelectedPage] = useState('Consumer Internet')
    const [ toggle, setToggle ] = useState(false);
    const [treemenucollapse, settreeMenuColapse] = useState(true);
    const [showcurrencybar, setshowCurrencyBar] = useState(false);
    const [ reportId, setReportId ] = useState('');
    const [ newUrl, setNewUrl ] = useState('');
    const [ EmbedToken, setEmbedToken ] = useState('');
    const [bdata, setBdata] = useState({});
    let [ formId, setFormId ] = useState('851');
    let [ quesId, setQuesId ] = useState(108);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [moneymodalIsOpen, setMoneyModalIsOpen] = useState(false);
    const [currencytype, setCurrencyType] = useState('')
    const [currencyval, setCurrencyVal] = useState(75)
    const [currencyarr, setCurrencyArr] = useState([])
    const [comments, setComments] = useState({});
    const [comment, setComment] = useState("Hello");
    const [ AccessToken, setAccessToken ] = useState('');
    const [ reportUrl, setReportUrl ] = useState('');
    const [ pages, setPages ] = useState([]);
    const [pagename, setPageName] = useState([]);
    const [pagenameVerbose, setPageNameVerbose] = useState('');
    const [commentsOpen, setCommentsOpen] = useState(false);
    const [newReportPages, setnewReportPages] = useState([]);
    const [reportarr, setNewReportArr] = useState([])
    const [searchVal , setsearchVal] = useState(null);
    const [treearr, setTreearr] = useState([])
    const [filterarr, setfilterarr] = useState([])
    const [activeIndex, setActiveIndex] = useState(0);
    const [yearIndex, setyearIndex] = useState(0);
    const [conversiontype, setConversionType] = useState('Custom')
    const [showLoader, setshowLoader] = useState(false);
    const [showReport, setshowReport] = useState(false);
    const [showDropDown, setShowDropDown] = useState(false);
    const [dropDownData, setDropDownData] = useState([])
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
        'Online Retail':<BiCartAlt/>,
        'Social Commerce Specific':<MdMonetizationOn/>,
        'Food Delivery':<IoFastFood/>,
        'Used Cars':<FaCarAlt/>,
        'Real Money Gaming':<RiMoneyDollarBoxFill/>,
        'Edtech':<BiBookContent/>,
        'Ehealth':<GiHealthNormal/>,
        'Mobility':<GiCarWheel/>,
        'D2C Omni':<GoFileSymlinkDirectory/>,
        'Eb2b':<FaBusinessTime/>,
        'Consumer Internet':<ImConnection/>,
        // 'Baby Care':<FaBabyCarriage/>,
        // 'Mobile':<AiOutlineMobile/>,
        // 'Fashion':<GiClothes/>,
        'Electronics & Large/Small appliances':<BiFridge/>,
        'Epharma':<GiMedicines/>,
        // 'Grocery':<GiFruitBowl/>,
        'Shortform Video':<GiVideoConference/>,
        'OTT_Video':<AiTwotoneVideoCamera/>,
        'OTT Audio':<FaRegFileAudio/>,
        'Content S&M':<BiBookContent/>,
        'Sector Summary (WIP)':<MdOutlineSummarize/>,
        'Sector Summary 2.0 (WIP)':<MdOutlineSummarize/>,
        'Company Profile (WIP)':<ImProfile />,
        'Overall (WIP)':<SiCoveralls/>,
        'Category (WIP)':<BiCategory/>,
        'Amazon Specific (WIP)':<FaAmazon />,
        'Traffic (WIP)':<FaTrafficLight/>,
        'Engagement (WIP)':<FaUsers/>,
        'Streams Analysis (WIP)':<SiSimpleanalytics/>,
        'Monetization (WIP)':<MdMonetizationOn/>,
        'User Profile (WIP)':<FiUsers/>,
        'Engagement Profile (WIP)':<AiOutlineFileSearch/>,
        'Sector Insights (WIP)':<MdInsights/>,
        'Online Education (WIP)':<BiBookContent/>,
        'Top Line Estimates (WIP)':<FaDeezer/>,
        'Fulfilment Metrics (WIP)':<FaAlignLeft/>,
        'Unit Economics (WIP)':<MdMonetizationOn/>,
        'Keyboard (WIP)':<FaKeyboard/>,
        'Dashboard (WIP)':<MdDashboard/>,
        'City Split (WIP)':<FaCity/>,
        'Supply Chain Metrics (WIP)':<GiBreakingChain/>,
        'Revenue Metrics (WIP)':<RiMoneyDollarBoxFill/>,
        'Operational Metrics (WIP)':<BiCartAlt/>,
        'Online Retail (WIP)':<BiCartAlt/>,
        'Online Retail (WIP) (WIP)':<BiCartAlt/>,
        'Social Commerce Specific (WIP)':<MdMonetizationOn/>,
        'Food Tech (WIP)':<IoFastFood/>,
        'Used Cars (WIP)':<FaCarAlt/>,
        'Real Money Gaming (WIP)':<RiMoneyDollarBoxFill/>,
        'EdTech (WIP)':<BiBookContent/>,
        'eHealth (WIP)':<GiHealthNormal/>,
        'Ride Hailing (WIP)':<GiCarWheel/>,
        'D2C Omni (WIP)':<GoFileSymlinkDirectory/>,
        'eB2B (WIP)':<FaBusinessTime/>,
        'Consumer Internet (WIP)':<ImConnection/>,
        'Baby Care (WIP)':<FaBabyCarriage/>,
        'Mobile (WIP)':<AiOutlineMobile/>,
        'Fashion (WIP)':<GiClothes/>,
        'Electronics & Large/Small appliances (WIP)':<BiFridge/>,
        'Epharma (WIP)':<GiMedicines/>,
        'Grocery (WIP)':<GiFruitBowl/>,
        'Shortform Video (WIP)':<GiVideoConference/>,
        'OTT_Video (WIP)':<AiTwotoneVideoCamera/>,
        'OTT Audio (WIP)':<FaRegFileAudio/>,
        'Content S&M (WIP)':<BiBookContent/>,
        'Digital Content (WIP)':<MdOutlinePersonalVideo/>,

      })
      let subtitle
            

      useEffect(()=>{
        // //console.log('props=', props)
        // let propsrep = window.localStorage.getItem("ReportName")
        // // propsrep = window.localStorage.getItem("ReportName")
        // let prop_token = window.localStorage.getItem("token")
        // let pseudo_email = 'Gladebrook@redseerconsulting.com'
        // // let pseudo_email = window.localStorage.getItem("pseudo_email")
        // //console.log('pseudo_email=', pseudo_email)
    
        // //console.log('email=', window.localStorage.getItem("email"))
        // fetch(`${process.env.REACT_APP_API_ENDPOINT}/MSAccessToken/?rep=${propsrep}&email=${pseudo_email}`, {
        // method: 'GET',
        // headers: {
        //     'Content-Type': 'application/json',
        //     Authorization: `Token ${prop_token}`
        // },
        // })
        // .then( data => data.json())
        // .then(
        // data => {
    
        //     setAccessToken(data['access_token'])
        //     setEmbedToken(data['embed_token'])
        //     setReportUrl(data['report_url'])
        //     setPages(data['pages'])
        //     setReportId(data['report_id'])
        //     //console.log('report_id=', data['report_id'])
        //     // //console.log(reportUrl+'&pageName=ReportSection7446fb261ebfdaa647fa')
        //     if(window.localStorage.getItem("player_name")){
        //       let player_name = window.localStorage.getItem("player_name")
        //       fetch(`https://api.benchmarks.digital/player/?name=${player_name}`, {
        //         method:'GET',
        //         headers:{
        //           'Content-Type': 'application/json',
        //         },
        //       })
        //       .then(res=>res.json())
        //       .then(
        //         res=>{
        //           //console.log('reportUrl=', data['report_url'])
        //           //console.log('res=',res.powerbi_page)
        //           setNewUrl(data['report_url']+'&pageName='+res.powerbi_page)
        //           // window.sessionStorage.setItem('powerbi_page', res.powerbi_page)
        //         }
        //       )
        //     }else{
        //       setNewUrl(data['report_url'])
        //     }
        // }
        // )
        // .catch( error => console.error(error))
        
        // replace ott audio below with propsrep
        // fetch(`${process.env.REACT_APP_API_ENDPOINT}/PageReports/?rep=${propsrep}`, {
        //   method:'GET',
        //   headers:{
        //     'Content-Type': 'application/json',
        //   },
        // })
        // .then(res=>res.json())
        // .then(
        //   res=>{
        //     //console.log('tree=',res)
        //     setMyPages(res)
        //   }
        // )

        fetch(`${process.env.REACT_APP_API_ENDPOINT}/newreports/?rep=Consumer Internet`, {
          method:'GET',
          headers:{
            'Content-Type': 'application/json',
          },
        })
        .then(res=>res.json())
        .then(
          res=>{
            setMyPages(res)
            setallNodes(res)
          }
        )
        let client_id = window.localStorage.getItem('clientID')
        console.log('cid=', client_id)
        fetch(`${process.env.REACT_APP_API_ENDPOINT}/newreportaccess/?client_id=${client_id}`, {
          method:'GET',
          headers:{
            'Content-Type': 'application/json',
          },
        })
        .then(res=>res.json())
        .then(
          res=>{
            setNewReportArr(res)
          }
        )
    },[]);
    const isMount = useIsMount();
    useEffect(()=>{
      if (isMount){
        //console.log('First Render')
      }else{
        //console.log('selected_month=',selectedMonth)
        let month = selectedMonth
        var months = ['Zero',"January","February","March","April","May","June","July","August","September","October","November","December"];
        for(var i in months){
          if(months[i] === month){
              month = ++i;
          }
        }
        let firstDate = '1/'+month+'/22'
        let lastDate = '30/'+month+'/22'
        //console.log('firstDate=', firstDate)
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
          //console.log('data=',data)
          setBdata(data)
          // setFormId(data.report_version_id,()=>{//console.log(form_id)})
          setIsOpen(true);
          let ques_id = data.question_id
          let form_id = data.report_version_id
          //console.log('ques_id=', ques_id)
          //console.log('new_form_id=', form_id)
          onClickComments(1, ques_id,form_id);
          })
        .catch(error => {
          // setSignIn(false);
          alert('System Error.Contact Admin')
          //console.log(error)
        })
      }
    }
    ,[selectedMonth])

    useEffect(()=>{
      let email = window.localStorage.getItem('email')
      // fetch(`${process.env.REACT_APP_API_ENDPOINT}/usercurrency/?email=${email}`, {
      //   method:'GET',
      //   headers:{
      //     'Content-Type': 'application/json',
      //   },
      // })
      // .then(res=>res.json())
      // .then(
      //   res=>{
      //     //console.log('email_arr',res)
      //     setCurrencyArr(res)
      //   }
      // )
    }, [])

      let gotoMainPage = ()=>{
        window.location.href='/mainpage'
      }
      let handleClick = (Name, NameVerbose)=>{
        setPageName(Name)
        setPageNameVerbose(NameVerbose)
        //console.log('name=',Name)
        setNewUrl(reportUrl+'&pageName='+Name)
      }

      async function executeAfterLoop(res,arr) {
        await new Promise(resolve => {
          for (let i = 0; i < res.length; i++) {
            let pseudo_email = 'digital@redseerconsulting.com'
              let prop_token = ''
              // powerbireport name and not report name form table
              // let propsrep = res[i].report_name
              let propsrep = res[i]['report_name']
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
                  // //console.log(res[0])
                  // //console.log(data['embed_token'])
                  res[i]['embed_token'] = data['embed_token']
                  arr.push(data['embed_token'])
                }
                )
                .catch( error => console.error(error))
          }
          resolve();
        });
        //console.log('Loop finished');
      }

      let handleClickTree = (reportname, key, node_type)=>{
        setshowLoader(true)
        console.log('node_type', node_type)
        if (reportname === 'Horizontals Home'){
          fetch(`${process.env.REACT_APP_API_ENDPOINT}/nodechildren/?key=${71}`, {
            method:'GET',
            headers:{
              'Content-Type': 'application/json',
            },
          })
          .then(res=>res.json())
          .then(
            res =>{
              console.log('res = ', res )
              setShowDropDown(true)
              setDropDownData(res)
            }
          )

        }else if(key === -1){
          console.log('report = ', reportname)
          window.localStorage.setItem('report' , reportname)
          setfilterarr(['1'])
          // we want to continue showing drop down
          setShowDropDown(true)
        }
        else{
          setShowDropDown(false)
        }
        fetch(`${process.env.REACT_APP_API_ENDPOINT}/newreportpages/?rep=${reportname}`, {
          method:'GET',
          headers:{
            'Content-Type': 'application/json',
          },
        })
        .then(res=>res.json())
        .then(
          res=>{
            let arr = []
            // executeAfterLoop(res,arr)
            // for(var i = 0; i<res.length; i++){
            //   let pseudo_email = 'digital@redseerconsulting.com'
            //   let prop_token = ''
            //   // powerbireport name and not report name form table
            //   // let propsrep = res[i].report_name
            //   let propsrep = 'OTT Audio'
            //   fetch(`${process.env.REACT_APP_API_ENDPOINT}/MSAccessToken/?rep=${propsrep}&email=${pseudo_email}`, {
            //     method: 'GET',
            //     headers: {
            //         'Content-Type': 'application/json',
            //         Authorization: `Token ${prop_token}`
            //     },
            //     })
            //     .then( data => data.json())
            //     .then(
            //     data => {
            //       // //console.log(res[0])
            //       arr.push(data['embed_token'])
            //     }
            //     )
            //     .catch( error => console.error(error))

            // }
            for(let i = 0; i<reportarr.length; i++){
              if(reportarr[i].report_name===reportname){
                if(reportarr[i].report_pages.length===0){
                  console.log('show_all_pages')
                  setshowReport(true)
                }else{
                  let pages = reportarr[i].report_pages
                  res = res.filter(value => pages.includes(value.id));  
                  setshowReport(true)         
                }
                break
              }else{
                setshowReport(false)
              }
            }
            setnewReportPages(res)
            setshowLoader(false)
            console.log('res=', res)
            
          }
        )
        //console.log(reportname)
      }

      let handleToggle = ()=>{
        setToggle(!toggle)
      }

      let getNodeName = (key,all_nodes) =>{
        let nodes = all_nodes
        for(let i =0; i<nodes.length;i++){
          // search in top layer
          if(nodes[i].key==key){
            // //console.log('lognode=',nodes[i])
            return nodes[i].label
          }else{
            if(nodes[i].nodes.length>0){
              let node_name = getNodeName(key, nodes[i].nodes)
              if(node_name){
                return node_name
              }
            }else{
              //console.log('node array was empty')
            }
          }

        }
        // return labels correponding to key
      }

      const getParents = (props)=>{
        let parent_string_arr = props.parent.split('/')
        // ['9', '25', '26', '44']
        let parents = []
        let all_nodes = allNodes
        // my pages is a list with tree structure
        if(parent_string_arr[0]!==''){
          for(let i =0; i<parent_string_arr.length; i++){
            let nodename = getNodeName(parent_string_arr[i],all_nodes)
            if(nodename){
              parents.push(nodename)
            }
          }
        }
        return parents
      }
      const DEFAULT_PADDING = 16;
      const ICON_SIZE = 3;
      const LEVEL_SPACE = 8

      const ToggleIcon = ({ on }) => <span style={{ marginRight: 8 }}>{on ? <IoIosArrowDown/> : <IoIosArrowForward/>}</span>;
      // listitem is functional component
      const ListItem = ({
        level = 0,
        hasNodes,
        isOpen,
        label,
        searchTerm,
        openNodes,
        toggleNode,
        matchSearch,
        focused,
        key,
        ...props
      }) => (
        <ListGroupItem
        // props enabling clicking/navigating nodes
          {...props}
          style={{
            paddingLeft:  ICON_SIZE + level * LEVEL_SPACE,
            cursor: 'pointer',
            boxShadow: focused ? '0px 0px 5px 0px #222' : 'none',
            zIndex: focused ? 999 : 'unset',
            position: 'relative',
            backgroundColor:'#18183E',
            border:'none',
            zIndex:10
            // '&:hover':{
            //   backgroundColor:'red'
            // }
          }}
          onClick={e => {
            // this onclick conflicts with oclick defined below
            // make your get parents function here
            window.reports = []
            let parent_arr = getParents(props)
            parent_arr.push(label)
            // setTreearr(parent_arr)
            if(hasNodes===false){
              window.localStorage.setItem('report', label)
              if(props.finalized){
                setshowCurrencyBar(true)
                window.localStorage.setItem('finalized', 'true')
              }else{
                setshowCurrencyBar(false)
                window.localStorage.setItem('finalized', 'false')
              }
              if(props.filter!==null && props.filter!==''){
                setfilterarr(props.filter.split(','))
                console.log('filter = ', props.filter.split(','))
              }else{
                setfilterarr([])
                console.log('nofilter')
              }
              setSelectedPage(label)
              setTreearr(parent_arr)
              let arr = currencyarr
              let currency_type = window.localStorage.getItem('currency')
              if(currency_type==='USD'){
                setActiveIndex(1)
              }else{
                setActiveIndex(0)
              }
              let year_type = window.localStorage.getItem('year')
              if(year_type==='CY'){
                setyearIndex(0)
              }else{
                setyearIndex(1)
              }
              // for (let i= 0; i<arr.length;i++){
              //   if(arr[i].report===label){
              //     if(arr[i].currency==='USD'){
              //       setActiveIndex(1)
              //       window.localStorage.setItem('currency', 'USD')
              //     }else{
              //       setActiveIndex(0)
              //       window.localStorage.setItem('currency', 'INR')
              //     }
              //     if(arr[i].year==='CY'){
              //       setyearIndex(0)
              //       window.localStorage.setItem('year','CY')
              //     }else{
              //       setyearIndex(1)
              //       window.localStorage.setItem('year','FY')
              //     }
              //   break
              //   }
              // }
            }
            //console.log('props=', props.finalized)
            

            // check if page/report is actually availableto the user
            let available = true

            if(hasNodes && toggleNode){
              toggleNode()
            }else{
              // 
              handleClickTree(label, props.key_val, props.node_type)
            }
            e.stopPropagation();
          }}
        >
          <div style={{display:'flex', justifyContent:'space-between'}}>
            <div>{iconDict[label]} {label}</div>
            {hasNodes && (
              <div
                style={{ display: 'inline-block' }}
                // onClick={e => {
                //   if(hasNodes && toggleNode){
                //     toggleNode()
                //   }
                //   // hasNodes && toggleNode && toggleNode();
                //   e.stopPropagation();
                // }}
              >
                <ToggleIcon on={isOpen} />
              </div>
            )}
          </div>
        </ListGroupItem>
      );

      const postComment = async(comment, formId, instanceId, questionId)=>{
        //console.log('comment=', comment)
        if (comment?.length){
          // let { author, author_email, author_display_picture, message } = comment;
          let author_display_picture = "https://lh3.googleusercontent.com/a/AATXAJx2Vaf3laKf8D7hz6W6c9YgjOK8rEqLsZEk9mzS=s96-c"
          // let author_email = 'shahzmaalif@gmail.com'
          let author_email = window.localStorage.getItem("email")
          let author = author_email.split('@')[0]
          //console.log('author=', author)
          const commentObj = {
              id: `RC_${uuid()?.replace(/-/g, "_")}`,
              author,
              author_email,
              author_display_picture,
              created_at: new Date().toUTCString(),
              comment: comment,
              replies: [],
          };
      
        // //console.log('comentObj=',{ commentObj });
      
        const commentsRef = database.ref(
            `comments/${formId}/${instanceId}/${questionId}`
        );
          // //console.log('commentref=', commentsRef)
          //console.log('com_form_id=',comments[formId])
          //console.log('com_ques_id=',comments[formId][questionId])
        if (comments[formId] && comments[formId][questionId]){
          //console.log('works')
          commentsRef.set([...comments[formId][questionId], commentObj]);
        }else{
          //console.log('skip')
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
        //console.log('sub_form_id=', bdata.report_version_id)
        //console.log('sub_ques_id=', bdata.question_id)
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
        //console.log('formId_call=', formId.length)
        //console.log('run_condn=',questionId?.toString().length)
        if (formId?.length && questionId?.toString().length) {
          const prevFormComments = comments[formId];
          //console.log('prevFormComm=', prevFormComments)
          if (false) {
            if (prevFormComments[questionId]?.length) {
              //console.log("Yes found");
              callback(prevFormComments[questionId]);
            }
          } else {
            //console.log('formRef_url=',`/comments/${formId}/${instanceId}/${questionId}`)
            const formRef = database.ref(
              `/comments/${formId}/${instanceId}/${questionId}`
            );
            //console.log('formRef_CommentList=', formRef)
            formRef.on("value", async (snap) => {
              const commentsData = (await snap.val()) ?? [];
              //console.log('comData=',{ commentsData });
              // //console.log("Not found");
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
        //console.log('commetns = ',  questionId)
        //console.log('form_id = ',  formId)
        //console.log('curr_instance_id = ', form_curr_instance_id)
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
        //console.log('commentsData = ',commentsData)
        // //console.log({ questionId, form_id });
        // }
      };

      function openModal(company_name, ques_name) {
        //console.log('company=', company_name)
        //console.log('ques=', ques_name)
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
        // //console.log(s+"\n"+e);
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
          //console.log('data=',data)
          setBdata(data)
          //console.log('back_data=', bdata)
          // setFormId(data.report_version_id,()=>{//console.log(form_id)})
          const temp_ques_id = data.question_id
          //console.log('temp_ques_id=',temp_ques_id)
          setFormId('851')
          setQuesId(temp_ques_id)
          //console.log('back_rep_ver_id=', formId)
          //console.log('back_ques_id=', quesId)
          setIsOpen(true);
          let ques_id = data.question_id
          let form_id = data.report_version_id
          //console.log('ques_id=', ques_id)
          //console.log('new_form_id=', form_id)
          onClickComments(1, ques_id,form_id);
          })
        .catch(error => {
          // setSignIn(false);
          alert('System Error.Contact Admin')
          //console.log(error)
      })
      }
      function afterOpenModal() {
        // references are now sync'd and can be accessed.
        // subtitle.style.color = '#f00';
        //console.log('modalopen')
      }
      function closeModal() {
        setIsOpen(false);
        setMoneyModalIsOpen(false);
      }
      let inputChanged = (e) => {
        setComment(e.target.value);
      }

      let setDropDownValueMonth = (e)=>{
        //console.log('value=', e.value)
        let val  = e.value
        // setselectedMonth(val, ()=>{
        //   //console.log(selectedMonth)
        // })
        setselectedMonth(val)
        //console.log('month=', selectedMonth)
        //console.log('bdata=', bdata)
      }

      let applyPlayer = (e)=>{
        let val = e.label
        console.log('player=', val)

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

      const p_options = [
        {name: 'Swedish', value: 'sv'},
        {name: 'English', value: 'en'},
        {
            type: 'group',
            name: 'Group name',
            items: [
                {name: 'Spanish', value: 'es'},
            ]
        },
    ];
      const platform_option = dropDownData
      const defaultPlatformOption = platform_option[0];

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
      const currencyFilter = {$schema:"http://powerbi.com/product/schema#basic",target:{table:"CurrencyTable", "column":"Currency"},operator:"In",values:["INR"],filterType:models.FilterType.BasicFilter};
      
      const basicFilter = {
        $schema: "http://powerbi.com/product/schema#basic",
        target: {
          table: "content_data main_data",
        "column": "Players"},
      
        operator: "In",
        values: [window.localStorage.getItem('report')],
        filterType: models.FilterType.BasicFilter
      };

      let filter_arr = [datefilter]
      for(let i=0; i<filterarr.length;i++){
        console.log('val = ',filterarr[i])
        if(filterarr[i]==1){
          console.log('works')
          filter_arr.push(basicFilter)
        }
      }
      console.log('filter_len=', filter_arr.length)
      // if (['Amazon', 'Flipkart', 'Meesho', 'Paytm mall', 'Shopclues', 'Shoppee', 'Snapdeal', 'Tatacliq'].includes(window.localStorage.getItem('report'))){
      //   filter_arr.push(basicFilter)
      // }

      const treeData = [
        {
          key: 'first-level-node-1',
          label: 'Death',
          name:'pain', // any other props you need, e.g. url
          nodes: [
            {
              key: 'second-level-node-1',
              label: 'cote',
              name:'killer',
              nodes: [
                {
                  key: 'third-level-node-1',
                  label: 'code',
                  name:'purgatory',
                  nodes: [] // you can remove the nodes property or leave it as an empty array
                },
              ],
            },
          ],
        },
        {
          key: 'first-level-node-2',
          label: 'geass',
          name:'plain'
        },
      ];

      const getNodesForRender = (nodes, searchTerm = null) => {
        const nodesForRender = [];
        //console.log('searchval=', searchVal)
        if (searchVal) {

          for (let itemIdx = 0; itemIdx < nodes.length; itemIdx++) {
            if (nodes[itemIdx].hasNodes===true){

            }
            if (nodes[itemIdx].name.includes(searchVal)){
              nodesForRender.push(nodes[itemIdx])
            }

          }
        // const filteredData = nodes.filter(node => node.name.includes(searchVal));
        //console.log(nodesForRender)
        return nodesForRender
        } else {
         return nodes
        }
      };

      let handleSearch=(e)=>{
        setsearchVal(e.target.value);
      }
      let handleCurrencyClick = (index) => {
        setActiveIndex(index);
        if(index===0){
          window.localStorage.setItem('currency', 'INR')
          //console.log(window.localStorage.getItem('currency'))
          setCurrencyType('INR')
        }else{
          window.localStorage.setItem('currency', 'USD')
          //console.log(window.localStorage.getItem('currency'))
          setCurrencyType('USD')
        }

        const money_converter = {
          $schema: "http://powerbi.com/product/schema#advanced",
          target: {
              table: "Currency Table",
              column: "Currency"
          },
          filterType: models.FilterType.Advanced,
          logicalOperator: "Is",
          conditions: [
              {
                  operator: "Is",
                  value: window.localStorage.getItem('currency')
              }
          ] 
        }
        for(let i = 0; i<window.reports.length; i++){
          window.reports[i].getActivePage().then(
            (activePage=>{
              activePage.getVisuals().then(
                (visuals=>{
                  let slicers = visuals.filter(function (visual) {
                    return visual.type === "slicer";
                });
                  slicers.forEach(async (slicer) => {
                  const state = await slicer.getSlicerState();  
                  
                  if(state.targets[0].column==='Currency'){
                    let target_slicer = visuals.filter(function (visual) {
                      return visual.type === "slicer" && visual.name === slicer.name;             
                  })[0];
                    await target_slicer.setSlicerState({ filters: [money_converter] });
                  }
              })      
                })
              )
            })
          )
        }
        // let curr = window.localStorage.getItem('currency')
        // let year = window.localStorage.getItem('year')
        // let email = window.localStorage.getItem('email')
        // const uploadData = new FormData();
        // uploadData.append('email', email);
        // uploadData.append('year', year);
        // uploadData.append('currency', curr)
        // fetch(`${process.env.REACT_APP_API_ENDPOINT}/usercurrency/`, {
        //     method: 'POST',
        //     body: uploadData
        //   }).then(data => data.json())
        //   .then( data => {
        //         console.log(data)
        //     })
        //   .catch(error => {
        //     // setSignIn(false);
        //     alert('System Error.Contact Admin')
        //     console.log(error)
        // })

      };
      let handleYearClick = (index) =>{
        setyearIndex(index);
        if(index===0){
          window.localStorage.setItem('year', 'CY')
        }else{
          window.localStorage.setItem('year', 'FY')
        }

        const year_converter = {
          $schema: "http://powerbi.com/product/schema#advanced",
          target: {
              table: "Date Parameter",
              column: "Year_Type"
          },
          filterType: models.FilterType.Advanced,
          logicalOperator: "Is",
          conditions: [
              {
                  operator: "Is",
                  value: window.localStorage.getItem('year')
              }
          ]
        }
        //console.log('wrs = ', window.reports)
        for(let i= 0;i<window.reports.length; i++){
          window.reports[i].getActivePage().then(
            (activePage=>{
              activePage.getVisuals().then(
                (visuals=>{
                  let slicers = visuals.filter(function (visual) {
                    return visual.type === "slicer";
                });
                  slicers.forEach(async (slicer) => {
                  const state = await slicer.getSlicerState();  
  
                  if(state.targets[0].column==='Year_Type'){
                    let target_slicer = visuals.filter(function (visual) {
                      return visual.type === "slicer" && visual.name === slicer.name;             
                  })[0];
                    await target_slicer.setSlicerState({ filters: [year_converter] });
                  }
              })      
                })
              )
            })
          )
        }


      }
      let handleGearClick = ()=>{
        let val = window.localStorage.getItem('currency_val')
        let conversion_type = window.localStorage.getItem('conversion_type')
        if(conversion_type!==null){
          setConversionType(conversion_type)
        }else{
          setConversionType('Custom')
        }
        if(val!==null){
          console.log(val)
          setCurrencyVal(val)
        }else{
          setCurrencyVal(75)
        }
        setMoneyModalIsOpen(true)
      }

      let incCurrency = ()=>{
        let new_curr = currencyval+1
        if(new_curr>85){
          new_curr=85
        }
        setCurrencyVal(new_curr)
      }
      let decCurrency = ()=>{
        let new_curr = currencyval-1
        if(new_curr<65){
          new_curr = 65
        }
        setCurrencyVal(new_curr)

      }

      let handlemodalSubmitClicked = ()=>{

        if(conversiontype==='Custom'){
          //console.log('custom')
          // //console.log(currencyval)
          window.localStorage.setItem('conversion_type', 'Custom')
          console.log(window.localStorage.getItem('conversion_type'))
          console.log(currencyval)
          window.localStorage.setItem('currency_val', currencyval)
          const currency_valuation = {
            $schema: "http://powerbi.com/product/schema#advanced",
            target: {
                table: "Currency input",
                column: "Currency input"
            },
            filterType: models.FilterType.Advanced,
            logicalOperator: "Is",
            conditions: [
                {
                    operator: "Is",
                    value: currencyval
                }
            ] 
          }
          const usd_selector  = {
            $schema: "http://powerbi.com/product/schema#advanced",
            target: {
                table: "Currency_USD_Type",
                column: "Type"
            },
            filterType: models.FilterType.Advanced,
            logicalOperator: "Is",
            conditions: [
                {
                    operator: "Is",
                    value: conversiontype
                }
            ] 
          }
          //console.log('wrs=', window.reports)

          for (let i =0;i<window.reports.length;i++){
            window.reports[i].getActivePage().then(
              (activePage=>{
                activePage.getVisuals().then(
                  (visuals=>{
                    // //console.log('visuals=',visuals)
                    let slicers = visuals.filter(function (visual) {
                      return visual.type === "slicer";
                  }
                  );
                    slicers.forEach(async (slicer) => {
                      const state = await slicer.getSlicerState();    
                      //console.log("Slicer name: \"" + slicer.name + "\"\nSlicer state:\n", state);
  
                      //not using state as it will change on page load.page laod code for 1st
                      
                      if(state.targets[0].column==="Type"){
                        let target_slicer = visuals.filter(function (visual) {
                          return visual.type === "slicer" && visual.name === slicer.name;             
                      })[0];
                        await target_slicer.setSlicerState({ filters: [usd_selector] });
                      }

                      if(state.targets[0].column==="Currency input"){
                        let custom_usd_slicer = visuals.filter(function (visual) {
                          return visual.type === "slicer" && visual.name === slicer.name;             
                      })[0]
                        await custom_usd_slicer.setSlicerState({ filters: [currency_valuation] });
                      }
  
                })      
                    // //console.log('slicer=', slicers)
                  })
                )
              })
            )
          }
        }else{
          window.localStorage.setItem('conversion_type', 'Dynamic')
          console.log(window.localStorage.getItem('conversion_type'))
          const usd_selector  = {
            $schema: "http://powerbi.com/product/schema#advanced",
            target: {
                table: "Currency_USD_Type",
                column: "Type"
            },
            filterType: models.FilterType.Advanced,
            logicalOperator: "Is",
            conditions: [
                {
                    operator: "Is",
                    value: conversiontype
                }
            ] 
          }
          for(let i=0;i<window.reports.length;i++){
            window.reports[i].getActivePage().then(
              (activePage=>{
                activePage.getVisuals().then(
                  (visuals=>{
                    // //console.log('visuals=',visuals)
                    let slicers = visuals.filter(function (visual) {
                      return visual.type === "slicer";
                  }
                  );
                    slicers.forEach(async (slicer) => {
                      const state = await slicer.getSlicerState();    
                      //console.log("Slicer name: \"" + slicer.name + "\"\nSlicer state:\n", state);
  
                      //not using state as it will change on page load.page laod code for 1st
                      
                      if(state.targets[0].column==="Type"){
                        let target_slicer = visuals.filter(function (visual) {
                          return visual.type === "slicer" && visual.name === slicer.name;             
                      })[0];
                        await target_slicer.setSlicerState({ filters: [usd_selector] });
                      }
  
                })      
                    // //console.log('slicer=', slicers)
                  })
                )
              })
            )
          }
        }
        setMoneyModalIsOpen(false);
      }

      let handleTreeMenuCollapse = ()=>{
        settreeMenuColapse(!treemenucollapse)
        
        for(let i = 0; i<window.reports.length;i++){
          window.reports[i].getActivePage().then(
            (activePage=>{
              let active_ht = activePage.defaultSize.height
              let active_width = activePage.defaultSize.width
              let width = document.getElementsByClassName('report-style-class-newreport'+i)[0].offsetWidth;
              let ht = ((active_ht/active_width)*width)
              //console.log(active_ht,active_width, width,ht)
              document.getElementsByClassName('report-style-class-newreport'+i)[0].style.height = ht+'px';
              }))
  
        }
        }
      if(window.localStorage.getItem('loginStatus')!=='true'){
        return <Navigate to = "/signin"/>
      }
  return (
    <>
        {/* <PageHeader>
            <div><img src = '/Images/benchmark_logo.png' alt = ''/></div> <div>About</div> <div>Products</div><div>Articles</div><div>{hour<15?'Good Morning ':'Good Evening '} <img src = "/Images/user.svg" alt = "" style={{width: '3vw', borderRadius:'40px'}}/></div>
        </PageHeader> */}
        <Head/>
        <BodyContainer>

            <SideMenuContainer width={treemenucollapse ? '25vw' : '10px'}>
              <TreeMenu
              data={myPages}
              initialOpenNodes = {['9']}
              onClickItem={({ key, label, ...props }) => {
              }}
              >
                {({ search, items, searchTerm }) => {
                  // const nodesForRender = getNodesForRender(items, searchTerm);
                  return (
                  <div style={{paddingLeft:'10px'}}>
                    {/* <Input onChange={(e) => handleSearch(e)} placeholder="Type and search"/> */}
                    <Input style = {{'padding':'5px', 'width':'14vw'}}onChange={e => search(e.target.value)} placeholder="Type and search" />
                    <button style={{'marginLeft':'10px', 'height':'42px', 'borderRadius':'8px', 'width':'50px', 'backgroundColor':'white'}} onClick = {handleTreeMenuCollapse}><GiHamburgerMenu/></button>
                    <ListGroup>
                      {items.map(props => (
                        //  listitem is functional component. this is same as when you create a seprate react file which 
                        // exports some component and that component renders something after consuming some props
                        <ListItem {...props} />
                      ))}
                    </ListGroup>
                  </div>
            )}}
            </TreeMenu>
            </SideMenuContainer>
            
            {/* // Use any third-party UI framework */}
              {showLoader===false?<PowerbiContainer>
                  <BreadCrumbTop>
                    <div style={treemenucollapse?{'marginLeft':'2.9vw', 'display':'flex', 'alignItems':'center'}:{'marginLeft':'3.8vw', 'display':'flex', 'alignItems':'center'}}>
                      {treemenucollapse?<></>:<button  style={{'height':'42px', 'borderRadius':'8px', 'width':'50px', 'backgroundColor':'white', }} onClick={handleTreeMenuCollapse}><GiHamburgerMenu/></button>}
                      <span style = {{ 'marginLeft':'5px', 'marginRight':'15px','fontSize':'33px', 'fontWeight':'bold', 'fontFamily':'system-ui'}}>{selectedpage}</span>
                      {/* {showDropDown?<Dropdown options={platform_option} onChange={(e)=>{handleClickTree(e.label, -1 , '-1')}}  placeholder="Select Platform" />:<></>} */}
                      {showDropDown?<SelectSearch options={platform_option} name="language" search placeholder="Choose Platform"  onChange={(e)=>{handleClickTree(e, -1 , '-1')}}/>:<></>}
                    </div>
                    <div  style={treemenucollapse?{'marginLeft':'3.3vw' ,'marginBottom':'10px'}:{'marginLeft':'3.8vw' ,'marginBottom':'10px'}}>
                    {/* <a href='/newmainpage'>Home</a> / {window.localStorage.getItem("ReportName")} / {pagenameVerbose} */}
                    Products/ {treearr.length>0?<>{treearr.join(" / ")}</>:<>Consumer Internet</>}
                    </div>
                    {showcurrencybar?<Currency marginLeft = {treemenucollapse?'3.3vw':'3.8vw'}columns={treemenucollapse?'2fr 0.15fr 1fr 0.1fr 0.4fr 3.25fr 1fr 0.1fr':'2fr 0.15fr 1fr 0.1fr 0.4fr 3.39fr 0.85fr 0.11fr'}>
                      <Descurr>Please select your desired currency</Descurr>
                      <Inr>
                        <Currencybutton bgcolor={activeIndex === 0 ? '#26CDCC' : '#EAEAEA'}
                         color={activeIndex === 1 ? '#333333' : '#333333'}
                        onClick={() => handleCurrencyClick(0)}>
                          INR
                        </Currencybutton>
                        <Currencybutton bgcolor={activeIndex === 1 ? '#26CDCC' : '#EAEAEA'}
                        color={activeIndex === 1 ? '#333333' : '#333333'}
                        onClick={() => handleCurrencyClick(1)}>
                          USD
                        </Currencybutton>
                      </Inr>
                      <Gear><BsGear style={{ 'fontSize': "20px" }} onClick={()=>handleGearClick()}/></Gear>
                      <Cyfy>
                      <Currencybutton bgcolor={yearIndex === 0 ? '#26CDCC' : '#EAEAEA'}
                         color={yearIndex === 1 ? '#333333' : '#333333'}
                        onClick={() => handleYearClick(0)}>CY</Currencybutton>
                        <Currencybutton bgcolor={yearIndex === 1 ? '#26CDCC' : '#EAEAEA'}
                        color={yearIndex === 0 ? '#333333' : '#333333'}
                        onClick={() => handleYearClick(1)}>FY</Currencybutton>
                      </Cyfy>
                    </Currency>:<></>}
                    <div>
                    {/* <Modal
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
                            <Dropdown options={options} onChange={(e)=>setDropDownValueMonth(e)}  value={defaultOption} placeholder="Select an option" />
                            <CommentTextInput onChange={(e) => inputChanged(e)}/>
                            <button onClick={(e)=>addComment(e)}>Submit</button>
                          </form>
                      </Modal> */}
                      <Modal
                      isOpen={moneymodalIsOpen}
                      onAfterOpen={afterOpenModal}
                      onRequestClose={closeModal}
                      style={customStyles}
                      contentLabel="Example Modal"
                    >
                      <div>Please select USD conversion rate</div>
                      <form>
                      <input type="radio" id="html" name="fav_language"  onClick={()=>{setConversionType('Dynamic')}} value = 'Dynamic'checked={conversiontype === 'Dynamic'}/>
                      <label  style={{'marginLeft':'5px'}}>Dynamic</label><br/>
                      <input type="radio" id="css" name="fav_language" onClick={()=>{setConversionType('Custom')}} value="Custom" checked={conversiontype === 'Custom'}/>
                      <label  style={{'marginLeft':'5px'}}> Custom</label><br/>
                      </form>
                      <div>
                        <button style={{'marginRight':'5px', 'borderRadius':'5px', 'width':'30px'}} onClick = {decCurrency}>-</button>
                        <input  value={currencyval}/>
                        <button style={{'marginLeft':'5px', 'borderRadius':'5px', 'width':'30px'}} onClick = {incCurrency}>+</button>
                      </div>
                      <button style={{'color':'white', 'backgroundColor':'#4867AA','marginTop':'10px', 'borderRadius':'6px'}} onClick={handlemodalSubmitClicked}>Submit</button>
                    </Modal>
                    </div>
                  </BreadCrumbTop>
                {showReport?<PowerBiDiv>
                {newReportPages.map((index,i) => {
                  return(
                  <div key={index.id}>
                    <PowerBIEmbed
                     embedConfig = {{
                      type: 'report',   // Supported types: report, dashboard, tile, visual and qna
                      id: index['powerbi_report_id'],
                      //get from props
                      embedUrl:index['url'],
                      accessToken: index['embed'],
                      tokenType: models.TokenType.Embed,
                      filters: filter_arr,
                      settings: {
                        // background:models.BackgroundType.Transparent,
                        layoutType:models.LayoutType.Custom,
                        customLayout:{
                          displayOption:models.DisplayOption.FitToPage
                        },
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
                        ['loaded', async function (event, report) {
                          //console.log('Report loaded');
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
                          // filter if there is a player in dropdown menu instead of page
                          const filter_player_dropdown = {
                            $schema: "http://powerbi.com/product/schema#advanced",
                              target: {
                                  table: "content_data main_data",
                                  column: "Players"
                              },
                              filterType: models.FilterType.Advanced,
                              logicalOperator: "Is",
                              conditions: [
                                  {
                                      operator: "Is",
                                      value: window.localStorage.getItem('drop_dn_player_name')
                                  }
                              ]
                          }
                          const money_converter = {
                            $schema: "http://powerbi.com/product/schema#advanced",
                            target: {
                                table: "Currency Table",
                                column: "Currency"
                            },
                            filterType: models.FilterType.Advanced,
                            logicalOperator: "Is",
                            conditions: [
                                {
                                    operator: "Is",
                                    value: window.localStorage.getItem('currency')
                                }
                            ]
                          }
                          const year_converter = {
                            $schema: "http://powerbi.com/product/schema#advanced",
                            target: {
                                table: "Date Parameter",
                                column: "Year_Type"
                            },
                            filterType: models.FilterType.Advanced,
                            logicalOperator: "Is",
                            conditions: [
                                {
                                    operator: "Is",
                                    value: window.localStorage.getItem('year')
                                }
                            ]
                          }
                          const currency_valuation = {
                            $schema: "http://powerbi.com/product/schema#advanced",
                            target: {
                                table: "Currency input",
                                column: "Currency input"
                            },
                            filterType: models.FilterType.Advanced,
                            logicalOperator: "Is",
                            conditions: [
                                {
                                    operator: "Is",
                                    value: 71
                                }
                            ]
                          }
                          const usd_selector  = {
                            $schema: "http://powerbi.com/product/schema#advanced",
                            target: {
                                table: "Currency_USD_Type",
                                column: "Type"
                            },
                            filterType: models.FilterType.Advanced,
                            logicalOperator: "Is",
                            conditions: [
                                {
                                    operator: "Is",
                                    value: 'Custom'
                                }
                            ]
                          }
              
                          // let window_reports = window.reports
                          // //console.log('wr',window_reports)
                          // let pages_arr = await window.report.getPages()
                          // //console.log('newreps=',index)
                          // pages_arr.map((element, i)=>{
                          //   //console.log(element,i)
                          // })
                          report.getActivePage().then(
                            (activePage=>{
                              let active_ht = activePage.defaultSize.height
                              let active_width = activePage.defaultSize.width
                              let width = document.getElementsByClassName('report-style-class-newreport'+i)[0].offsetWidth;
                              let ht = ((active_ht/active_width)*width)
                              if(i==0){
                                if(window.localStorage.getItem('finalized')==='false'){
                                  document.getElementsByClassName('report-style-class-newreport'+i)[0].style.marginTop = '-6vh';
                                }
                              }
                              document.getElementsByClassName('report-style-class-newreport'+i)[0].style.height = ht+'px';
                              document.getElementsByClassName('report-style-class-newreport'+i)[0].style.backgroundColor = '#F5F8FC'
                              document.getElementsByClassName('report-style-class-newreport'+i)[0].children[0].style.border = '0px';
                              document.getElementsByClassName('report-style-class-newreport'+i)[0].children[0].style.backgroundColor = '#F5F8FC';
                              // document.getElementsByClassName('report-style-class-newreport'+i)[0].style.width = activePage.defaultSize.width+'px';
                              activePage.getVisuals().then(
                                (visuals=>{
                                  // //console.log('visuals=',visuals)
                                  let slicers = visuals.filter(function (visual) {
                                    return visual.type === "slicer";
                                }
                                );
                                  slicers.forEach(async (slicer) => {
                                    const state = await slicer.getSlicerState();
                                    //console.log("Slicer name: \"" + slicer.name + "\"\nSlicer state:\n", state);
                                    if(state.targets[0].column==="player_name"){
                                      //console.log('slicer_name=',slicer)
                                      let target_slicer = visuals.filter(function (visual) {
                                        return visual.type === "slicer" && visual.name === slicer.name;
                                    })[0];
                                      await target_slicer.setSlicerState({ filters: [filter] });
                                    }
                                    //not using state as it will change on page load.page laod code for 1st
                                    if(state.targets[0].column==='Players' && window.localStorage.getItem('filter_on_company')==='true'){
                                      let target_slicer = visuals.filter(function (visual) {
                                        return visual.type === "slicer" && visual.name === slicer.name;
                                    })[0];
                                      await target_slicer.setSlicerState({ filters: [filter_player_dropdown] });
                                    }
                                    if(state.targets[0].column==='Currency'){
                                      let target_slicer = visuals.filter(function (visual) {
                                        return visual.type === "slicer" && visual.name === slicer.name;
                                    })[0];
                                      await target_slicer.setSlicerState({ filters: [money_converter] });
                                    }
                                    if(state.targets[0].column==='Year_Type'){
                                      let target_slicer = visuals.filter(function (visual) {
                                        return visual.type === "slicer" && visual.name === slicer.name;
                                    })[0];
                                      await target_slicer.setSlicerState({ filters: [year_converter] });
                                    }
                              })
                                  // //console.log('slicer=', slicers)
                                })
                              )
                            })
                          )
                          }
                        }],
                        ['rendered', function () {
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
                                  // //console.log("Slicer name: \"" + slicer.name + "\"\nSlicer state:\n", state);
                                  if(state.targets[0].column==="player_name"){
                                    company_name=state.filters[0].values[0]
                                    // company_name=window.sessionStorage.getItem("player_name")
                                    openModal(company_name, ques_name)
                                  }
              
                              })
                                  // //console.log('slicer=', slicers)
                                })
                              )
                            })
                          )
                        }],
                        ['error', function (event) {console.log('powerbi_error=',event.detail);}]
                      ])
                    }
              
                    cssClassName = { "report-style-class-newreport"+i}
                    getEmbeddedComponent = {async(embeddedReport) => {
                      if(window.reports === undefined) {
                        window.reports=[]
                      }
                      window.reports.push(embeddedReport);
                      console.log(window.reports)
                    }
              
                  }
                   />
                  </div>
                )})}
                  </PowerBiDiv>:<>
                 <Subscription>
                    Subscribe for report
                 </Subscription>
                  </>}
              </PowerbiContainer>:<TailSpin
  height="80"
  width="80"
  color="#18183E"
  ariaLabel="tail-spin-loading"
  radius="1"
  wrapperStyle={{ position: "fixed", top: "50%", left: "60%", transform: "translate(-50%, -50%)"}}
  wrapperClass=""
  visible={true}
/>}
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
    min-height:90vh;
`

const SidebarContainer = styled.div`
    
`
const PowerbiContainer = styled.div`
    width:110%;
    /* overflow-y:hidden; */
    display:flex;
    flex-direction:column;
    min-height:90vh;
    background-color:#F5F8FC;
    margin-left:-25px;
    margin-right:-20px;
    
`
const BreadCrumbTop = styled.div`
  min-height:10vh;
  background-color:#F5F8FC;
`
const Currency = styled.div`
  margin-left:${props => props.marginLeft};
  margin-bottom:10px;
  display: grid; 
  grid-auto-rows: 1fr; 
  grid-template-columns: ${props => props.columns}; 
  grid-template-rows: 1fr; 
  gap: 0px 0px; 
  grid-template-areas: 
    "Descurr . Inr . Gear .  Cyfy .";
`
const Descurr = styled.div`
  grid-area:Descurr;
  line-height:34px;
`
const Inr = styled.div`
  grid-area:Inr;
`
const Gear = styled.div`
  grid-area:Gear;
  line-height:34px;
  /* background-color:Blue; */
`
const Cyfy = styled.div`
  grid-area:Cyfy;
  /* background-color:Green; */
`

const Currencybutton = styled.button`
background-color: ${props => props.bgcolor};
color:${props => props.color};
border: 1px solid black;
width:58px;
height:34px;
font-size:14px;
outline: none;
`
const PowerBiDiv = styled.div`
/* prevent overflow on select somehow */
  overflow-y:hidden;

`

const Subscription = styled.div`
  display:flex;
  align-items:center;
  justify-content:center;
  color:black;
  font-family:system-ui;
  font-size:48px;
  min-height:70vh;
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
const SideMenuContainer = styled.div`
  overflow-y:hidden;
  overflow-x:hidden;
  width:${props=>props.width};
  background-color:#18183E;
  color:white;
  z-index:10;
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
    height: 230,
    width:400,
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
