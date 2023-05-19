import React, { useEffect, useState } from 'react'
import TreeMenu from 'react-simple-tree-menu';
import styled from 'styled-components';
import { ListGroupItem, Input, ListGroup } from 'reactstrap';
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { GiBreakingChain, GiConsoleController, GiEvilFork, GiHealthNormal, GiCarWheel, GiClothes,GiMedicines,GiFruitBowl, GiVideoConference, GiHamburgerMenu, GiZigArrow } from "react-icons/gi";


const Sidebar = (parent_props) => {
    // const [treemenucollapse, settreeMenuColapse] = useState(true);
    const [myPages, setMyPages] = useState([]);
    const [labelSelected, setLabelSelected] = useState(null);
    const [selectedpage, setSelectedPage] = useState('Consumer Internet')
    const [selectedOption, setSelectedOption] = useState(null);
    const [allNodes,setallNodes] = useState([]);
    const [showcurrencybar, setshowCurrencyBar] = useState(false);
    const [filterarr, setfilterarr] = useState([])
    const [filterVal, setFilterVal] = useState(null)
    const [activeIndex, setActiveIndex] = useState(0);
    const [yearIndex, setyearIndex] = useState(0);
    const [reportarr, setNewReportArr] = useState([])
    const [dummynodes, setDummyNodes]  = useState([])

    const [treearr, setTreearr] = useState([]);
    let [iconDict, setIconDict] = useState({
        'Meesho':<img  style = {{'width':'10px', 'height':'10px'}}src = '/Images/meesho.jpeg'/>,
        'Tatacliq':<img  style = {{'width':'15px', 'height':'10px'}}src = '/Images/tatacliq.jpeg'/>,
        'Snapdeal':<img  style = {{'width':'10px', 'height':'10px'}}src = '/Images/snapdeal.jpeg'/>,
        'Ajio':<img  style = {{'width':'10px', 'height':'10px'}}src = '/Images/a.jpeg'/>,
        'Clubfactory':<img  style = {{'width':'10px', 'height':'10px'}}src = '/Images/clubfactory.jpeg'/>,
        'Jabong':<img  style = {{'width':'10px', 'height':'10px'}}src = '/Images/jabong.jpeg'/>,
        'Koovs':<img  style = {{'width':'10px', 'height':'10px'}}src = '/Images/koovs.jpeg'/>,
        'LimeRoad':<img  style = {{'width':'10px', 'height':'10px'}}src = '/Images/limeroad.jpeg'/>,
        'Myntra':<img  style = {{'width':'10px', 'height':'10px'}}src = '/Images/myntra.jpeg'/>,
        'Nykaa Fashion':<img  style = {{'width':'10px', 'height':'10px'}}src = '/Images/nykaa.jpeg'/>,
        'Shein':<img  style = {{'width':'10px', 'height':'10px'}}src = '/Images/shein.jpeg'/>,
        'Nykaa':<img  style = {{'width':'10px', 'height':'10px'}}src = '/Images/nykaa.jpeg'/>,
        'Purplle':<img  style = {{'width':'10px', 'height':'10px'}}src = '/Images/purplle.jpeg'/>,
        'Pepperfry':<img  style = {{'width':'10px', 'height':'10px'}}src = '/Images/pepperfry.jpeg'/>,
        'Urban Ladder':<img  style = {{'width':'10px', 'height':'10px'}}src = '/Images/urbanladder.jpeg'/>,
        'Delhivery':<img  style = {{'width':'10px', 'height':'10px'}}src = '/Images/delhivery.png'/>,
        'Ecom Express':<img  style = {{'width':'10px', 'height':'10px'}}src = '/Images/ecomexpress.png'/>,
        'Shadowfax':<img  style = {{'width':'10px', 'height':'10px'}}src = '/Images/shadowfax.png'/>,
        'Xpressbees':<img  style = {{'width':'10px', 'height':'10px'}}src = '/Images/xpressbee.png'/>,
      })

      useEffect(()=>{
        let client_id = window.localStorage.getItem('clientID')
        // we are using consumer internet here because we want to show all  reports name but on click it will showsubscribe for report
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
            setallNodes(res)
          }
        )
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

        fetch(`${process.env.REACT_APP_API_ENDPOINT}/dummynodes/`,{
          method:'GET',
          headers:{
            'Content-Type': 'application/json',
          },
        }).then(res=>res.json())
        .then(
          res=>{
            setDummyNodes(res)
          }
        )
    },[]);

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

      let handleTreeMenuCollapse = ()=>{
        parent_props.handleTreeMenuCollapse()
    }


    const ToggleIcon = ({ on }) => <span style={{ marginRight: 8 }}>{on ? <IoIosArrowDown/> : <IoIosArrowForward/>}</span>;
    

    const ICON_SIZE = 3;
    const LEVEL_SPACE = 10

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
                    backgroundColor:labelSelected===label & level !== 0?'#2323C8':'#18183E',
                    // color:subscribed?'white':'grey',
                    // fontWeight:subscribed?'bold':'normal',
                    color:'white',
                    fontWeight:'bold',
                    border:'none',
                    // zIndex:10,
                    fontSize:level===0?20:17,
                }}
          onClick={e => {
              // this onclick conflicts with oclick defined below
              // make your get parents function here
            window.reports = []
            // let parent_arr = getParents(props)
            // parent_arr.push(label)
            setSelectedOption(null)
            // setLabelSelected(label)
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
              console.log('props for filter=',props )
              if(props.filter!==null && props.filter!==''){
                setfilterarr(props.filter.split(','))
                window.localStorage.setItem('filterval', props.filter_value)
                setFilterVal(props.filter_value)
                console.log('filterval = ', props.filter_value)
              }else{
                setfilterarr([])
                setFilterVal(null)
              }
              setSelectedPage(label)
              // setTreearr(parent_arr)
            //   let arr = currencyarr
              let currency_type = window.localStorage.getItem('currency')
              if(currency_type==='INR'){
                setActiveIndex(0)
                window.localStorage.setItem('currency', 'INR')
              }else{
                setActiveIndex(1)
                window.localStorage.setItem('currency', 'USD')
              }
              let year_type = window.localStorage.getItem('year')
              if(year_type==='CY'){
                setyearIndex(0)
                window.localStorage.setItem('year', 'CY')
              }else{
                setyearIndex(1)
                window.localStorage.setItem('year', 'FY')
              }
            }            

            parent_props.handleSetOnClickValues(selectedOption, showcurrencybar, filterarr, filterVal,activeIndex, yearIndex)

            if(hasNodes && toggleNode){
              if(level===0){
                console.log('toggle diabled')
              }else{
                toggleNode()

              // console.log(label, props.key_val, props.node_type)
            // below code handle cases when we want to show graph and togglenode

            //   if([25,67].includes(props.key_val)){
            //     setSelectedPage(label)
            //     let parent_arr = getParents(props)
            //     parent_arr.push(label)
            //     setTreearr(parent_arr)
            //     props.handleClickTree(label, props.key_val, props.node_type)
            //     if(props.key_val===25){
            //       window.localStorage.setItem('finalized', 'false')
            //     }else{
            //       window.localStorage.setItem('finalized', 'true')
            //     }
            //   }
              }
            }else{
              let parent_arr = getParents(props)
              parent_arr.push(label)
              parent_props.handlesetTreearr(parent_arr)
              parent_props.handleClickTree(label, props.key_val, props.node_type)
            }
            e.stopPropagation();
                    }
                }
        >
          <div style={{display:'flex', justifyContent:'space-between'}}>
            <div>{iconDict[label]} {label}</div>

            {/* equivalent of saying if ndoe has child nodes then show arrowicon or hamburger icon */}

            {hasNodes && (
              <div style={{ display: 'inline-block' }}>
                {level!==0?<ToggleIcon on={isOpen} />:<ToggleButton  display = {parent_props.treemenucollapse?'block':'none'} onClick = {handleTreeMenuCollapse}><GiHamburgerMenu/></ToggleButton>}
              </div>
            )}
          </div>
        </ListGroupItem>
      );

  return (
    <div>
         <SideMenuContainer width={parent_props.treemenucollapse ? '20vw' : '10px'}>
            <TreeMenu
                  style = {{width:'25vw'}}
                  data={parent_props.treeData}
                  initialOpenNodes = {parent_props.initialOpenNodes}
                  onClickItem={({ key, label, ...props }) => {
                  }}
                  >
                    {({ search, items, searchTerm }) => {
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
    </div>
  )
}

export default Sidebar

const SideMenuContainer = styled.div`
  overflow-y:hidden;
  overflow-x:hidden;
  height:100%;
  /* width:20vw; */
  width:${props => props.width};
  background-color:#18183E;
  color:white;


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