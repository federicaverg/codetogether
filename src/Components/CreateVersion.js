import React, {PureComponent} from 'react';
import { Form, Input, Button, Select } from 'antd';

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
    console.log(values);};


function handleChange(value) {
        console.log(`selected ${value}`);
      }
  
export default class CreateVersion extends PureComponent {
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
          <Form.Item name="Exercise" label={<label style={{textTransform:'uppercase',letterSpacing:'2px', fontSize:'14px'}}>Exercise</label>} rules={[{required:true}]} >
            <Select style={{ width: 200 }} onChange={handleChange}>
            <Option value="1">Exercise 1</Option>
            <Option value="2">Exercise A*</Option>
            </Select>
          </Form.Item>

          <Form.Item name="Part" label={<label style={{textTransform:'uppercase',letterSpacing:'2px', fontSize:'14px'}}>Part</label>} rules={[{required:true}]}>
            <Select style={{ width: 80 }} onChange={handleChange}>
            <Option value="1">1</Option>
            <Option value="2">2</Option>
            <Option value="3">3</Option>
            </Select>
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