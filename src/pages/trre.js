import React, { useState } from "react";
import TreeMenu from "react-simple-tree-menu";
import { Alert, Button, Form, ListGroup, Spinner } from "react-bootstrap";
// import { treeData } from "./TreeDataArray";
import { treeDataObject } from "./TreeDataObject";
import "./styles.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaBlog, FaRegFolder, FaRegFolderOpen } from "react-icons/fa";
import {
  AiOutlineUsergroupAdd,
  AiOutlineUsergroupDelete,
  AiOutlineQuestionCircle
} from "react-icons/ai";
import { MdChatBubbleOutline } from "react-icons/md";

// renders the icon for container nodes
const ToggleIcon = ({ on, nodetype }) => {
  switch (nodetype) {
    case "category":
      return (
        <>
          {on ? (
            <FaRegFolderOpen className="icon" />
          ) : (
            <FaRegFolder className="icon" />
          )}
        </>
      );
    case "grouphub":
      return (
        <>
          {on ? (
            <AiOutlineUsergroupDelete className="icon" />
          ) : (
            <AiOutlineUsergroupAdd className="icon" />
          )}
        </>
      );
    default:
      return null;
  }
};

// renders the icon for board nodes
const BoardIcon = ({ nodetype }) => {
  switch (nodetype) {
    case "forum":
      return <MdChatBubbleOutline className="icon" />;
    case "blog":
      return <FaBlog className="icon" />;
    case "tkb":
      return <AiOutlineQuestionCircle className="icon" />;
    default:
      return null;
  }
};

const LEVEL_INDENT = 25;

// renders the individual tree item
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
  ...props
}) => (
  <ListGroup.Item
    {...props}
    variant="light"
    className="tree-item"
    style={{
      marginLeft: searchTerm ? 0 : level * LEVEL_INDENT, // align fully left if search is happening, otherwise, indent according to level
      boxShadow: focused ? "0 0 0 .2rem rgba(49,132,253,.4)" : "none"
    }}
  >
    {hasNodes && (
      <div
        className="d-inline-flex"
        onClick={(e) => {
          // set a limit for the number of child nodes to display when toggling a container node
          props.setChildNodeLimitHash((prevChildNodeLimitHash) => ({
            ...prevChildNodeLimitHash,
            [label]: 3
          }));
          hasNodes && toggleNode && toggleNode();
          e.stopPropagation();
        }}
      >
        <ToggleIcon on={isOpen} nodetype={props.nodetype} />
      </div>
    )}
    {!hasNodes && <BoardIcon nodetype={props.nodetype} />}
    {label}

  </ListGroup.Item>
);

