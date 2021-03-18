// Class that represents the versions menu, so where the table containing all the exisiting versions is displayed

import React from 'react';
import { Layout, Table, Tooltip, Space } from 'antd';
import { EditFilled, DeleteFilled } from '@ant-design/icons';

const { Content } = Layout;

const columns = [
  {
    title: "Part",
    dataIndex: 'part',
    key: 'part',
    width: 100,
  },
  {
    title: "Version",
    dataIndex: 'version',
    key: 'version',
    render: text => <a>{text}</a>,
  },
  {
    title: "Date",
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: "Last update",
    dataIndex: 'update',
    key: 'update',
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
    part: "1",
    version: 'Lorenzo Morlacco',
    date: '20/04/2021',
    update: '05/03/2021',
    description: 'Casetta miaaaaaa',
  },
  {
    key: '2',
    part: "2",
    version: 'Davide Parente',
    date: '10/02/2021',
    update: '05/03/2021',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    key: '3',
    part: "3",
    version: 'Giorgio Martini',
    date: '12/10/2021',
    update: '05/03/2021',
    description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
];

const VersionMenu = () => (
  <div className="homepage">
    <Content className="site-layout" style={{ padding: '0 50px', marginTop:50}}>
      <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
      <Table columns={columns} dataSource={data}  />
      </div>
    </Content>
    </div>
);

export default VersionMenu;