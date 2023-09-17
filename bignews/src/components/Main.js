import { useState, useRef } from "react";
import Nav from "./Nav.js";
import News from "../pages/News.js";
import Summary from "../pages/Summary.js";
import MainCSS from "./Main.module.css";
// import Paper from '@mui/material/Paper';
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

export default function Main({ children }) {
  const search = useRef('');
  const [searched, setSearched] = useState('');
  const [flag, setFlag] = useState(true);

  // const check = () => {
  //   console.log(search.current.value);
  //   return search.current.value;
  // };

  return (
    <>
      {/* <div className={MainCSS.gap}></div> */}

      <div className={MainCSS["search-signout-container"]}>
        <div className={MainCSS.searchbox}>
          <InputBase
            className={MainCSS.searchboxinput}
            inputRef={search}
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search Here"
            // inputProps={{ 'aria-label': 'search google maps' }}
          />

          <IconButton
            onClick={() => setSearched(search.current.value)}
            type="button"
            sx={{ p: "10px" }}
            aria-label="search"
          >
            <SearchIcon />
          </IconButton>
        </div>
          <div className={MainCSS.signout}>
            {children}
            </div>
      </div>

      {/* <input className={MainCSS.searchbox} ref = {search} onChange={() => check()} placeholder="Search Here"/> */}
      <Nav check={flag} setFlag={setFlag} />
      {flag ? <News searchTerm={searched} /> : <Summary searchTerm={searched}/>}
    </>
  );
}
