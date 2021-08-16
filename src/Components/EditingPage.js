import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { Form, Input, DatePicker, Button, Popconfirm, message } from 'antd';
import { CloseCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {Link} from "react-router-dom";


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

const tailLayout = {
    wrapperCol: {
      offset: 3,
      span: 16,
    },
  };  
  
  function confirm(e) {
    message.success('Successfully removed');
  }


    // to reset the form
  const onReset = () => {
    console.log("reset")
  };

export default class EditingPage extends React.Component {

      formRef = React.createRef();

        // triggered when save changes button is clicked
   onFinish = (values) => {
      console.log(values);
      console.log(this.state.data);

      var codes = [];
      
      for (const [key, value] of Object.entries(values)) {

            if(parseInt(key) == this.state.data.code.indexOf(this.state.data.code[key])){
                  if(value == undefined){
                        codes.push(this.state.data.code[key]);                              
                  }
                  else{
                        codes.push(value);
                   }
            }
      }
      console.log(codes);
  
      
      axios.post('http://localhost:5000/exercises/edit/' + this.state.data._id, {
            title: values.title,
            description: values.description,
            date: values.date,
            code: codes
      })
      .then(response => {
            message.success('Successfully submitted');
      })
      .catch((error) => { console.log(error);
      })
      }

    

  constructor(props){
    super(props);

    this.state = {
      data: [{code: []}],
      dataProps: props.match,
      dateP: "",
      parts: [],
    }
  }

  componentDidMount() {
    axios.get(`http://localhost:5000/exercises/title/${this.state.dataProps.params.title}`)
    .then(response => {
      this.setState({data: response.data });
      console.log(this.state.data);
      console.log(this.state.data.title);

      console.log(this.state.data.description);
      console.log(this.state.data.date);
      this.setState({parts: this.state.data.code})

      this.formRef.current.setFieldsValue({
            title: this.state.data.title,
            description: this.state.data.description,
            date: this.state.data.date
          });

    })
    .catch((error) => { console.log(error);})
  }

    addPart() {
        const num = this.state.data.code.length;
        const updated = this.state.data.code;
        let str1 = "// PART ";
        let str2 = num+1;
        const p = str1.concat(str2);
        updated.push(p);

        this.setState({parts: updated});
        console.log("New part added.")
    }

    removePart = (p) => {
      const num = this.state.parts.length;
      const updated = this.state.parts;
      if (num == 1) {
        const arr = [];
        let str1 = "// PART ";
        let str2 = num;
        const p = str1.concat(str2);
        arr.push(p);
        this.setState({parts: arr});
      } else {
         updated.splice(p, 1);
         this.setState({parts: updated});
      }
    }

     datePick() {
      //this.setState({dateP: value });
    }

     render() {
      return (
    
        <div className="editing-page" style={{ padding: '0 50px', marginTop:60}}>
             <Form {...layout} ref={this.formRef} name="nest-messages" onFinish={this.onFinish.bind(this)}>
            <h1 style={{fontSize: '20px', paddingLeft:'280px', letterSpacing:'2px', fontFamily:'Source Sans Pro',
                        color:'#54748e', textTransform:'uppercase', fontWeight:'bold'}}>Edit Code</h1>



            <Form.Item name="title" label={<label style={{textTransform:'uppercase',letterSpacing:'2px', fontSize:'14px'}}>Title</label>} >
            <div key={this.state.data.title}>
            <Input name="title" defaultValue={this.state.data.title}/>
            </div>
            </Form.Item>



            <Form.Item name="description" label={<label style={{textTransform:'uppercase',letterSpacing:'2px', fontSize:'14px'}}>Description</label>} >
            <div key={this.state.data.description}>
            <TextArea defaultValue={this.state.data.description} />
            </div></Form.Item>



            <Form.Item name="date" label={<label style={{textTransform:'uppercase',letterSpacing:'2px', fontSize:'14px'}}>Date</label>} >
                <div key={this.state.data.date}>
             <DatePicker name="datePicker" onChange={(value, e) => {this.setState({dateP: value }); console.log(this.state.dateP)}} defaultValue={moment(this.state.data.date, dateFormat)} format={dateFormat}/>
            </div>
            </Form.Item>
            

            <Form.Item name="parts" label={<label style={{textTransform:'uppercase',letterSpacing:'2px', fontSize:'14px'}}>Parts</label>} >
            {this.state.parts.map(part => (
              <Form.Item name={this.state.parts.indexOf(part)} style={{marginTop: '-15px', marginBottom: '-15px'}}>
                <div key={part}>
              <TextArea autoSize={{ minRows: 5, maxRows: 15 }} defaultValue={part} />
                <Popconfirm
                    title="Are you sure to delete this part?"
                    onConfirm={() => {
                        confirm();
                        this.removePart(this.state.parts.indexOf(part));
                    }}
                    okText="Yes"
                    cancelText="No">
                <div style={{float:'right'}}><Button type='text' icon={<CloseCircleOutlined style={{color: '#54748e', padding: '10px'}} />}/></div>
                </Popconfirm>
              
                
              </div>
            </Form.Item>
            ))} 
            <Button name="addButton" icon= {<PlusOutlined />} type="default" htmlType="reset" shape="round" onClick={this.addPart.bind(this)}
             style={{textTransform:'uppercase', fontSize:'12px', letterSpacing:'2px', float: 'right', marginTop: '30px'}}>Add</Button>
            </Form.Item>


            
            <Form.Item {...tailLayout} >
            <Button name="submitButton" type="primary" htmlType="submit" style={{textTransform:'uppercase', fontSize:'12px', letterSpacing:'2px', margin: '5px', float: 'right'}}> 
                  Save changes
                </Button>
              <Button name="resetButton" type="default" htmlType="reset" onClick={this.onReset.bind(this)} style={{textTransform:'uppercase', fontSize:'12px', letterSpacing:'2px', margin: '5px', float: 'right'}}> 
                  Cancel
                </Button>
                </Form.Item>
             </Form>
            
      </div>
      );
    }
  }