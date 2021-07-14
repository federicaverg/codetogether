import React from 'react';
import axios from 'axios';

import { Form, Input, DatePicker, Button, InputNumber, message } from 'antd';

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
        code: [{title: 'Code Title', datestr: '17/07/2021', description: 'This is the description', codice:'codice test html <<<aihaso'}],
    }

     render() {
      return (
        <div className="editing-page" style={{ padding: '0 50px', marginTop:80}}>
            <Form {...layout} name="nest-messages" onFinish={console.log("finished")} >
            <h1 style={{fontSize: '17px', paddingLeft:'280px', letterSpacing:'2px', fontFamily:'Source Sans Pro',
                        color:'#54748e', textTransform:'uppercase', fontWeight:'bold'}}>Edit Code</h1>

            <Form.Item name="title" label={<label style={{textTransform:'uppercase',letterSpacing:'2px', fontSize:'14px'}}>Title</label>} >
            <Input name="title" placeholder="placeholder"/>
            </Form.Item>

            </Form>
      </div>
      );
    }
  }