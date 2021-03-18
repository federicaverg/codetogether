// Class that represents the landing page/homepage, so where the table containing all the exisiting exercises is displayed

import React from 'react';
import { Layout, Menu, Breadcrumb, Table, Tooltip, Space } from 'antd';
import { EditFilled, DeleteFilled } from '@ant-design/icons';

const { Content } = Layout;

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
    <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Exercises</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
      <Table columns={columns} dataSource={data}  />
      </div>
    </Content>
);

export default Homepage;