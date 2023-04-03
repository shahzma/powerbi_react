import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Head from '../components/Head/Head'
import {models} from 'powerbi-client';
import {PowerBIEmbed} from 'powerbi-client-react';
import { FallingLines, TailSpin } from  'react-loader-spinner'
import {Link, Navigate} from 'react-router-dom';


const PowerbiCompany = () => {
    const [newReportPages, setnewReportPages] = useState([])
    const [showLoader, setshowLoader] = useState(false);
    const [filterArr, setFilterArr] = useState([
        {
            $schema: "http://powerbi.com/product/schema#basic",
            target: {
              table: "content_data main_data",
              column: "Players"
            },
            operator: "In",
            values: [], // initialize with an empty array
            filterType: models.FilterType.BasicFilter
          }
    ])
    useEffect(()=>{
        setshowLoader(true)
        let reportname = window.localStorage.getItem('searchcompany')
        let reportid = window.localStorage.getItem('searchreportid')
        reportid = parseInt(reportid)
        fetch(`${process.env.REACT_APP_API_ENDPOINT}/newreportpages/?rep_id=${reportid}`, {
            method:'GET',
            headers:{
              'Content-Type': 'application/json',
            },
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

    // useEffect(() => {
    //     if (newReportPages.length > 0) {
    //       const basicFilter = {
    //         $schema: "http://powerbi.com/product/schema#basic",
    //         target: {
    //           table: "content_data main_data",
    //           column: "Players"
    //         },
    //         operator: "In",
    //         values: [newReportPages[0].filter_value],
    //         filterType: models.FilterType.BasicFilter
    //       };
    //       setFilterArr([basicFilter]);
    //     }
    //   }, [newReportPages]);
    
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
  return (
    <div>
        <Head/>
        <div style={{'background':'#F5F8FC', 'marginTop':'10px'}}>
            <Header>
            <div style={{'fontSize':'33px', 'fontWeight':'bold', 'fontFamily':'system-ui'}}>{window.localStorage.getItem('searchcompany')}</div>
            </Header>
            <BreadCrumbs>
            Products / <a href="/search" style={{'color':'black'}}>Search Companies</a> / {window.localStorage.getItem('searchcompany')}
            </BreadCrumbs>
        </div>
        {showLoader===false?<PowerBiDiv>
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
                              let width = document.getElementsByClassName('report-style-class-search'+i)[0].offsetWidth;
                              let ht = ((active_ht/active_width)*width)
                              console.log('i= ', i)
                              if(i==0){
                                console.log('rep_finalized = ', window.localStorage.getItem('finalized'))
                                document.getElementsByClassName('report-style-class-search'+i)[0].style.position = 'relative';
                                document.getElementsByClassName('report-style-class-search'+i)[0].style.zIndex = -1;
                                if(true){
                                  document.getElementsByClassName('report-style-class-search'+i)[0].style.marginTop = '-13vh';
                                }
                              }
                              document.getElementsByClassName('report-style-class-search'+i)[0].style.height = ht+'px';
                              document.getElementsByClassName('report-style-class-search'+i)[0].style.backgroundColor = '#F5F8FC'
                              document.getElementsByClassName('report-style-class-search'+i)[0].children[0].style.border = '0px';
                              document.getElementsByClassName('report-style-class-search'+i)[0].children[0].style.backgroundColor = '#F5F8FC';
                              document.getElementsByClassName('report-style-class-search'+i)[0].children[0].style.paddingLeft = '44px';
                              document.getElementsByClassName('report-style-class-search'+i)[0].children[0].style.paddingRight = '44px';
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
    </div>
  )
}

export default PowerbiCompany


const PowerBiDiv = styled.div`

`

const Header = styled.div`
padding-left:6.8vw;
padding-top:5px;
`

const BreadCrumbs= styled.div`
padding-left:6.8vw;
font-size:16px;
font-weight:600;
font-family:'Fira-Sans', sans-serif
`