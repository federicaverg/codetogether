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

  function cancelChanges() {
    console.log("cancel");
  }

export default class EditingPage extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      data: [{code: []}],
      dataProps: props.match,
      dateString: props.match.params.date.substring(0,10),
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

     render() {
      return (
        <div className="editing-page" style={{ padding: '0 50px', marginTop:80, paddingBottom:'80px'}}>
            <Form {...layout} name="nest-messages" onFinish={onFinish.bind(this)} >
            <h1 style={{fontSize: '20px', paddingLeft:'280px', letterSpacing:'2px', fontFamily:'Source Sans Pro',
                        color:'#54748e', textTransform:'uppercase', fontWeight:'bold'}}>Edit Code</h1>

            {/* EDIT - now takes hardcoded data from the state for all the information */}
            <Form.Item name="title" label={<label style={{textTransform:'uppercase',letterSpacing:'2px', fontSize:'14px'}}>Title</label>} >
            <Input name="title" defaultValue={this.state.dataProps.params.title}/>
            </Form.Item>

            <Form.Item name="description" label={<label style={{textTransform:'uppercase',letterSpacing:'2px', fontSize:'14px'}}>Description</label>} >
            <TextArea defaultValue={this.state.data.code}></TextArea>
            </Form.Item>

            <Form.Item name="date" label={<label style={{textTransform:'uppercase',letterSpacing:'2px', fontSize:'14px'}}>Date of lecture</label>}>
            <DatePicker name="datePicker" defaultValue={moment(this.state.dateString, dateFormat)}/>
            </Form.Item>

               {/**EDIT - map through the hardcoded parts in the state, then gives it index="indice" to all of them
           * the default value passed 'p' should be a string because in the state, parts is an array of strings
          */}
            <Form.Item name="parts" label={<label style={{textTransform:'uppercase',letterSpacing:'2px', fontSize:'14px'}} >
              Parts</label>}>
              {this.state.parts.map(p => (<Form.Item name="indice" >
              <TextArea autoSize={{ minRows: 5, maxRows: 15 }} defaultValue={p}/>
              <div style={{float:'right', marginBottom: '-10px'}}><Button type='text' icon={<CloseCircleOutlined style={{color: '#54748e'}} />} 
              // EDIT - a removePart va passato l'id della parte, l'indice o qualsiasi cosa che la identifichi
              onClick={this.removePart.bind(this)}/></div>
             </Form.Item>))}

             <Button name="addButton" icon= {<PlusOutlined />} type="default" shape="round" onClick={this.addPart.bind(this)}
             style={{textTransform:'uppercase', fontSize:'12px', letterSpacing:'2px', float: 'right'}}>Add</Button>
              </Form.Item> 


            {/* <Form.Item name="parts" label={<label style={{textTransform:'uppercase',letterSpacing:'2px', fontSize:'14px'}} >
              Parts</label>}>
              {this.state.data.code.map(p => (<Form.Item name={`code${p.indexOf}`} >
              <TextArea autoSize={{ minRows: 5, maxRows: 15 }} defaultValue={p}/>
              <div style={{float:'right'}}><Button type='text' icon={<CloseCircleOutlined style={{color: '#54748e'}} />} 
              // EDIT - a removePart va passato l'id della parte, l'indice o qualsiasi cosa che la identifichi
              onClick={() =>{this.removePart()} }/></div>
             </Form.Item>))}
              </Form.Item> */}

              <TextArea value={this.state.data.code}></TextArea>
              <div className="button-custom">
              <Button name="submitButton" type="default" htmlType="reset" onClick={() => cancelChanges()} style={{textTransform:'uppercase', fontSize:'12px', letterSpacing:'2px', margin: '5px'}}> 
                  Cancel
                </Button>
                <Button name="submitButton" type="primary" htmlType="submit" style={{textTransform:'uppercase', fontSize:'12px', letterSpacing:'2px', margin: '5px'}}> 
                  Save changes
                </Button>
                </div>
            </Form>

      </div>
      );
    }
  }