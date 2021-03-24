import React, { useEffect } from "react";
import Yace from "yace";
import Prism from "prismjs";
import { highlight } from "mdhl";

import "./style-container.css";
import "mdhl/mdhl.css";
import "./prism.css";


function highlighter(value) {
    return Prism.highlight(value, Prism.languages.java, "javascript");
}

export default function App({ initialValue, onChange }) {
  useEffect(() => {
    const editor = new Yace("#editor", {
      lineNumbers: true,
      value: initialValue,
      styles: {
        fontSize: "20px"
      },
      highlighter,
      lineNumbers:true
    });

    editor.onUpdate(value => {
        console.log(value);
      });

    return () => {
      editor.root.innerHTML = "";
      editor.destroy();
    };
  }, []); // eslint-disable-line

  return (
    <div className="wrap">
      <div id="editor" />
    </div>
  );
}
