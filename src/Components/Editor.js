import React, { useEffect } from "react";
import Yace from "yace";
import Prism from "prismjs";
import { highlight } from "mdhl";

import "mdhl/mdhl.css";
import "./prism.css";
import "../Styles/style-container.css"


function highlighter(value) {
    return Prism.highlight(value, Prism.languages.java, "java");
}

export default function App({ initialValue, onChange, key }) {
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

    editor.onUpdate(onChange);

    return () => {
      editor.root.innerHTML = "";
      editor.destroy();
    };
  }, []); // eslint-disable-line

  return (
    <div className="wrap" key={key}>
      <div id="editor" />
    </div>
  );
}
