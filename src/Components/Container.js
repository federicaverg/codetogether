import Editor from "./Editor";



export default function Container(props) {
  

  // reload browser after change
  return (
    <Editor
      initialValue={props.codice}
      //onChange={value => setValue(value)}
    />
  );
}


