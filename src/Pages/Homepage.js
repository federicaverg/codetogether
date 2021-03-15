import React from 'react';
import { Layout, Menu, Breadcrumb, Table, Tooltip } from 'antd';

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
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
        <Menu.Item key="1">nav 1</Menu.Item>
        <Menu.Item key="2">nav 2</Menu.Item>
        <Menu.Item key="3">nav 3</Menu.Item>
      </Menu>
    </Header>
    <Content style={{ padding: '0 50px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-content">
      <Table columns={columns} dataSource={data}  />
      </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
  </Layout>
);

export default Homepage;