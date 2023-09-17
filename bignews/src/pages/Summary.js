import { useState, useEffect } from "react";
import { fetchSummary } from "../services/summaryService";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../components/firebase.js";
import SummaryContent from "../components/SummaryContent.js"
import SummaryCSS from "./Summary.module.css"
import { CircularProgress } from '@mui/material';


export default function Summary({ searchTerm }) {
  const [topSumm, setTopSumm] = useState([])
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState('');
  const [user] = useAuthState(auth);

  useEffect(() => {
    fetchSummary({ uid: user.uid }).then((response) => {
      setTopSumm(response)
      setTimeout(() => {
        // console.log('check: ',topSumm)
        setLoading(false);
      }, 500);
    }).catch((error) => {
      console.log(error);
    })
  }, [])

  return (
    <div className={SummaryCSS.container}>
      {loading ? (
        <CircularProgress color="inherit" />
      ): (
        <section className={SummaryCSS.headlines}>
          {topSumm.filter((item) => {
                return searchTerm.toLowerCase() === ""
                  ? item
                  : item.title.toLowerCase().includes(searchTerm.toLowerCase());
              }).map((val, ind) => {
            return (
              <p key={ind}
              onClick={() => {
                // console.log('clicked summary title!')
                setContent(val.text)
              }}><b className={SummaryCSS.hash}>#{ind + 1} </b>
              {val.title}</p>
            )
          })}
        </section>
      )}
      <section className={SummaryCSS.content}>
        {content ? <SummaryContent content={content}/> : ""}
      </section>
    </div>
  )
}
