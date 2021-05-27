import React from 'react';
import { Form, Input, DatePicker, Button, InputNumber } from 'antd';
import { CodeOutlined } from '@ant-design/icons';
import axios from 'axios';

const { TextArea } = Input;

// define layout of page in columns and rows
const layout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 14,
  },
};

const onFinish = (values) => {
  console.log(values);

  //console.log(values.title);

  //console.log(values.date);
  console.log(JSON.stringify(values.date));
  
  //console.log(values.description);

  //console.log(values.parts);
  //console.log(values.code);

  axios.get(`http://localhost:5000/versions/title/${values.title}`)
    .then(response => {
      console.log(response.data)
      if(response.data === ""){
        axios.post(`http://localhost:5000/exercises/add`, {
          title: values.title,
          date: values.date,
          description: values.description,
          code: values.code,
          parts: values.parts
        })
    .then(response => {
      console.log(response)
    })
    .catch((error) => { console.log(error);})
      }
      else{
        console.log("Esercizio già presente");
      }

      
      console.log(this.state.exercises)
    })
    .catch((error) => { console.log(error);})
};

export default class CreateSourceCode extends React.Component {

  render() {
    return (
      <div className="create-source-code" style={{ padding: '0 50px', marginTop:80,}}>
      <Form {...layout} name="nest-messages" onFinish={onFinish} >
      <Form.Item name="title" label={<label style={{textTransform:'uppercase',letterSpacing:'2px', fontSize:'14px'}}>Title</label>} rules={[{ required: true, }, ]}>
        <Input name="title"/>
      </Form.Item>
      
      <Form.Item name="date" label={<label style={{textTransform:'uppercase',letterSpacing:'2px', fontSize:'14px'}}>Date of lecture</label>} rules={[{required: true,}]} >
          <DatePicker name="datePicker"/>
        </Form.Item>

        <Form.Item name="description" label={<label style={{textTransform:'uppercase',letterSpacing:'2px', fontSize:'14px'}}>Description</label>} >
        <TextArea />
        </Form.Item>

        <Form.Item name="parts" label={<label style={{textTransform:'uppercase',letterSpacing:'2px', fontSize:'14px'}}>Parts</label>} >
        <InputNumber min={1} max={10}/>
        </Form.Item>

        <Form.Item name="code" wrapperCol={{ ...layout.wrapperCol, offset: 5 }} rules={[{required: true}]}>
        <TextArea
          placeholder="</>"
          autoSize={{ minRows: 5, maxRows: 20 }}
        />
        </Form.Item>

        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 5 }}>
        <Button type="primary" icon={<CodeOutlined />} size='large' />
        </Form.Item>

      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 5 }}>
        <Button type="primary" htmlType="submit" style={{textTransform:'uppercase', fontSize:'12px', letterSpacing:'2px'}}> 
          Submit
        </Button>
      </Form.Item>
    </Form>      
    </div>
    );
  }
}