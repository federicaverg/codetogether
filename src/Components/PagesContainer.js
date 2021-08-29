import React, {PureComponent} from 'react';
import { Layout, Space, Typography, Menu } from 'antd';
import {HomeOutlined, MenuOutlined, FileAddOutlined, CodeSandboxOutlined} from '@ant-design/icons';
import {BrowserRouter as Router,  Link, Route} from "react-router-dom";

import Homepage from "./Homepage";
import VersionMenu from "./VersionMenu";
import CreateSourceCode from "./CreateSourceCode";
import CreateVersion from "./CreateVersion";
import DisplayExercise from "./DisplayExercise";
import EditingPage from "./EditingPage";

const {Header} = Layout;
const {Text} = Typography;
const { SubMenu } = Menu;

export default class PagesContainer extends PureComponent {
    render() {
        return (
            <div className="pages-container">
              <Router>
                <Header style={{minWidth:820}} >
                <Space>
                <CodeSandboxOutlined  style={{ fontSize: '20px', color: '#fff', paddingLeft:'17px' }}/>
                <Text style={{fontSize: '20px', color:'#fff', fontFamily:'Assistant', textTransform:'uppercase', letterSpacing:'3px'}}>CODE TOGETHER</Text>
                </Space>
                </Header>
                <Menu mode="horizontal">
                <Menu.Item key="home" icon={<HomeOutlined />} >
                  <Link to="/">Home</Link>
                </Menu.Item>
                <Menu.Item key="versions" icon={<MenuOutlined />} >
                <Link to="/versions">Versions</Link>
                </Menu.Item>
                <SubMenu key="create" title="Create" icon={<FileAddOutlined />}>
                <Menu.Item key="setting:1"><Text style={{fontSize: '12px', textTransform: 'uppercase', textAlign: 'center', letterSpacing:'2px'}}><Link to="/create/source-code">Source Code</Link></Text></Menu.Item>
                <Menu.Item key="setting:2"><Text style={{fontSize: '12px', textTransform: 'uppercase', textAlign: 'center', letterSpacing:'2px'}}><Link to="/create/version">Version</Link></Text></Menu.Item>
                </SubMenu>
                </Menu>

                <Route  path='/' exact component={Homepage} />
                <Route  path='/versions' exact component={VersionMenu} />
                <Route  path='/create/source-code' exact component={CreateSourceCode} />
                <Route  path='/create/version' exact component={CreateVersion} />
                <Route  path='/display/exercise' exact component={DisplayExercise} />
                <Route  path='/display/exercise/:title' exact component={DisplayExercise} />
                <Route  path='/edit/:title' exact component={EditingPage} />
                <Route  path='/edit' exact component={EditingPage} />
                </Router>
            </div>
        )
    }
}