import { useState, useEffect } from "react";
import { newsUrl } from "./url.js";
import Content from "../components/Content.js";
import axios from "axios";
import NewsCSS from "./News.module.css";
import { CircularProgress } from '@mui/material';


export default function News({ searchTerm }) {
  const [topArt, setTopArt] = useState([]);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    axios
      .get(newsUrl)
      .then((response) => {
        const resArticles = response.data.articles;
        setTopArt(resArticles);
        setTimeout(() => {
          // mapContent(resArticles)
          // setTopArt(resArticles)
          // console.log(response.data.articles)
          // content generator
          setLoading(false);
        }, 500);
        // navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const webCrawl = async (nUrl, ind) => {
    await axios
      .post("http://localhost:4000/crawl", { url: nUrl })
      .then((r2) => {
        const crawledData = r2.data.content;

        setContent(crawledData);
        setTitle(topArt[ind].title);
        topArt[ind].fullContent = crawledData;
        // const crawledContent = r2.data.content;
        // console.log(r2)
        return;
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div className={NewsCSS.container}>
        {loading ? (
          <CircularProgress color="inherit" />
        ) : (
          <section className={NewsCSS.headlines}>
            {topArt
              .filter((item) => {
                return searchTerm.toLowerCase() === ""
                  ? item
                  : item.title.toLowerCase().includes(searchTerm.toLowerCase());
              })
              .map((val, ind) => {
                return (
                  <p key={ind}
                    onClick={() => {
                      if (!val.fullContent) {
                        webCrawl(val.url, ind);
                      } else {
                        setContent(val.fullContent);
                        setTitle(val.title);
                      }
                    }}
                  >
                    <b className={NewsCSS.hash}>#{ind + 1} </b>
                    {val.title}
                  </p>
                );
              })}
          </section>
        )}
        <section className={NewsCSS.content}>
          {content && title ? <Content content={content} title={title} /> : ""}
        </section>
      </div>
    </>
  );
}
