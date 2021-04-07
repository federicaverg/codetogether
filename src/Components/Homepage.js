// Class that represents the landing page/homepage, so where the table containing all the exisiting exercises is displayed

import React from 'react';
import { Layout, Table, Tooltip, Space } from 'antd';
import { EditFilled, DeleteFilled } from '@ant-design/icons';
import axios from 'axios';

const { Content } = Layout;

const columns = [
  {
    title: "Title",
    dataIndex: 'title',
    key: 'title',
    render: text => <a>{text}</a>,
  },
  {
    title: "Lecture",
    dataIndex: 'lecture',
    key: 'lecture',
  },
  {
    title: "Last updated",
    dataIndex: 'lastAccess',
    key: 'lastAccess',
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
    render: () => (
      <center>
      <Space size="large">
        <a><EditFilled /></a>
        <a><DeleteFilled /></a>
      </Space>
      </center>
    ),
  },
];

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

  constructor() {
    super();

    this.state = {exercises: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/exercises')
    .then(response => {
      console.log(response.data)
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
      <Table columns={columns} dataSource={this.state.exercises}  />
      </div>
    </Content>
    </div>
      )
    }
}

export default Homepage;