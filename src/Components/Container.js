import React, { useState, useEffect } from "react";
import Editor from "./Editor";

var codeWrong = `class HELLO {
  protected String brand = "Ford";         // Vehicle attribute
  public void honk() {                     // Vehicle method
    System.out.println("Tuut, tuut!");
  }
}

class Car extends Vehicle {
  private String modelName = "Mustang";    // Car attribute
  public static void main(String[] args) {

    // Create a myCar object
    Car myCar = new Car();

    // Call the honk() method (from the Vehicle class) on the myCar object
    myCar.honk();

    // Display the value of the brand attribute (from the Vehicle class) and the value of the modelName from the Car class
    System.out.println(myCar.brand + " " + myCar.modelName);
  }
}
`;

var code = codeWrong.replace(/\s/g, '');

function hex2a(hexx) {
    var hex = hexx.toString();//force conversion88
    var code = '';
    for (var i = 0; i < hex.length; i += 2)
        code += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
return code;}

var codeRight = hex2a(code);

export default function Container(props) {
  const [value, setValue] = useState("");
  var exercisey = JSON.stringify(props.value);
  //var exercisex = JSON.parse(exercisey);
  console.log(props.value.code);

  /*for (const [key, value] of Object.entries(props.value)) {
    console.log(key, value);
  }*/

  //props.value.forEach(tf => {console.log(tf)});
  code = props.value.code.replace(/\s/g, '');
  console.log(hex2a(code));

  useEffect(() => {
    console.log(value);
  }, [value]);

  // reload browser after change
  return (
    <Editor
      initialValue={hex2a(code)}
      onChange={value => setValue(props.value.code)}
    />
  );
}
