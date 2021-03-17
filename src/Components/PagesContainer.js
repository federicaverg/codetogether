import React, {PureComponent} from 'react';
import { Layout, Space, Typography, Menu } from 'antd';
import {CodepenCircleOutlined, HomeOutlined, MenuOutlined, FileAddOutlined} from '@ant-design/icons';

const {Header} = Layout;
const {Text} = Typography;
const { SubMenu } = Menu;

export default class PagesContainer extends PureComponent {
    render() {
        return (
            <div className="pages-container">
                <Header>
                <Space>
                <CodepenCircleOutlined style={{ fontSize: '20px', color: '#fff' }}/>
                <Text style={{fontSize: '20px', color:'#fff', fontFamily:'Vidaloka'}}>Group Project</Text>
                </Space>
                <Menu selectedKeys="home" mode="horizontal">
                <Menu.Item key="home" icon={<HomeOutlined />}>
                  Home
                </Menu.Item>
                <Menu.Item key="versions" icon={<MenuOutlined />}>
                  Versions
                </Menu.Item>
                <SubMenu key="create" title="Create" icon={<FileAddOutlined />}>
                <Menu.Item key="setting:1">Source code</Menu.Item>
                <Menu.Item key="setting:2">Version</Menu.Item>
                </SubMenu>
                </Menu>
                </Header>
            </div>
        )
    }
}