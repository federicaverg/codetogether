import React from 'react';
import { Form, Input, DatePicker, Button, InputNumber } from 'antd';

const { TextArea } = Input;

const layout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 14,
  },
};

const onFinish = (values) => {
  console.log(values);};

  function onChange(numvalue) {
    console.log('changed', numvalue);
  }


export default class CreateSourceCode extends React.Component {

  state = {
    value: '',
  };

  stateA = {
    inputValue: 1,
  };

  onChange = ({ target: { value } }) => {
    this.setState({ value });
  };



  render() {
    const { value } = this.state;
    return (
      <div className="create-source-code" style={{ padding: '0 50px', marginTop:80,}}>
      <Form {...layout} name="nest-messages" onFinish={onFinish} >
      <Form.Item name="Title" label={<label style={{textTransform:'uppercase',letterSpacing:'2px', fontSize:'14px'}}>Title</label>} rules={[{ required: true, }, ]}>
        <Input />
      </Form.Item>
      
      <Form.Item name="Date of lecture" label={<label style={{textTransform:'uppercase',letterSpacing:'2px', fontSize:'14px'}}>Date of lecture</label>} rules={[{required: true,}]} >
          <DatePicker />
        </Form.Item>

        <Form.Item label={<label style={{textTransform:'uppercase',letterSpacing:'2px', fontSize:'14px'}}>Description</label>} >
        <TextArea />
        </Form.Item>

        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 5 }} rules={[{required: true}]}>
        <TextArea
          value={value}
          onChange={this.onChange}
          placeholder="</>"
          autoSize={{ minRows: 5, maxRows: 15 }}
        />
        </Form.Item>

        <Form.Item label={<label style={{textTransform:'uppercase',letterSpacing:'2px', fontSize:'14px'}}>Parts</label>}>
        <InputNumber min={0} max={20} defaultValue={0} onChange={onChange} />
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