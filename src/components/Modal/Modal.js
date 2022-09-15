import React, { useState, useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../utils/auth/auth";
import MModal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import styles from "./Modal.module.scss";
import { IoMdClose } from "react-icons/io";
import { FiUserPlus, FiUsers } from "react-icons/fi";
import { Button, IconButton } from "@material-ui/core";
import { FaCheck } from "react-icons/fa";
import { MdExpandMore } from "react-icons/md";
import { FaRegCopy } from "react-icons/fa";
import { AiOutlineHistory } from "react-icons/ai";
import { GlobalContext } from "../../utils/contexts/GlobalContext";
import { copyTextToClipboard } from "../../utils/utility";
import clsx from "clsx";

const Modal = ({
  variant,
  title,
  open,
  setOpen,
  sub_questions,
  questionNo,
  formId,
  instanceId,
  notify,
  onClickCancel,
  onClickConfirm,
}) => {
  const {
    users,
    shareFormWithUsers,
    getPeopleAssignedToForm,
    setFormShareAccess,
    getFormShareAccess,
    removeAssignedUser,
  } = useContext(GlobalContext);

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [userToRemove, setUserToRemove] = useState("");
  const [tempUsers, setTempUsers] = useState([]);
  const [assisgnedTo, setAssingedTo] = useState([]);
  const [allowedUsers, setAllowedUsers] = useState([]);
  const [suggestionLimit, setSuggestionLimit] = useState(3);
  const [searchEmail, setSearchEmail] = useState("");
  const [currentUserEmail, setCurrentUserEmail] = useState("");
  const [formAssignmentComplete, setFormAssignmentComplete] = useState(false);
  const [isTickRequested, setIsTickRequested] = useState(false);
  const { userDetails } = useContext(AuthContext);
  const [tempAssignedTo, setTempAssignedTo] = useState([]);
  const [accessType, setAccessType] = useState("");

  const modalClose = () => {
    setOpen(false);
    setFormAssignmentComplete(false);
    setIsTickRequested(false);
    setSearchEmail("");
  };

  useEffect(() => {
    setCurrentUserEmail(userDetails?.email ? userDetails.email : "");
  }, [userDetails]);
  useEffect(() => {
    setTempAssignedTo(assisgnedTo);
  }, [assisgnedTo]);

  useEffect(() => {
    if (users?.length && open) {
      getPeopleAssignedToForm(formId, (assigned_to) => {
        let allUsers = users.filter(
          (user) =>
            !assigned_to.includes(user.email) &&
            user.email !== currentUserEmail &&
            !user.is_admin
        );
        setAssingedTo(users.filter((user) => assigned_to.includes(user.email)));
        setTempUsers(allUsers);
        setAllowedUsers(allUsers);
      });
    }

    return () => {
      setTempUsers([]);
      setAllowedUsers([]);
      setSelectedUsers([]);
    };
  }, [users, formId, getPeopleAssignedToForm, currentUserEmail, open]);

  useEffect(() => {
    if (formId && instanceId) {
      getFormShareAccess(formId, instanceId, (val) => {
        setAccessType(val);
      });
    }

    return () => {
      setAccessType("");
    };
  }, [formId, instanceId, getFormShareAccess, open]);

  // console.log(tempUsers);
  function searchHandle(e) {
    setSearchEmail(e.target.value);

    setTempUsers(
      allowedUsers.filter(
        (item) =>
          item.email?.substr(0, e.target.value.length) === e.target.value
      )
    );
    setTempAssignedTo(
      assisgnedTo.filter(
        (item) =>
          item.email?.substr(0, e.target.value.length) === e.target.value
      )
    );
  }

  function handleClickShare() {
    // console.log({ selectedUsers });
    if (!selectedUsers.length) {
      notify("Failed: Please select atleast one user to share the form");
      return;
    }
    // setTempUsers([]);
    shareFormWithUsers(selectedUsers, formId, title);
    setFormAssignmentComplete(true);
  }

  function handleChangeShareAccess(e) {
    const { value: shareType } = e.target;
    setFormShareAccess(
      formId,
      instanceId,
      shareType === "None" ? null : shareType,
      (err) => {
        if (err) {
          notify("Failed: Form could not be shared ", err);
          return;
        }
        notify("Form share access updated successfully");
      }
    );
  }

  function onClickDelete(userEmail) {
    removeAssignedUser(formId, userEmail, (err) => {
      if (err) {
        console.log({ err });
        notify("Failed: User could not be removed", err);
        return;
      }
      setAssingedTo(assisgnedTo.filter((user) => user.email !== userEmail));
      notify("User removed successfully");
    });
  }

  switch (variant) {
    case "share": {
      return (
        <MModal
          aria-labelledby="redseer-share-form-modal"
          className={styles.shareContainer}
          open={open}
          onClose={modalClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={styles.modal}>
              <div className={styles.header}>
                <FiUserPlus
                  size="20"
                  style={{ marginRight: "10px", color: "var(--clr-primary)" }}
                />
                <h4>Share "{title}"</h4>
                <IconButton onClick={modalClose} style={{ padding: 0 }}>
                  <IoMdClose size="20" />
                </IconButton>
              </div>
              <p style={{ color: "var(--clr-light-grey)" }}>
                Invite users you want to share this form with
              </p>
              <div className={styles.hLine}></div>
              <div className={styles.assignedUsers} style={{ height: "40px" }}>
                {selectedUsers.length ? (
                  selectedUsers?.map((user) => (
                    <span key={user}>{user.slice(0, 16)}...</span>
                  ))
                ) : (
                  <h5>Invite Users</h5>
                )}
              </div>
              <div className={styles.inputContainer}>
                <input
                  value={searchEmail}
                  onChange={searchHandle}
                  type="email"
                  placeholder="Email Id"
                />
                <Button onClick={handleClickShare} variant="text">
                  + Add
                </Button>
              </div>
              <div className={styles.suggestionsContainer}>
                {tempUsers?.slice(0, suggestionLimit).map((item, index) => (
                  <Suggestion
                    variant="manageShareTo"
                    key={index}
                    user={item}
                    selectedUsers={selectedUsers}
                    setSelectedUsers={setSelectedUsers}
                  />
                ))}
              </div>
              <div
                onClick={() => {
                  tempUsers.length !== suggestionLimit
                    ? setSuggestionLimit(tempUsers.length)
                    : setSuggestionLimit(3);
                }}
                className={styles.otherSuggestions}
              >
                {tempUsers.length > 3 && (
                  <>
                    <p>
                      {tempUsers.length === suggestionLimit ? "Less" : "More"}
                    </p>
                    <MdExpandMore size="25" />
                  </>
                )}
              </div>

              <div className={styles.hLine}></div>
              <div className={styles.footer}>
                <div className={styles.textContainer}>
                  {formAssignmentComplete ? (
                    <h4>
                      Assigned &nbsp;
                      <FaCheck style={{ fill: "rgb(13, 204, 13)" }} />
                    </h4>
                  ) : (
                    <h4>Or Share a Link</h4>
                  )}

                  <div
                    className={styles.copyLinkContainer}
                    style={{ color: "var(--clr-primary)" }}
                    onClick={() => {
                      copyTextToClipboard(
                        `http://${window.location.hostname}/forms/shared/${formId}/${instanceId}`,
                        (text) => {
                          setIsTickRequested(true);
                          setTimeout(() => setIsTickRequested(false), 3000);
                        }
                      );
                    }}
                  >
                    <FaRegCopy />
                    <p
                      style={{
                        fontSize: "1rem",
                        fontWeight: "500",
                        color: "var(--clr-primary)",
                      }}
                    >
                      {isTickRequested ? (
                        <>&nbsp;Copied Form Link</>
                      ) : (
                        <>&nbsp;Copy Form Link</>
                      )}
                    </p>
                    &nbsp;&nbsp;
                    {isTickRequested && (
                      <FaCheck style={{ fill: "var(--clr-primary)" }} />
                    )}
                  </div>
                </div>
                <select
                  className={styles.fillingAccess}
                  name="fillingAccess"
                  id="fillingAccess"
                  onChange={handleChangeShareAccess}
                  value={accessType}
                >
                  <option value={null}>None</option>
                  <option value="view">Anyone can view</option>
                  <option value="edit">Anyone can edit</option>
                </select>
              </div>
            </div>
          </Fade>
        </MModal>
      );
    }
    case "manageAssignedTo": {
      return (
        <MModal
          aria-labelledby="redseer-share-form-modal"
          className={styles.shareContainer}
          open={open}
          onClose={modalClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <section className={styles.modal}>
              <div className={styles.manageAssignedToContainer}>
                <div className={styles.header}>
                  <FiUsers
                    size="20"
                    style={{ marginRight: "10px", color: "var(--clr-primary)" }}
                  />
                  <h4>"{title}" is Assigned To </h4>
                  &nbsp;&nbsp; &nbsp;&nbsp;{" "}
                  <IconButton onClick={modalClose} style={{ padding: 0 }}>
                    <IoMdClose size="20" />
                  </IconButton>
                </div>
                <div className={styles.hLine}></div>
                <div
                  className={styles.inputContainer}
                  style={{ margin: "1rem 0" }}
                >
                  <input
                    value={searchEmail}
                    onChange={searchHandle}
                    type="email"
                    placeholder="Search Email Id"
                    style={{ width: "100%" }}
                  />
                </div>
                <div>
                  <div className={styles.suggestionsContainer}>
                    {tempAssignedTo.map((item, index) => (
                      <Suggestion
                        variant="manageAssignedTo"
                        key={index}
                        user={item}
                        selectedUsers={selectedUsers}
                        setSelectedUsers={setSelectedUsers}
                        onClickDelete={onClickDelete}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </Fade>
        </MModal>
      );
    }
    case "history": {
      return (
        <MModal
          aria-labelledby="redseer-share-form-modal"
          className={styles.historyContainer}
          open={open}
          onClose={modalClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <section className={styles.modal}>
              <div className={styles.title}>
                <AiOutlineHistory
                  style={{ color: "var(--clr-primary)" }}
                  size="25"
                />
                <p>Previous Answers (Q {questionNo})</p>
              </div>
              <p className={styles.description}>
                Take a look at your previous answers for this questions
              </p>
              <div className={styles.hLine}></div>
              <p className={styles.attemptDate}>Last Attempt (24/7/21): </p>
              <div className={styles.list}>
                {sub_questions.map((item, index) => (
                  <div key={item.id} className={styles.item}>
                    <p>
                      Q{index + 1} ({item.sub_question}): {item.last_value}
                    </p>
                  </div>
                ))}
              </div>
              <div className={styles.hLine}></div>
              <div onClick={modalClose} className={styles.moreQuestions}>
                <p>See more Questions</p>
                <MdExpandMore size="20" />
              </div>
            </section>
          </Fade>
        </MModal>
      );
    }
    case "submit": {
      return (
        <MModal
          aria-labelledby="redseer-submit-form-modal"
          className={styles.submitConfirmContainer}
          open={open}
          onClose={modalClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={styles.submitConfirm}>
              <h3>Are you sure you want to submit the form?</h3>
              <span className={styles.disclaimer}>
                *This action can't be undone
              </span>
              <div className={styles.actionBtns}>
                <Button
                  onClick={onClickConfirm}
                  className={clsx(styles.actionBtn, styles.confirm)}
                >
                  Yes
                </Button>
                <Button
                  onClick={onClickCancel}
                  className={clsx(styles.actionBtn, styles.cancel)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Fade>
        </MModal>
      );
    }
    default: {
      throw new Error("Invalid Modal Vairant");
    }
  }
};

const Suggestion = ({
  user,
  selectedUsers,
  setSelectedUsers,
  variant,
  onClickDelete,
}) => {
  const [isUserSelected, setIsUserSelected] = useState(false);

  switch (variant) {
    case "manageShareTo": {
      function clickHandler() {
        if (selectedUsers.includes(user.email)) {
          //Meaning now i have to remove the element from the array
          const newSelectedUsers = selectedUsers.filter(
            (item) => item !== user.email
          );
          setSelectedUsers(newSelectedUsers);
        } else {
          const newSelectedUsers = [...selectedUsers, user.email];
          setSelectedUsers(newSelectedUsers);
        }
        setIsUserSelected(!isUserSelected);
      }
      return (
        <div onClick={clickHandler} className={styles.suggestionWrapper}>
          <div className={styles.suggestion}>
            <div className={styles.imageContainer}>
              <img src={user.userImage} alt={user.name} />
            </div>
            <div className={styles.userDetails}>
              <h4>{user.name}</h4>
              <p>{user.email}</p>
            </div>
          </div>
          {selectedUsers.includes(user.email) && <FaCheck />}
        </div>
      );
    }
    case "manageAssignedTo": {
      return (
        <div style={{ cursor: "initial" }} className={styles.suggestionWrapper}>
          <div className={styles.suggestion}>
            <div className={styles.imageContainer}>
              <img src={user.userImage} alt={user.name} />
            </div>
            <div className={styles.userDetails}>
              <h4>{user.name}</h4>
              <p>{user.email}</p>
            </div>
          </div>
          <IconButton
            onClick={() => onClickDelete(user.email)}
            style={{ padding: 0 }}
          >
            <IoMdClose size="20" />
          </IconButton>
        </div>
      );
    }
    default: {
      throw new Error("Invalid Suggestion Variant in Modal Component");
    }
  }
};

export default Modal;
