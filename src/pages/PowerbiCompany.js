import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Head from '../components/Head/Head'
import {models} from 'powerbi-client';
import {PowerBIEmbed} from 'powerbi-client-react';
import { FallingLines, TailSpin } from  'react-loader-spinner'
import {Link, Navigate} from 'react-router-dom';
import TreeMenu from 'react-simple-tree-menu';
import { ListGroupItem, Input, ListGroup } from 'reactstrap';
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import {BsGear, BsArrowBarRight, BsArrowBarLeft, BsFillCloudArrowDownFill, BsTag} from 'react-icons/bs'
import { GiBreakingChain, GiConsoleController, GiEvilFork, GiHealthNormal, GiCarWheel, GiClothes,GiMedicines,GiFruitBowl, GiVideoConference, GiHamburgerMenu, GiZigArrow } from "react-icons/gi";
import Modal from 'react-modal';
import Sidebar from '../components/Sidebar/Sidebar';


const PowerbiCompany = () => {
    const [newReportPages, setnewReportPages] = useState([])
    const [allNodes,setallNodes] = useState([])
    const [treearr, setTreearr] = useState([])
    const [labelSelected, setLabelSelected] = useState(null);
    const [myPages, setMyPages] = useState([]);
    const [showLoader, setshowLoader] = useState(false);
    const [treemenucollapse, settreeMenuColapse] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);
    const [yearIndex, setyearIndex] = useState(0);
    const [currencytype, setCurrencyType] = useState('')
    const [currencyval, setCurrencyVal] = useState(75)
    const [currencyarr, setCurrencyArr] = useState([])
    const [conversiontype, setConversionType] = useState('Custom')
    const [moneymodalIsOpen, setMoneyModalIsOpen] = useState(false);
    const [showDropDown, setShowDropDown] = useState(false);
    const [modalIsOpen, setIsOpen] = useState(false);

    useEffect(()=>{
        setshowLoader(true)
        let reportname = window.localStorage.getItem('searchcompany')
        let reportid = window.localStorage.getItem('searchreportid')
        reportid = parseInt(reportid)
        let prop_token = window.localStorage.getItem('token')
        fetch(`${process.env.REACT_APP_API_ENDPOINT}/newreportpages/?rep_id=${reportid}`, {
            method:'GET',
            headers:{
              'Content-Type': 'application/json',
              Authorization: `Token ${prop_token}`
            }
          })
          .then(res=>res.json())
          .then(
            res=>{
              console.log(reportname,res)
              setnewReportPages(res)
              setshowLoader(false)
              // console.log('res=', res)
            //   const basicFilter = {
            //     $schema: "http://powerbi.com/product/schema#basic",
            //     target: {
            //       table: "content_data main_data",
            //     "column": "Players"},
              
            //     operator: "In",
            //     values: [newReportPages[0].filter_value],
            //     filterType: models.FilterType.BasicFilter
            //   };
            // let filter_arr = [basicFilter]
            // setFilterArr(filter_arr)
            }
          )
    }, [])
    
    useEffect(()=>{
      fetch(`${process.env.REACT_APP_API_ENDPOINT}/newreports/?rep=Company Performance`, {
        method:'GET',
        headers:{
          'Content-Type': 'application/json',
        },
      })
      .then(res=>res.json())
      .then(
        res=>{
          setMyPages(res)
        }
      )
    },[])
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

    let handleClickTree = (label, key_val, node_type)=>{
      console.log('lkn=',label, key_val, node_type)
    }

    let handleSetOnClickValues = (selectedOption, showcurrencybar, filterarr, filterVal,activeIndex, yearIndex)=>{
      console.log('handlesetonclick=',selectedOption, showcurrencybar, filterarr, filterVal,activeIndex, yearIndex)
    }

    const DEFAULT_PADDING = 16;
    const ICON_SIZE = 3;
    const LEVEL_SPACE = 10

    const ToggleIcon = ({ on }) => <span style={{ marginRight: 8 }}>{on ? <IoIosArrowDown/> : <IoIosArrowForward/>}</span>;

    const ListItem = ({
      level = 0,
      hasNodes,
      isOpen,
      label,
      subscribed = false,
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
          cursor: level!==0?'pointer':'auto',
          boxShadow: focused ? '0px 0px 5px 0px #222' : 'none',
          zIndex: focused ? 999 : 'unset',
          position: 'relative',
          // backgroundColor:'#18183E', 
          backgroundColor:labelSelected===label & level !== 0?'#2323C8':'#18183E',
          color:'white',
          fontWeight:'bold',
          border:'none',
          // zIndex:10,
          fontSize:20,
          // '&:hover':{    does not work. Onhover does not work inline styling
          //   backgroundColor:'red'
          // }
        }}
        onClick={e => {
            // this onclick conflicts with oclick defined below
            // make your get parents function here
          window.reports = []
          setLabelSelected(label)
          if(hasNodes && toggleNode){
            if(level===0){
              console.log('toggle diabled')
            }else{
              toggleNode()
            }
          }else{
            console.log('hello')
            let parent_arr = getParents(props)
            parent_arr.push(label)
            setTreearr(parent_arr)
            // handleClickTree(label, props.key_val, props.node_type)
          }
          e.stopPropagation();
        }}
      >
        <div style={{display:'flex', justifyContent:'space-between'}}>
        <div>{label}</div>
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
              {/* <ToggleIcon on={isOpen} /> */}
              {level!==0?<ToggleIcon on={isOpen} />:<ToggleButton  display = {treemenucollapse?'block':'none'} onClick = {handleTreeMenuCollapse}><GiHamburgerMenu/></ToggleButton>}
            </div>
          )}
          
        </div>
      </ListGroupItem>
    );
    
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
            let width = document.getElementsByClassName('report-style-class-search'+i)[0].offsetWidth;
            let ht = ((active_ht/active_width)*width)
            // console.log(active_ht,active_width, width,ht)
            document.getElementsByClassName('report-style-class-search'+i)[0].style.height = ht+'px';
            }))

      }
      }

    let handlesetTreearr = (arr)=>{
      setTreearr(arr)
      console.log('treearr = ', arr)
    }



    const basicFilter = {
        $schema: "http://powerbi.com/product/schema#basic",
        target: {
          table: "content_data main_data",
        "column": "Players"},
      
        operator: "In",
        values: [window.localStorage.getItem('searchfilterval')],
        filterType: models.FilterType.BasicFilter
      };
    let filter_arr = [basicFilter]

    if(window.localStorage.getItem('loginStatus')!=='true'){
        return <Navigate to = "/"/>
      }

      // const treeData = [
      //   {
      //     key: 'first-level-node-1',
      //     label: 'Death',
      //     name:'pain', // any other props you need, e.g. url
      //     nodes: [
      //       {
      //         key: 'second-level-node-1',
      //         label: 'cote',
      //         name:'killer',
      //         nodes: [
      //           {
      //             key: 'third-level-node-1',
      //             label: 'code',
      //             name:'purgatory',
      //             subscribed:true,
      //             nodes: [] // you can remove the nodes property or leave it as an empty array
      //           },
      //         ],
      //       },
      //     ],
      //   },
      //   {
      //     key: 'first-level-node-2',
      //     label: 'geass',
      //     name:'plain',
      //     subscribed:true
      //   },
      // ];

      const treeData = [
        {
          key: 'first-level-node-1',
          label: 'Performance',
          name:'Performance', // any other props you need, e.g. ur
        },
      ];

      function afterOpenModal() {
        // references are now sync'd and can be accessed.
        // subtitle.style.color = '#f00';
        //console.log('modalopen')
      }
      function closeModal() {
        setIsOpen(false);
        setMoneyModalIsOpen(false);
      }

  return (
    <div>
        <Head/>

        <BodyContainer>
          {/* <Sidebar treeData = {myPages}
           initialOpenNodes = {['275']}
          handleTreeMenuCollapse = {handleTreeMenuCollapse}
           treemenucollapse = {treemenucollapse} 
           handlesetTreearr = {handlesetTreearr}
           handleClickTree = {handleClickTree}
           handleSetOnClickValues = {handleSetOnClickValues}
           /> */}
          <SideMenuContainer width={treemenucollapse ? '20vw' : '10px'}>
              <TreeMenu
              style = {{width:'25vw'}}
              data={myPages}
              initialOpenNodes = {['275']}
              onClickItem={({ key, label, ...props }) => {
              }}
              >
                {({ search, items, searchTerm }) => {
                  // const nodesForRender = getNodesForRender(items, searchTerm);
                  return (
                  <div style={{paddingLeft:'10px', marginTop:'5px'}}>
                    <ListGroup>
                      {items.map(props => (
                        <ListItem {...props} />
                      ))}
                    </ListGroup>
                  </div>
            )}}
            </TreeMenu>
          </SideMenuContainer>

          {showLoader===false?<PowerBiDiv width={treemenucollapse ? '80vw' : '99vw'}>
                  <div style={{'background':'#F5F8FC'}}>
                    <Header>
                    {treemenucollapse?<></>:<button  style={{'height':'40px', 'borderRadius':'50%', 'width':'40px', 'backgroundColor':'#18183E', 'color':'white', 'border':'0px', 'verticalAlign':'middle' }} onClick={handleTreeMenuCollapse}><GiHamburgerMenu/></button>}<span style={{'fontSize':'33px', 'fontWeight':'bold', 'fontFamily':'system-ui', 'verticalAlign':'middle'}}>{window.localStorage.getItem('searchcompany')}</span>
                    </Header>
                    <div className='breadcrumbs' style={treemenucollapse?{'marginLeft':'3vw' ,'marginBottom':'10px'}:{'marginLeft':'3.5vw' ,'marginBottom':'10px'}}>
                    Products / <a href="/search" style={{'color':'black'}}>Search Companies</a> / {window.localStorage.getItem('searchcompany')}
                    </div>
                    <Currency marginLeft = {treemenucollapse?'3vw':'3.5vw'}columns={treemenucollapse?'0.5fr 0.15fr 1fr 0fr 0.9fr 1fr 2.95fr 1.2fr 0.3fr':'0.5fr 0.15fr 1fr 0fr 0.9fr 1fr 3.95fr 1.2fr 0.3fr'}>
                      <Descurr>Currency</Descurr>
                      <Inr>
                        <Currencybutton bgcolor={activeIndex === 0 ? '#26CDCC' : 'white'}
                         color={activeIndex === 1 ? '#333333' : '#333333'}
                        onClick={() => handleCurrencyClick(0)}>
                          INR
                        </Currencybutton>
                        <Currencybutton bgcolor={activeIndex === 1 ? '#26CDCC' : 'white'}
                        color={activeIndex === 1 ? '#333333' : '#333333'}
                        onClick={() => handleCurrencyClick(1)}>
                          USD
                        </Currencybutton>
                      </Inr>
                      <Gear><BsGear style={{ 'fontSize': "20px" }} onClick={()=>handleGearClick()}/></Gear>
                      <Cyfy>
                      <Currencybutton bgcolor={yearIndex === 0 ? '#26CDCC' : 'white'}
                         color={yearIndex === 1 ? '#333333' : '#333333'}
                        onClick={() => handleYearClick(0)}>CY</Currencybutton>
                        <Currencybutton bgcolor={yearIndex === 1 ? '#26CDCC' : 'white'}
                        color={yearIndex === 0 ? '#333333' : '#333333'}
                        onClick={() => handleYearClick(1)}>FY</Currencybutton>
                      </Cyfy>
                      <Dropdn>
                      {showDropDown?<div>Hello</div>:null}
                      </Dropdn>
                      </Currency>
                      <div>
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
                  </div>
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
                                      value: typeof(window.localStorage.getItem('currency'))===String?window.localStorage.getItem('currency'):'INR'
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
                                      value:typeof(window.localStorage.getItem('year'))===String?window.localStorage.getItem('year'):'CY'
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
                                let width = document.getElementsByClassName('report-style-class-search'+i)[0].offsetWidth;
                                let ht = ((active_ht/active_width)*width)
                                console.log('i= ', i)
                                if(i==0){
                                  console.log('rep_finalized = ', window.localStorage.getItem('finalized'))
                                  document.getElementsByClassName('report-style-class-search'+i)[0].style.position = 'relative';
                                  // document.getElementsByClassName('report-style-class-search'+i)[0].style.zIndex = -1;
                                  // if(true){
                                  //   document.getElementsByClassName('report-style-class-search'+i)[0].style.marginTop = '-13vh';
                                  // }
                                }
                                document.getElementsByClassName('report-style-class-search'+i)[0].style.height = ht+'px';
                                document.getElementsByClassName('report-style-class-search'+i)[0].style.backgroundColor = '#F5F8FC'
                                document.getElementsByClassName('report-style-class-search'+i)[0].children[0].style.border = '0px';
                                document.getElementsByClassName('report-style-class-search'+i)[0].children[0].style.backgroundColor = '#F5F8FC';
                                // document.getElementsByClassName('report-style-class-search'+i)[0].children[0].style.paddingLeft = '44px';
                                // document.getElementsByClassName('report-style-class-search'+i)[0].children[0].style.paddingRight = '44px';
                                // document.getElementsByClassName('report-style-class-search'+i)[0].style.width = activePage.defaultSize.width+'px';
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
                          }],
                          ['error', function (event) {console.log('powerbi_error=',event.detail);}]
                        ])
                      }
          
                      cssClassName = { "report-style-class-search"+i}
                      getEmbeddedComponent = {async(embeddedReport) => {
                        if(window.reports === undefined) {
                          window.reports=[]
                        }
                        window.reports.push(embeddedReport);
                        // console.log(window.reports)
                      }
          
                    }
                     />
                    </div>
                  )})}
          </PowerBiDiv>:<TailSpin
            height="80"
            width="80"
            color="#2323C8"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}
            wrapperClass=""
            visible={true}/>}
        </BodyContainer>

    </div>
          )
        }

