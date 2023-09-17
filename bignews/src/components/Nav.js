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
          onClick={() => setFlag(true)}
          onChange={() => {
            setSel(!sel);
          }}
        >
          News - <b>Top Picks</b>
        </ToggleButton>
        {/* <button onClick={() => setFlag(false)}> Summary </button> */}
        <ToggleButton
          className={NavCSS.btn1}
          value="check"
          selected={!sel}
          onClick={() => setFlag(false)}
          onChange={() => {
            setSel(!sel);
          }}
        >
          Summary
        </ToggleButton>
      </div>
    </>
  );
}
