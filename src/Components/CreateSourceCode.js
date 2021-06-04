import React from 'react';
import { Form, Input, DatePicker, Button, InputNumber, message } from 'antd';
import { CodeOutlined,CheckCircleTwoTone } from '@ant-design/icons';
import axios from 'axios';
import Container from './Container';

const { TextArea } = Input;

// To define layout of page in columns and rows
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
  message.success('Successfully submitted');
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
        console.log("Source code already exists");
        message.error('Source code already exists');
      }
      console.log(this.state.exercises)
    })
    .catch((error) => { console.log(error);})
};

export default class CreateSourceCode extends React.Component {

  state = {
    nparts: '',
    codeareas: [],
    submitDisabled: true,
  }

  // updates the number of parts in a temporary variable
  updateParts = (value) => {
    this.setState({nparts: value});
  }

  // enable the submit button only if number of parts is defined 
  enableSubmit() {
    this.setState({submitDisabled: false})
  }

  // generates text areas
  buttonClicked = () => {
    
    const n = this.state.nparts;
    const updated = [];

    if (n !== '') {
      this.enableSubmit();
    }

    if (n == 1) {
      const newarea = {title:"Code", key:''}
      updated.push(newarea);
    } else {
      for (var i = 0; i < n; i++) {
        const newarea = {title:"Part", key:i+1};
        updated.push(newarea);
      }
    }
    this.setState({codeareas: updated});

  }

   render() {
    return (
      <div className="create-source-code" style={{ padding: '0 50px', marginTop:80,}}>
      <Form {...layout} name="nest-messages" onFinish={onFinish.bind(this)} >
      <Form.Item name="title" label={<label style={{textTransform:'uppercase',letterSpacing:'2px', fontSize:'14px'}}>Title</label>} rules={[{ required: true, }, ]}>
        <Input name="title"/>
      </Form.Item>
      
      <Form.Item name="date" label={<label style={{textTransform:'uppercase',letterSpacing:'2px', fontSize:'14px'}}>Date of lecture</label>} rules={[{required: true,}]} >
          <DatePicker name="datePicker"/>
        </Form.Item>

        <Form.Item name="description" label={<label style={{textTransform:'uppercase',letterSpacing:'2px', fontSize:'14px'}}>Description</label>} >
        <TextArea />
        </Form.Item>

        <Form.Item name="parts" label={<label style={{textTransform:'uppercase',letterSpacing:'2px', fontSize:'14px'}} >
          <Button onClick={this.buttonClicked.bind(this)} type="text" icon={<CheckCircleTwoTone twoToneColor="#52c41a" />}/>Parts</label>} rules={[{required: true}]}>
        <InputNumber onChange={this.updateParts.bind(this)} min={1} max={10} /></Form.Item>


        {this.state.codeareas.map(p => (<Form.Item name={`code${p.key}`} wrapperCol={{ ...layout.wrapperCol, offset: 5 }} rules={[{required: true}]}>
          <TextArea placeholder={p.title + ' ' + p.key} autoSize={{ minRows: 5, maxRows: 20 }}/>
        </Form.Item>))}
        

        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 5 }}>
        <Button type="primary" icon={<CodeOutlined />} size='large' />
        </Form.Item>

      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 5 }}>
        <Button name="submitButton" type="primary" htmlType="submit" style={{textTransform:'uppercase', fontSize:'12px', letterSpacing:'2px'}} disabled={this.state.submitDisabled}> 
          Submit
        </Button>
      </Form.Item>
    </Form>      
    </div>
    );
  }
}