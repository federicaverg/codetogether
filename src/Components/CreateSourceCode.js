import React from 'react';
import { Form, Input, DatePicker, Button, InputNumber } from 'antd';
import { CodeOutlined,CheckCircleTwoTone } from '@ant-design/icons';
import axios from 'axios';

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
  //console.log(values.title);
  //console.log(values.date);
  //console.log(JSON.stringify(values.date));
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

          //PROVARE SE FUNZIONA CON DB
          parts: values.parts
          //parts: this.state.nParts,
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

  state = {
    nparts: "",
    codeareas: ["default"],
  }

  updateParts = (value) => {
    this.setState({nparts: value});
  }

  buttonClicked = () => {
    //console.log(this.state.nparts);
    const n = this.state.nparts;
    const { codeareas } = this.state;
    for (var i = 0; i < n-1; i++) {
      codeareas.push("new");
    }
    this.setState({codeareas});
  }


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

        <Form.Item name="parts" label={<label style={{textTransform:'uppercase',letterSpacing:'2px', fontSize:'14px'}}>
          <Button onClick={this.buttonClicked.bind(this)} type="text" icon={<CheckCircleTwoTone twoToneColor="#52c41a" />}/>Parts</label>} >
        <InputNumber onChange={this.updateParts.bind(this)} min={1} max={10}/></Form.Item>

        <Form.Item name="code" wrapperCol={{ ...layout.wrapperCol, offset: 5 }} rules={[{required: true}]}>
          {this.state.codeareas.map(p => (<TextArea  autoSize={{ minRows: 5, maxRows: 20 }}/>))}
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