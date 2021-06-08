import React, { useState, useEffect } from "react";
import Prism from "prismjs";
//import { highlight } from "mdhl";
import { ReactCodeJar, useCodeJar } from "react-codejar";


//import "mdhl/mdhl.css";
import "./prism.css";


/*unction highlighter(value) {
    return Prism.highlight(value, Prism.languages.java, "java");
}*/

export default function App({ initialValue, onChange, key }) {
  const [value, setValue] = useState(initialValue);

  
  useEffect(() => {
    console.log(value);

  }, [value]);

  useEffect(() => {
  //   const editor = new Yace("#editor", {
  //     lineNumbers: true,
  //     value: initialValue,
  //     styles: {
  //       fontSize: "20px"
  //     },
  //     highlighter,
  //     lineNumbers:true
  //   });

  //   editor.onUpdate(setValue);

  //   return () => {
  //     editor.root.innerHTML = "";
  //     editor.destroy();
  //   };
  }, []); // eslint-disable-line

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
