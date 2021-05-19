// Class that represents the versions menu, so where the table containing all the exisiting versions is displayed

import React, {Component} from 'react';
import { Layout, Table, Tooltip, Space, message, Popconfirm } from 'antd';
import { EditFilled, DeleteFilled } from '@ant-design/icons';

const { Content } = Layout;

function confirm() {
  message.success('Successfully deleted');
}

class VersionMenu extends Component { 
  columns = [
    {
      title: "Version",
      dataIndex: 'version',
      key: 'version',
      render: text => <a>{text}</a>,
    },
    {
      title: "Source code",
      dataIndex: 'sourcecode',
      key: 'sourcecode',
      render: text => <a>{text}</a>,
    },
    {
      title: "Date",
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: "Last update",
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
      render: (record) => (
        <center>
        <Space size="large">
          <a><EditFilled /></a>
          <Popconfirm
        title="Delete this version?"
        onConfirm={() => {
          confirm();
          this.removeVersion(record.key);
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

  state = {
    data: [
      {
        key: '1',
        version: 'John Doe',
        sourcecode: 'Exercise 1',
        date: '20/04/2021',
        lastAccess: '05/03/2021',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      },
      {
        key: '2',
        version: 'Jane Doe',
        sourcecode: 'Exercise 2',
        date: '10/02/2021',
        lastAccess: '05/03/2021',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      },
      {
        key: '3',
        version: 'Billy Bob',
        sourcecode: 'Exercise 3',
        date: '12/10/2021',
        lastAccess: '05/03/2021',
        description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      },
    ]
  }

  removeVersion = (key) => {
    console.log('delete ', key);
    const dataSource = [...this.state.data];
    console.log(dataSource);
    this.setState({ data: dataSource.filter(item => item.key !== key) });
    console.log(dataSource);
  }

  render() {
    return (
    <div className="homepage">
    <Content className="site-layout" style={{ padding: '0 50px', marginTop:50}}>
      <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
      <Table columns={this.columns} dataSource={this.state.data}  />
      </div>
    </Content>
    </div>
    )
  }
  }

export default VersionMenu;