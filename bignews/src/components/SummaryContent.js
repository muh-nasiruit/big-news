// import { useState } from "react";
import SumCSS from "./SummaryContent.module.css"

export default function SummaryContent({content}) {
  return (
    <div className={SumCSS.content}>{content}</div>
  )
}
