import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { Form, Input, DatePicker, Button, InputNumber, message, Space } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
const { TextArea } = Input;

// EDIT - non so perchè qui il format che fa funzionare il datepicker è questo ma in realtà è l'opposto bo okay
const dateFormat = 'DD/MM/YYYY';

const layout = {
    labelCol: {
      span: 5,
    },
    wrapperCol: {
      span: 14,
    },
  };

export default class EditingPage extends React.Component {

    state = {
        data: [
          {title: 'Code Title', datestr: '10/05/2021', description: 'This is the description', parts: ["// PART 1 codice prima parte","// PART 2 codice seconda parte"]}
        ],
    }

    removePart = (record) => {
      console.log("oplà")
      console.log(record)
    }

     render() {
      return (
        <div className="editing-page" style={{ padding: '0 50px', marginTop:80, paddingBottom:'80px'}}>
            <Form {...layout} name="nest-messages" onFinish={console.log("finished")} >
            <h1 style={{fontSize: '20px', paddingLeft:'280px', letterSpacing:'2px', fontFamily:'Source Sans Pro',
                        color:'#54748e', textTransform:'uppercase', fontWeight:'bold'}}>Edit Code</h1>

            {/* EDIT - now takes hardcoded data from the state for all the information */}
            <Form.Item name="title" label={<label style={{textTransform:'uppercase',letterSpacing:'2px', fontSize:'14px'}}>Title</label>} >
            <Input name="title" defaultValue={this.state.data[0].title}/>
            </Form.Item>

            <Form.Item name="description" label={<label style={{textTransform:'uppercase',letterSpacing:'2px', fontSize:'14px'}}>Description</label>} >
            <TextArea defaultValue={this.state.data[0].description}/>
            </Form.Item>

            <Form.Item name="date" label={<label style={{textTransform:'uppercase',letterSpacing:'2px', fontSize:'14px'}}>Date of lecture</label>}>
            <DatePicker name="datePicker" defaultValue={moment(this.state.data[0].datestr, dateFormat)}/>
            </Form.Item>

            <Form.Item name="parts" label={<label style={{textTransform:'uppercase',letterSpacing:'2px', fontSize:'14px'}} >
              Parts</label>}>
              {this.state.data[0].parts.map(p => (<Form.Item name={`code${p.indexOf}`} >
              <TextArea autoSize={{ minRows: 5, maxRows: 15 }} defaultValue={p}/>
              <div style={{float:'right'}}><Button type='text' icon={<CloseCircleOutlined style={{color: '#54748e'}} />} 
              // EDIT - a removePart va passato l'id della parte, l'indice o qualsiasi cosa che la identifichi
              onClick={() =>{this.removePart()} }/></div>
             </Form.Item>))}
              </Form.Item>

              <div className="button-custom">
              <Button name="submitButton" type="default" htmlType="reset" style={{textTransform:'uppercase', fontSize:'12px', letterSpacing:'2px', margin: '5px'}}> 
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