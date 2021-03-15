import React from 'react';
import { Layout, Menu, Breadcrumb, Table, Tooltip, Space } from 'antd';
import { HomeFilled, PlusCircleFilled, FolderFilled, EditFilled, DeleteFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom'

const { SubMenu } = Menu;

const { Header, Content, Footer } = Layout;

const columns = [
  {
    title: <b>Title</b>,
    dataIndex: 'title',
    key: 'title',
    render: text => <a>{text}</a>,
  },
  {
    title: <b>Lecture</b>,
    dataIndex: 'lecture',
    key: 'lecture',
  },
  {
    title: <b>Last updated</b>,
    dataIndex: 'update',
    key: 'update',
  },
  {
    title: <b>Description</b>,
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
    title: <center><b>Action</b></center>,
    key: 'action',
    render: () => (
      <center>
      <Space size="middle">
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


const Homepage = () => (
<Layout className="layout">
    <Header>
      <div className="logo" />
      <Menu theme="dark" selectedKeys={['1']} mode="horizontal">
      <Menu.Item key="1" icon={<HomeFilled />}>
          Homepage
        </Menu.Item>
        
        <SubMenu key="2" icon={<PlusCircleFilled />} title="Create">
            <Menu.Item key="setting:1"><Link to='/upload'>Source code</Link></Menu.Item>
            <Menu.Item key="setting:2">Version</Menu.Item>
        </SubMenu>
        
        <Menu.Item key="3" icon={<FolderFilled />}>
          <Link to='/'>Versions</Link>
        </Menu.Item>
      </Menu>
    </Header>
    <Content style={{ padding: '0 50px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
      </Breadcrumb>
      <div className="site-layout-content">
      <Table columns={columns} dataSource={data}  />
      </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Group Project ©2021 Created by FV&GM</Footer>
  </Layout>
);

export default Homepage;