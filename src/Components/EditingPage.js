import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { Form, Input, DatePicker, Button, InputNumber, message, Space } from 'antd';
import { CloseCircleOutlined, PlusOutlined } from '@ant-design/icons';


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

  // triggered when save changes button is clicked
  const onFinish = (values) => {
    console.log(values);  
    }

    // to reset the form
  function cancelChanges() {
    console.log("cancel");
  }

export default class EditingPage extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      data: [""],
      dataTitle: props.match,
      dateString: "",
      parti: ["p1","p2"]
    }
  }

  componentDidMount() {
    console.log(this.state.dataTitle.params.title);

    axios.get(`http://localhost:5000/exercises/title/${this.state.dataTitle.params.title}`)
    .then(response => {
      this.setState({data: response.data });
      console.log(this.state.data);
      console.log(this.state.data.title);



      this.setState({dateString: this.state.data.date.substring(0,10)})
      console.log(this.state.dateString);
      console.log(this.state.data.description);
      console.log(this.state.data.date);
      this.setState({})
    })
    .catch((error) => { console.log(error);})
  }


    removePart = (record) => {
      console.log("oplà")
      console.log(record)
    }

    addPart = () => {
      console.log("Part added")
    }

     render() {
      return (
        <div className="editing-page" style={{ padding: '0 50px', marginTop:80, paddingBottom:'80px'}}>
            <h1 style={{fontSize: '20px', paddingLeft:'280px', letterSpacing:'2px', fontFamily:'Source Sans Pro',
                        color:'#54748e', textTransform:'uppercase', fontWeight:'bold'}}>Edit Code</h1>
            
            <Input name="title" defaultValue={this.state.dataTitle.params.title} />

            <TextArea defaultValue={this.state.data.description} />
            
            <DatePicker name="datePicker" defaultValue={moment(this.state.data.date, dateFormat)}/>
            
            {this.state.parti.map(part => (
              <React.Fragment>
              <TextArea autoSize={{ minRows: 5, maxRows: 15 }} defaultValue={part} />
              <div style={{float:'right'}}><Button type='text' icon={<CloseCircleOutlined style={{color: '#54748e'}} />} onClick={() =>{this.removePart()} }/></div>
              </React.Fragment>
            ))}

            <Button name="addButton" icon= {<PlusOutlined />} type="default" htmlType="reset" shape="round" onClick={this.addPart.bind(this)}
             style={{textTransform:'uppercase', fontSize:'12px', letterSpacing:'2px', float: 'right'}}>Add</Button>

              <div className="button-custom">
              <Button name="submitButton" type="default" htmlType="reset" onClick={() => cancelChanges()} style={{textTransform:'uppercase', fontSize:'12px', letterSpacing:'2px', margin: '5px'}}> 
                  Cancel
                </Button>
                <Button name="submitButton" type="primary" htmlType="submit" style={{textTransform:'uppercase', fontSize:'12px', letterSpacing:'2px', margin: '5px'}}> 
                  Save changes
                </Button>
                </div>
      </div>
      );
    }
  }