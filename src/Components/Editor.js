import React, { useState, useEffect } from "react";
import Prism from "prismjs";
import { ReactCodeJar } from "react-codejar";

import "./prism.css";



export default function App({ initialValue, setCallBack, index }) {
  const [value, setValue] = useState(initialValue);
  
  useEffect(() => {
    console.log(value);
    setCallBack(value, index);

  }, [value]);


  const highlight = editor => {
    console.log(editor.textContent);
    editor.innerHTML = Prism.highlight(editor.textContent, Prism.languages.java, "java");  
  };

  return (
    <ReactCodeJar
      code={value} // Initial code value
      onUpdate={setValue} // Update the text
      highlight={highlight} // Highlight function, receive the editor
      lineNumbers={true} // Show line numbers
    />
  );
}
