// Class that represents the versions menu, so where the table containing all the exisiting versions is displayed

import React, {Component} from 'react';
import { Layout, Table, Tooltip, Space, message, Popconfirm } from 'antd';
import {BrowserRouter as Router,  Link, Route} from "react-router-dom";
import { DeleteFilled } from '@ant-design/icons';
import axios from 'axios';

const { Content } = Layout;

// to show success message
function confirm() {
  message.success('Successfully deleted');
}

class VersionMenu extends Component { 
  // definition of columns in the table
  columns = [
    {
      title: "Version",
      dataIndex: 'title',
      key: 'title',
      render: text => <a>{text}</a>,
    },
    {
      title: "Source code",
      dataIndex: 'exercise',
      key: 'exercise',
      render: (text) => <Link to={`/display/exercise/${text}`}>
        {text}
      </Link>,
    },
    {
      title: "Date",
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: "Last update",
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
        title="Delete this version?"
        onConfirm={() => {
          confirm();
          this.removeVersion(record);
        }}
        okText="Yes"
        cancelText="No"
      >
      <a href="#"><DeleteFilled /></a>
      </Popconfirm>
        </Space>
        </center>
      ),
    },
  ];

  // where the data of the table is stored
  state = { 
    versions: []
  }

  componentDidMount() {
    axios.get('http://localhost:5000/versions')
    .then(response => {
      console.log(response.data)
      this.setState({versions: response.data })

      for(var i = 0; i<response.data.length; i++){
          response.data[i].date = response.data[i].date.substring(0,10);
          response.data[i].updatedAt = response.data[i].updatedAt.substring(0,10);
      }
      this.setState({versions: response.data })
      console.log(this.state.versions)
    })
    .catch((error) => { console.log(error);})
  }

  // method to remove the row of a selected version
  removeVersion = (record) => {
    console.log('delete ', record);
    const dataSource = [...this.state.versions];
    console.log(dataSource);
    this.setState({ data: dataSource.filter(item => item._id !== record._id) });
    console.log(dataSource);
  }

  render() {
    return (
    <div className="homepage">
    <Content className="site-layout" style={{ padding: '0 50px', marginTop:50}}>
      <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
      <Table columns={this.columns} dataSource={this.state.versions}  />
      </div>
    </Content>
    </div>
    )
  }
  }

export default VersionMenu;