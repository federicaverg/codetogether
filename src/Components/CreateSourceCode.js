import React from 'react';
import { Form, Input, DatePicker, Button, InputNumber, Space } from 'antd';
import { CodeOutlined, CheckCircleTwoTone } from '@ant-design/icons';

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
};




export default class CreateSourceCode extends React.Component {
  
  state = {
    temp: [],
    number_parts: ["p"]
  }

  onChange = value => {
    //save number of parts into state as it gets changed
    this.setState({temp: value});
    
  };

  updateParts = () => {
    console.log(this.state.temp);
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

        <Form.Item name="parts" label={<label style={{textTransform:'uppercase',letterSpacing:'2px', fontSize:'14px'}}>Parts</label>} >
        <InputNumber min={1} max={10} onChange={this.onChange}/> 
         <Button type="text" icon={ <CheckCircleTwoTone twoToneColor="#4663ac" onClick={this.updateParts}/>} />
        </Form.Item>

        <Form.Item name="code" wrapperCol={{ ...layout.wrapperCol, offset: 5 }} rules={[{required: true}]}>
          {this.state.number_parts.map(part => (<TextArea placeHolder="</>"  autoSize={{ minRows: 5, maxRows: 20 }}/>))}
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