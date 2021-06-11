import React, {PureComponent} from 'react';
import { Form, Input, Button, Select, InputNumber, message } from 'antd';
import axios from 'axios';
import { CheckCircleTwoTone } from '@ant-design/icons';

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

  var codes = []

  var i = 0;
  var codeDivided = "";
  for (const [key, value] of Object.entries(values)) {

    if(key.includes("code")) {
      i++;
      codeDivided = "// PART " + i + " \n\n" + value;
      console.log(codeDivided);
      codes.push(codeDivided);
    }     
  }
  axios.post(`http://localhost:5000/versions/add`, {
          title: "User",
          date: Date().toLocaleString(),
          description: values.description,
          code: codes,
          exercise: values.exercise
          })
    .then(response => {
      console.log(response)
      message.success('Successfully submitted');
    })
    .catch((error) => { console.log(error.response);})

  // If you need to check that the title doesn't exist already use this:
  // axios.get(`http://localhost:5000/versions/title/${values.title}`)
  //   .then(response => {
  //     console.log(response.data)
  //     if(response.data === null){
  //       console.log("SONO QUIII");
  //       axios.post(`http://localhost:5000/versions/add`, {
  //         title: "User",
  //         date: values.date,
  //         description: values.description,
  //         code: codes,
  //         exercise: values.exercise,
  //         parts: values.parts
  //       })
  //   .then(response => {
  //     console.log(response)
  //     message.success('Successfully submitted');
  //   })
  //   .catch((error) => { console.log(error);})
  //     }
  //     else{
  //       console.log("Source code already exists");
  //       message.error('Source code already exists');
  //     }
  //   })
  //   .catch((error) => { console.log(error);})

    
  };
  
export default class CreateVersion extends PureComponent {
  state = {
    nparts: '',
    codeareas: [],
    submitDisabled: true,
    exercisesTitle: [],
  }

  componentDidMount() {
    axios.get('http://localhost:5000/exercises')
    .then(response => {
      console.log(response.data)


      var exercises = response.data.map(ex => ex.title);

      this.setState({exercisesTitle: exercises })

      console.log(this.state.exercisesTitle)
    })
    .catch((error) => { console.log(error);})
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
          <Form {...layout} name="nest-messages" onFinish={onFinish} >
          <Form.Item name="exercise" label={<label style={{textTransform:'uppercase',letterSpacing:'2px', fontSize:'14px'}}>Exercise</label>} rules={[{required:true}]} >
            <Select style={{ width: 200 }}>
              {this.state.exercisesTitle.map(option => (<Option value={option}>{option}</Option>) )}
            </Select>
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
        <Button disabled={this.state.submitDisabled} type="primary" htmlType="submit" style={{textTransform:'uppercase', fontSize:'12px', letterSpacing:'2px'}}>
          Submit
        </Button>
      </Form.Item>
        
        </Form>      
        </div>
        );
      }
}