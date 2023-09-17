import { useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
// import { democontent } from "../components/demcontent.js"
import ContentCSS from "./Content.module.css";
import { createSummary, fetchSummary } from "../services/summaryService";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase.js";

export default function Content({ content, title }) {
  const [summary, setSummary] = useState("");
  const apiKey = process.env.REACT_APP_CHATGPT_APIKEY;
  const aiURL = "https://api.openai.com/v1/chat/completions";
  const [user] = useAuthState(auth);

  const checkUser = () => {
    console.log(user);
  };

  const genSummary = (text, title) => {
    try {
      axios
        .post(
          aiURL,
          {
            messages: [
              {
                role: "user",
                content: `Summarize the following article: ${text}`,
              },
            ],
            model: "gpt-3.5-turbo",
            max_tokens: 250,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${apiKey}`,
            },
          }
        )
        .then(function (response) {
          const sumText = response.data.choices[0].message.content;
          // storing to Firestore
          // console.log(title);
          createSummary({ uid: user.uid, text: sumText, title: title });

          setSummary(sumText);
          // fetchSummary({ uid: user.uid });
        });

      // setSummary(response.data.choices[0].text);
    } catch (error) {
      console.error("Error summarizing text:", error);
    }
  };

  return (
    <>
      {/* <div className={ContentCSS.content}>{summary}</div> */}
      <div className={ContentCSS.content}>{content}</div>
      <Button variant="contained" onClick={() => genSummary(content, title)}>
        Summarize
      </Button>
      {/* <Button variant="contained" onClick={checkUser}>Summarize</Button> */}
      {/* <Button variant="contained" onClick={() => setSummary(democontent)}>Summarize</Button> */}
      {/* <button onClick={() => genSummary(content)}>Summarize</button> */}
    </>
  );
}
