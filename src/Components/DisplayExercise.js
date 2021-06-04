import React, {PureComponent} from 'react';
import {Layout,Row, Col, Tabs, Dropdown, Menu, Button, Card, Comment, Tooltip, List,Typography} from 'antd';
import { PlusCircleOutlined, SaveOutlined } from '@ant-design/icons';
import moment from 'moment';
import axios from 'axios';

import Container from './Container';
import ButtonGroup from 'antd/lib/button/button-group';

const {Content} = Layout;

const { TabPane } = Tabs;

const { Text } = Typography;

// Hard-coded comments
const comments = [
  {
    //actions: [<span key="comment-list-reply-to-0">Reply to</span>],
    author: 'John Doe',
    avatar: 'https://mpng.subpng.com/20180523/tha/kisspng-businessperson-computer-icons-avatar-clip-art-lattice-5b0508dc6a3a10.0013931115270566044351.jpg',
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
    // hard-coded initial pane for source code
    const panes = [{title:'SOURCE CODE', content: [], key: '1', closable: false}];

    //console.log(props.match);

    this.state = {
      activeKey: panes[0].key,
      panes,
      cont: ["ciao"],
      dateString: "",
      exerciseInfo: props.match,
      versions: ["Hello", "ciao", "why"],
      };
  }

  componentDidMount() {
    console.log(this.state.exerciseInfo.params.title);
    axios.get(`http://localhost:5000/exercises/title/${this.state.exerciseInfo.params.title}`)
    .then(response => {
      this.setState({cont: response.data });
      // overriding first tab pane with code from database
      const first = [{title:'SOURCE CODE', content: <Container codice={this.state.cont.code}/>, closable:false, key: '1'}]
      this.setState({dateString: this.state.cont.date.substring(0,10)})
      this.setState({panes: first});

      axios.get(`http://localhost:5000/versions/exercise/${this.state.exerciseInfo.params.title}`)
      .then(response => {
        this.setState({versions: response.data});
      })
      .catch((error) => { console.log(error);})
    })
    .catch((error) => { console.log(error);})
  }

  // to add new tab pane given a selected version
  addPane = (ver) => {
    const { panes } = this.state;
    const titleVersion = ver.title;
    const activeKey = `newTab${this.newTabIndex++}`;

    console.log(ver);
    
    // FEDERICAAAAA --> If I insert "<Container/> here it pushes the body content (code) in the "source code" pane
    panes.push({ title: titleVersion, content: <Container codice={ver.code}/>, key: activeKey });
    this.setState({ panes, activeKey });
  }

  // to move between different tabs
  onChange = activeKey => {
    this.setState({ activeKey });
  };

  // to pass the remove method call
  onEdit = (targetKey, action) => {
    this[action](targetKey);
  };

  // to close  atab
  remove = targetKey => {
    let { activeKey } = this.state;
    let lastIndex;
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panes = this.state.panes.filter(pane => pane.key !== targetKey);
    if (panes.length && activeKey === targetKey) {
      if (lastIndex >= 0) {
        activeKey = panes[lastIndex].key;
      } else {
        activeKey = panes[0].key;
      }
    }
    this.setState({ panes, activeKey });
  };

  saveEdits = () => {
    console.log("saved");
  }

    render() {
        return(
            <div className="display-exercise">
                <Content style={{ padding: '0 50px', marginTop:55}}>
                <Row justify="space-around">

                <Col span={15}>
                  
                <Tabs hideAdd activeKey={this.state.activeKey} onChange={this.onChange} type="editable-card" onEdit={this.onEdit}>
                     {this.state.panes.map(pane => (<TabPane tab={pane.title} key={pane.key} closable={pane.closable}>{pane.content}</TabPane>))}
                    </Tabs></Col>
                  <ButtonGroup>
                  <Tooltip title="SAVE" color='#e1e2e2'>
                    <Button icon={<SaveOutlined />} onClick={this.saveEdits}></Button>
                    </Tooltip>
                    <Dropdown overlay={
                      <Menu>
                        {this.state.versions.map(ver => (<Menu.Item key={ver._id}><Button type="link" onClick={() => {this.addPane(ver)}}>{ver.title}</Button></Menu.Item>))}
                        </Menu>}><Tooltip title="VERSIONS" color='#e1e2e2' >
                        <Button icon={<PlusCircleOutlined />} /></Tooltip>
                      </Dropdown>
                      </ButtonGroup>

                <Col span={6}>
                  <Card title={this.state.cont.title} >
                    <p><i>{this.state.dateString}</i></p>
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