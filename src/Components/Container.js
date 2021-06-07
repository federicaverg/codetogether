import React, { useState, useEffect } from "react";
import Editor from "./Editor";

// var code = codeWrong.replace(/\s/g, '');

// function hex2a(hexx) {
//     var hex = hexx.toString();
//     var code = '';
//     for (var i = 0; i < hex.length; i += 2)
//         code += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
// return code;}

// var codeRight = hex2a(code);

export default function Container(props) {
  const [value, setValue] = useState("");

  useEffect(() => {
    console.log(value);
  }, [value]);

  // reload browser after change
  return (
    <Editor
      initialValue={props.codice}
      onChange={value => setValue(value)}
    />
  );
}


