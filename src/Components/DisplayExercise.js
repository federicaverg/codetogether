import React, {PureComponent} from 'react';
import {Typography, Layout,Row, Col, Tabs, Dropdown, Menu, Button, Card, Comment, Tooltip, List} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {BrowserRouter as Router,  Link, Route} from "react-router-dom";
import moment from 'moment';
import axios from 'axios';

import Container from './Container';

const {Text} = Typography;
const {Content} = Layout;

const { TabPane } = Tabs;

// Hard-coded comments
const comments = [
  {
    //actions: [<span key="comment-list-reply-to-0">Reply to</span>],
    author: 'John Doe',
    avatar: 'https://png2.cleanpng.com/sh/5fe1cfc4233cbd91920b61031ec6e683/L0KzQYm3WcIxN6pngJH0aYP2gLBuTfNwdaF6jNd7LXnmf7B6TgBweqVmet5uLX7ohMj2kvsub6NmiNpyY4OwccfolPFzNZpoRadrYUPmRofsU8A3amI6RqICNUa1R4KAUcU0P2U6Uao7MkG8SIS1kP5o/kisspng-computer-icons-portable-network-graphics-avatar-ic-5ba3c66e306b15.0756271715374598221983.png',
    content: (
      <p>
        I think that the loop should be increased with a counter declared inside of the second method.
      </p>
    ),
    datetime: (
      <Tooltip title={moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss')}>
        <span>{moment().subtract(1, 'days').fromNow()}</span>
      </Tooltip>
    ),
  },
  {
    //actions: [<span key="comment-list-reply-to-0">Reply to</span>],
    author: 'Jane Doe',
    avatar: 'https://cdn.iconscout.com/icon/premium/png-512-thumb/female-avatar-12-774634.png',
    content: (
      <p>
        Why do we need to put the 'this' declaration in this case?
      </p>
    ),
    datetime: (
      <Tooltip title={moment().subtract(2, 'days').format('YYYY-MM-DD HH:mm:ss')}>
        <span>{moment().subtract(2, 'days').fromNow()}</span>
      </Tooltip>
    ),
  },
];  

const exercise = [];

export default class DisplayExercise extends PureComponent {
  
  constructor(props){
    super(props);
    this.newTabIndex = 0;

    const panes = [{title:'SOURCE CODE', content: ["giorgio è bll"], key: '1'}];

    this.state = {
      activeKey: panes[0].key,
      panes,
      cont: ["ciao"],
      prova: props.match,
      versions: ["VersioneProva"]
      };

    console.log(this.state.prova);
  }

  componentDidMount() {
    axios.get(`http://localhost:5000/exercises/title/${this.state.prova.params.id}`)
    .then(response => {
      console.log(response)
      this.setState({cont: response.data.code })
      console.log(this.state.cont)
    })
    .catch((error) => { console.log(error);})
  }

  addPane = (ver) => {
    const { panes } = this.state;
    const titleVersion = ver;
    const activeKey = `newTab${this.newTabIndex++}`;
    panes.push({ title: titleVersion, content: 'New Tab Pane', key: activeKey });
    this.setState({ panes, activeKey });
  }

  // to move between different tabs
  onChange = activeKey => {
    this.setState({ activeKey });
  };


    render() {
        return(
            <div className="display-exercise">
                <Content style={{ padding: '0 50px', marginTop:55}}>
                <Row justify="space-around">

                <Col span={15}>
                  
                <Tabs activeKey={this.state.activeKey} onChange={this.onChange}>
                     {this.state.panes.map(pane => (<TabPane tab={pane.title} key={pane.key}>{pane.content}</TabPane>))}
                    </Tabs></Col>

                    <Dropdown overlay={
                      <Menu>
                        {this.state.versions.map(ver => (<Menu.Item key={ver._id}><Button type="link" onClick={() => {this.addPane(ver)}}>{ver}</Button></Menu.Item>))}
                        </Menu>}>
                        <Button icon={<PlusOutlined />}/>
                      </Dropdown>

                <Col span={6}><Card title={this.state.cont.title} >
                    <p><i>{this.state.cont.date}</i></p>
                    <p>{this.state.cont.description}</p>
                    </Card>

                    <List
                    className="comment-list"
                    header={`${comments.length} replies`}
                    itemLayout="horizontal"
                    dataSource={comments}
                    renderItem={item => (
                    <li>
                        <Comment
                        actions={item.actions}
                        author={item.author}
                        avatar={item.avatar}
                        content={item.content}
                        datetime={item.datetime}
                        />
                    </li>
                    )}
                />

                </Col>

                </Row>                       
                </Content>
            </div>
        )
    }
}