export default PowerbiCompany


const PowerBiDiv = styled.div`
width:${props => props.width};
/* width:80vw; */
`
const BodyContainer = styled.div`
display:flex;
min-height:90vh;
background-color:#F5F8FC;
`

const SideMenuContainer = styled.div`
  overflow-y:hidden;
  overflow-x:hidden;
  /* width:20vw; */
  width:${props => props.width};
  background-color:#18183E;
  color:white;


`

const Header = styled.div`
padding-left:3vw;
padding-top:5px;
`

const BreadCrumbs= styled.div`
padding-left:6.8vw;
font-size:16px;
font-weight:600;
font-family:'Fira-Sans', sans-serif;
`
const Currency = styled.div`
  margin-left:${props => props.marginLeft};
  margin-bottom:10px;
  display: grid; 
  grid-auto-rows: 1fr; 
  grid-template-columns: ${props => props.columns}; 
  /* grid-template-columns: 0.5fr 0.15fr 1fr 0fr 0.9fr 1fr 2.95fr 1.2fr 0.3fr; */
  grid-template-rows: 1fr; 
  gap: 0px 0px; 
  grid-template-areas: 
    "Descurr . Inr . Gear Cyfy . Dropdn .";
`
const Descurr = styled.div`
  grid-area:Descurr;
  line-height:34px;
  display:flex;
  align-items:center;
`
const Inr = styled.div`
  grid-area:Inr;
  display:flex;
  align-items:center;
`
const Gear = styled.div`
  grid-area:Gear;
  line-height:34px;
  display:flex;
  align-items:center;
  /* background-color:Blue; */
`
const Cyfy = styled.div`
  grid-area:Cyfy;
  display:flex;
  align-items:center;
  /* background-color:Green; */
`
const Dropdn = styled.div`
  grid-area:Dropdn;
`

const Currencybutton = styled.button`
background-color: ${props => props.bgcolor};
color:${props => props.color};
border: 1px solid black;
width:58px;
height:34px;
font-size:14px;
outline: none !important;
`

const ToggleButton = styled.button`
display:${props => props.display};
height:35px; 
width:35px; 
display:flex;
align-items:center;
justify-content:center;
background-color:#18183E;
border-radius:50%;
color:white;
border:0px solid black;
outline: none !important;
/* position:absolute; */
/* left:17.7vw;
top:13.5vh; */
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