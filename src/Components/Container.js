import React, { useState, useEffect } from "react";
import Editor from "./Editor";

var codeWrong = `class Person:
def __init__(self, name, age):
  self.name = name
  self.age = age

def myfunc(self):
  print("Hello my name is " + self.name)

p1 = Person("John", 36)

p1.age = 40

print(p1.age)

`;

var code = codeWrong.replace(/\s/g, '');

function hex2a(hexx) {
    var hex = hexx.toString();//force conversion88
    var code = '';
    for (var i = 0; i < hex.length; i += 2)
        code += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
return code;}

var codeRight = hex2a(code);

export default function Container() {
  const [value, setValue] = useState("");

  useEffect(() => {
    console.log(value);
  }, [value]);

  // reload browser after change
  return (
    <Editor
      initialValue={codeWrong}
      onChange={value => setValue(value)}
    />
  );
}
