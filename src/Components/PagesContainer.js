import React, {PureComponent} from 'react';
import { Layout, Space, Typography, Menu } from 'antd';
import {CodepenCircleOutlined, HomeOutlined, MenuOutlined, FileAddOutlined} from '@ant-design/icons';
import {BrowserRouter as Router,  Link, Route} from "react-router-dom";

const {Header} = Layout;
const {Text} = Typography;
const { SubMenu } = Menu;

export default class PagesContainer extends PureComponent {
    render() {
        return (
            <div className="pages-container">
              <Router>
                <Header>
                <Space>
                <CodepenCircleOutlined style={{ fontSize: '20px', color: '#fff' }}/>
                <Text style={{fontSize: '20px', color:'#fff', fontFamily:'Vidaloka'}}>Group Project</Text>
                </Space>
                </Header>
                <Menu selectedKeys="home" mode="horizontal">
                <Menu.Item key="home" icon={<HomeOutlined />}>
                  <Link to="/">Home</Link>
                </Menu.Item>
                <Menu.Item key="versions" icon={<MenuOutlined />}>
                  Versions
                </Menu.Item>
                <SubMenu key="create" title="Create" icon={<FileAddOutlined />}>
                <Menu.Item key="setting:1"><Text style={{fontSize: '12px', textTransform: 'uppercase', textAlign: 'center'}}><Link to="/createx">Source code</Link></Text></Menu.Item>
                <Menu.Item key="setting:2"><Text style={{fontSize: '12px', textTransform: 'uppercase', textAlign: 'center'}}>Version</Text></Menu.Item>
                </SubMenu>
                </Menu>
                
                </Router>
            </div>
        )
    }
}