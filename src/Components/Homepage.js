// Class that represents the landing page/homepage, so where the table containing all the exisiting exercises is displayed

import React from 'react';
import { Layout, Table, Tooltip, Space, Popconfirm, message } from 'antd';
import {Link} from "react-router-dom";
import { EditFilled, DeleteFilled } from '@ant-design/icons';
import axios from 'axios';

const { Content } = Layout;

// SEND CALL TO REMOVE EXERCISE AND ALL ITS VERSIONS FROM DATABASE HERE!!
function confirm() {
  message.success('Successfully deleted');
}

const ident = 0;

const data = [
  {
    key: '1',
    title: 'Exercise 1',
    lecture: '10/02/2021',
    update: '05/03/2021',
    description: 'Breadth first search is an algorithm for traversing or searching tree or graph data structures.',
  },
  {
    key: '2',
    title: 'Example A*',
    lecture: '21/04/2020',
    update: '27/04/2020',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    key: '3',
    title: 'Homework',
    lecture: '11/05/2021',
    update: '11/05/2021',
    description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
];

class Homepage extends React.Component {
  columns = [
    {
      title: "Title",
      dataIndex: 'title',
      key: 'title',
      render: (text) => <Link to={`/display/exercise/${text}`}>
        {text}
      </Link>,
    },
    {
      title: "Lecture",
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: "Last updated",
      dataIndex: 'updatedAt',
      key: 'updatedAt',
    },
    {
      title: "Description",
      dataIndex: 'description',
      key: 'description',
      width: 400,
      ellipsis: {
        showTitle: false,
      },
      render: description => (
        <Tooltip placement="topLeft" title={description}>
          {description}
        </Tooltip>
      ),
    },
    {
      title: <center>Action</center>,
      key: 'action',
      render: (record) => (
        <center>
          <Space size="large">
          <Popconfirm
        title="Delete this exercise?"
        onConfirm={() => {
          confirm();
          this.removeExercise(record);
        }}
        okText="Yes"
        cancelText="No"
      >
      <a href="#"><DeleteFilled /></a>
      </Popconfirm>
      
      {/* EDIT 
          GIORGIO: Redirect to edit page of the specific exercise, for now it redirects to default edit page */}
      <Link to="/edit"><EditFilled /></Link>
        </Space>
        </center>
      ),
    },
  ]

  // TEST
  state = {
      exercises: ["a"]
  }
  
  //To remove row for selected exercise
  removeExercise = (record) => {
    console.log(record)
    console.log('delete ', record);
    const dataSource = [...this.state.exercises];
    this.setState({ exercises: dataSource.filter(item => item._id !== record._id) });

    axios.delete(`http://localhost:5000/exercises/${record._id}`)
    .then(response => {
      console.log(response)

      axios.delete(`http://localhost:5000/versions/delete/${record.title}`)
        .then(response => {
          console.log(response)
        })
        .catch((error) => { console.log(error);})


    })
    .catch((error) => { console.log(error);})
  }


  componentDidMount() {
    axios.get('http://localhost:5000/exercises')
    .then(response => {
      console.log(response.data)
      this.setState({exercises: response.data })
      console.log(this.state.exercises[2])

      for(var i = 0; i<response.data.length; i++){
          response.data[i].date = response.data[i].date.substring(0,10);
          response.data[i].updatedAt = response.data[i].updatedAt.substring(0,10);
      }
      this.setState({exercises: response.data })
      console.log(this.state.exercises)
    })
    .catch((error) => { console.log(error);})
  }


    render() {
      return (
        <div className="homepage">
    <Content className="site-layout" style={{ padding: '0 50px', marginTop:50}}>
      <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
      <Table columns={this.columns} dataSource={this.state.exercises}  />
      </div>
    </Content>
    </div>
      )
    }
}

export default Homepage;