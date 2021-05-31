import React, {PureComponent} from 'react';
import { Form, Input, Button, Select } from 'antd';
import axios from 'axios';

const { TextArea } = Input;
const { Option } = Select;

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
    //console.log(values.exercise);
    //console.log(values.description);
    //console.log(values.code);
  };
  
export default class CreateVersion extends PureComponent {

    componentDidMount(){
    }
    
      render() {
        return (
          <div className="create-source-code" style={{ padding: '0 50px', marginTop:80,}}>
          <Form {...layout} name="nest-messages" onFinish={onFinish} >
          <Form.Item name="exercise" label={<label style={{textTransform:'uppercase',letterSpacing:'2px', fontSize:'14px'}}>Exercise</label>} rules={[{required:true}]} >
            <Select style={{ width: 200 }}>
              {}
            <Option value="1" /*exercise._id*/>Exercise 1</Option>
            <Option value="2">Exercise A*</Option>
            </Select>
          </Form.Item>

          <Form.Item name="description" label={<label style={{textTransform:'uppercase',letterSpacing:'2px', fontSize:'14px'}}>Description</label>} >
        <TextArea />
        </Form.Item>

        <Form.Item name="code" wrapperCol={{ ...layout.wrapperCol, offset: 5 }} rules={[{required: true}]}>
        <TextArea
          onChange={this.onChange}
          placeholder="</>"
          autoSize={{ minRows: 5, maxRows: 15 }}
        />
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