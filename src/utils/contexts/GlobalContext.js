import React, { createContext, useEffect, useState, useContext } from "react";
// import { forms as formsConst, users as usersConst } from "../constants";
import { firestore, database } from "../auth/firebase";
import { AuthContext } from "../auth/auth";
import { v4 as uuid } from "uuid";
import axios from "axios";
import { isFormExpired } from "../utility";

export const GlobalContext = createContext({});


const GlobalContextProvider = ({ children }) => {

    const [comments, setComments] = useState({});

    const postCommentOnQuestion = async (
        comment,
        formId,
        instanceId,
        questionId,
        callback
    ) => {
        // console.log("Came Inside", { comment });
        if (comment?.message?.length) {
        let { author, author_email, author_display_picture, message } = comment;
        author_display_picture = "https://lh3.googleusercontent.com/a/AATXAJx2Vaf3laKf8D7hz6W6c9YgjOK8rEqLsZEk9mzS=s96-c"
        const commentObj = {
            id: `RC_${uuid()?.replace(/-/g, "_")}`,
            author,
            author_email,
            author_display_picture,
            created_at: new Date().toUTCString(),
            comment: message,
            replies: [],
        };

        // console.log({ commentObj });

        const commentsRef = database.ref(
            `comments/${formId}/${instanceId}/${questionId}`
        );

        if (comments[formId] && comments[formId][questionId]) {
            try {
            commentsRef.set([...comments[formId][questionId], commentObj]);
            if (callback) callback(null);
            } catch (error) {
            if (callback) callback(error);
            }
        } else {
            try {
            commentsRef.set([commentObj]);
            if (callback) callback(null);
            } catch (error) {
            if (callback) callback(error);
            }
        }
        } else {
        throw new Error("Invalid comment!");
        }
    };

    return (
        <GlobalContext.Provider
          value={{
            postCommentOnQuestion,
          }}
        >
          {children}
        </GlobalContext.Provider>
      );
}

export default GlobalContextProvider;