// renders the tree, including search
const TreeMenuExtended = () => {
  const [getValue, setValue] = useState();
  const [childNodeLimitHash, setChildNodeLimitHash] = useState({
    Community: 3,
    search: 3
  });
  const [useInitialOpenNodes, setUseInitialOpenNodes] = useState(false);
  const [loading, setLoading] = useState(false);

  // resets the tree
  const resetTree = () => {
    setLoading(true);
    setChildNodeLimitHash({ Community: 3, search: 3 });
    setTimeout(() => setLoading(false), 500);
  };

  // toggles the "initial node" view and triggers a refresh
  const toggleInitialNodes = () => {
    setUseInitialOpenNodes(!useInitialOpenNodes);
    resetTree();
  };

  /**
   * populates a the list of nodes and pagers. keeps track of the number of visible child nodes
   * and compares that number against a preset definition set in local state.
   *
   * When the count is met, adds pager and breaks loop
   */
  const getNodesForRender = (nodes, searchTerm = null) => {
    const nodesForRender = [];
    const nodeCountHash = { Community: 0, search: 0 };

    if (searchTerm) {
      // for search ignore node parent and limit results
      for (let itemIdx = 0; itemIdx < nodes.length; itemIdx++) {
        nodeCountHash["search"]++;
        if (nodeCountHash["search"] <= childNodeLimitHash["search"]) {
          nodesForRender.push(nodes[itemIdx]);
        } else {
          const { level } = nodes[itemIdx];
          nodesForRender.push({
            key: "pager-search",
            parent: "search",
            level,
            isPager: true
          });
          break;
        }
      }
    } else {
      for (let itemIdx = 0; itemIdx < nodes.length; itemIdx++) {
        const regex = /.*\/|\.[^.]*$/g;
        const fullParentPath = nodes[itemIdx].parent;
        const currItemParent = fullParentPath.replace(regex, "");
        if (!nodeCountHash[currItemParent]) {
          nodeCountHash[currItemParent] = 1;
        } else {
          nodeCountHash[currItemParent]++;
        }
        if (
          !childNodeLimitHash[currItemParent] ||
          nodeCountHash[currItemParent] <= childNodeLimitHash[currItemParent]
        ) {
          nodesForRender.push(nodes[itemIdx]);
        } else {
          const { level } = nodes[itemIdx];
          nodesForRender.push({
            key: `pager-${currItemParent}`,
            parent: currItemParent,
            level,
            isPager: true
          });
          break;
        }
      }
    }

    return nodesForRender;
  };

  return (
    <>
      {loading && <Spinner animation="border" variant="primary" />}
      {!loading && (
        <TreeMenu
          // data={treeDataArray} // tree data can be optionally rendered using an array
          data={treeDataObject}
          onClickItem={({ key, label, ...props }) => {
            setValue(props);
          }}
          initialOpenNodes={
            useInitialOpenNodes
              ? [
                  "Community",
                  "Community/Category-A",
                  "Community/Category-A/Category-A-SubCategory"
                ]
              : ["Community"]
          } // set the initially open nodes
          initialActiveKey={
            useInitialOpenNodes
              ? "Community/Category-A/Category-A-SubCategory/Category-A-Subcategory-Forum"
              : "Community"
          } // set the initially "active" node
          initialFocusKey={
            useInitialOpenNodes
              ? "Community/Category-A/Category-A-SubCategory/Category-A-Subcategory-Forum"
              : "Community"
          } // set the intially "focused" node
          debounceTime={250}
        >
          {({ search, items, resetOpenNodes, searchTerm }) => {
            const nodesForRender = getNodesForRender(items, searchTerm);

            return (
              <>
                <Button
                  className="mb-3"
                  onClick={() => toggleInitialNodes()}
                >{`${
                  useInitialOpenNodes ? "Disable" : "Enable"
                } nested default selection`}</Button>
                <Button className="mb-3 ml-3" onClick={() => resetTree()}>
                  Reset Tree
                </Button>
                <Form>
                  <Form.Control
                    className="search"
                    type="input"
                    onChange={(e) => {
                      resetOpenNodes();
                      // reset the limit of search results when executing a new search
                      setChildNodeLimitHash((prevChildNodeLimitHash) => ({
                        ...prevChildNodeLimitHash,
                        search: 3
                      }));
                      search(e.target.value);
                    }}
                    placeholder="Find a Place..."
                  />
                </Form>
                <ListGroup className="listgroup" flush="true">
                  {nodesForRender.map((props) => {
                    if (props.isPager) {
                      return (
                        <Button
                          className="align-self-center"
                          onClick={() => {
                            setChildNodeLimitHash((prevChildNodeLimitHash) => ({
                              ...prevChildNodeLimitHash,
                              [props.parent]:
                                childNodeLimitHash[props.parent] + 3
                            }));
                          }}
                        >
                          {`More ${
                            props.parent === "search"
                              ? "Search Results"
                              : `${props.parent} Places`
                          }`}
                        </Button>
                      );
                    } else {
                      return (
                        <ListItem
                          setChildNodeLimitHash={setChildNodeLimitHash}
                          {...props}
                        />
                      );
                    }
                  })}
                  {nodesForRender.length === 0 && (
                    <Alert variant="info">No search results</Alert>
                  )}
                </ListGroup>
              </>
            );
          }}
        </TreeMenu>
      )}
    </>
  );
};

const App = () => {
  return (
    <div className="App">
      <h1 className="mt-5">Community Structure</h1>
      <h6>Organize the containers and boards in your Community</h6>
      <div className="tree-wrapper">
        <TreeMenuExtended />
      </div>
    </div>
  );
};
export default App;
