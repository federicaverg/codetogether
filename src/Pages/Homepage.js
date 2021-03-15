import React from 'react';
import { Table } from 'antd';

const dataSource = [
    {
      key: '1',
      name: 'Exercise 1',
      lecture: '10/02/2021',
      lastUpdate: '18/02/2021',
      notes: 'Exercise about BFS and DFS algorithms',
    },
    {
        key: '1',
        name: 'Example of A*',
        lecture: '05/03/2021',
        lastUpdate: '05/03/2021',
        notes: 'Exercise about A* search algorithm',
    },
  ];

  const columns = [
    {
      title: 'Title',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Date',
      dataIndex: 'lecture',
      key: 'lecture',
    },
    {
      title: 'Last update',
      dataIndex: 'lastUpdate',
      key: 'lastUpdate',
    },
    {
        title: 'Notes',
        dataIndex: 'notes',
        key: 'notes',
      },
  ];
  

const Homepage = () => (
    <Table dataSource={dataSource} columns={columns} />
);

export default Homepage;