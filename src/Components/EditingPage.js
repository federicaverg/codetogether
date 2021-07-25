import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { Form, Input, DatePicker, Button, InputNumber, message, Space } from 'antd';
import { CloseCircleOutlined, PlusOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const dateFormat = 'YYYY/MM/DD'; 
const layout = {
    labelCol: {
      span: 5,
    },
    wrapperCol: {
      span: 14,
    },
  };

  // triggered when save changes button is clicked
  const onFinish = (values) => {
    console.log(values);  
    }

    // to reset the form
  function cancelChanges() {
    console.log("cancel");
  }

export default class EditingPage extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      data: [{code: []}],
      dataProps: props.match,
      dateString: "props.match.params.date.substring(0,10)",
      parts: ["p1","p2"]
    }
  }

  componentDidMount() {
    axios.get(`http://localhost:5000/exercises/title/${this.state.dataProps.params.title}`)
    .then(response => {
      this.setState({data: response.data });
      console.log(this.state.data);
      console.log(this.state.data.title);



      this.setState({dateString: this.state.data.date.substring(0,10)})
      console.log(this.state.dateString);
      console.log(this.state.data.description);
      console.log(this.state.data.date);
      this.setState({})
    })
    .catch((error) => { console.log(error);})
  }

          // to add a part
          addPart() {
            const num = this.state.parts.length;
            const updated = this.state.parts;
            let str1 = "Part ";
            let str2 = num+1;
            const newPart = str1.concat(str2);
            updated.push(newPart);
            this.updateParts(updated);
            console.log("New part was added")
          }
     
          updateParts = (value) => {
            this.setState({parts: value});
            console.log(this.state.parts);
          }
     
          // to remove a part
    removePart = (record) => {
      console.log("oplà")
      console.log(record)
    }

    addPart = () => {
      console.log("Part added")
    }

     render() {
      return (
        <div className="editing-page" style={{ padding: '0 50px', marginTop:80, paddingBottom:'80px'}}>
            <h1 style={{fontSize: '20px', paddingLeft:'280px', letterSpacing:'2px', fontFamily:'Source Sans Pro',
                        color:'#54748e', textTransform:'uppercase', fontWeight:'bold'}}>Edit Code</h1>
            
            <Input name="title" defaultValue={"titolo"} />

            <TextArea defaultValue={this.state.data.description} />
            
            {/*defaultValue={/*moment(this.state.data.date, dateFormat)*/}
            <DatePicker name="datePicker" />
            
            {this.state.parts.map(part => (
              <React.Fragment>
              <TextArea autoSize={{ minRows: 5, maxRows: 15 }} defaultValue={part} />
              <div style={{float:'right'}}><Button type='text' icon={<CloseCircleOutlined style={{color: '#54748e'}} />} onClick={() =>{this.removePart()} }/></div>
              </React.Fragment>
            ))}

            <Button name="addButton" icon= {<PlusOutlined />} type="default" htmlType="reset" shape="round" onClick={this.addPart.bind(this)}
             style={{textTransform:'uppercase', fontSize:'12px', letterSpacing:'2px', float: 'right'}}>Add</Button>

              <div className="button-custom">
              <Button name="submitButton" type="default" htmlType="reset" onClick={() => cancelChanges()} style={{textTransform:'uppercase', fontSize:'12px', letterSpacing:'2px', margin: '5px'}}> 
                  Cancel
                </Button>
                <Button name="submitButton" type="primary" htmlType="submit" style={{textTransform:'uppercase', fontSize:'12px', letterSpacing:'2px', margin: '5px'}}> 
                  Save changes
                </Button>
                </div>
      </div>
      );
    }
  }