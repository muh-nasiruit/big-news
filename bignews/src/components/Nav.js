import { useState } from "react";
import NavCSS from "./Nav.module.css";
import ToggleButton from "@mui/material/ToggleButton";

//buttons that will navigate to either News or Summary

export default function Nav({ flag, setFlag }) {
    const [sel, setSel] = useState(true);
  return (
    <>
      <div className={NavCSS.container}>
        {/* <button onClick={() => setFlag(true)}> News </button> */}
        <ToggleButton
          className={NavCSS.btn1}
          value="check"
          selected={sel}
          onClick={() => {
            setFlag(true)
            // if (!sel) setSel(sel)
          }}
          onChange={() => {
            setSel(true);
          }}
        >
          News - <b>Top Picks</b>
        </ToggleButton>
        {/* <button onClick={() => setFlag(false)}> Summary </button> */}
        <ToggleButton
          className={NavCSS.btn1}
          value="check"
          selected={!sel}
          onClick={() => {
            setFlag(false)
            // if (sel) setSel(!sel)
          }}
          onChange={() => {
            setSel(false);
          }}
        >
          Summary
        </ToggleButton>
      </div>
    </>
  );
}
