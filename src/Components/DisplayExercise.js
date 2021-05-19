import React, {PureComponent} from 'react';
import {Typography, Layout,Row, Col, Tabs, Skeleton, Card, Comment, Tooltip, List} from 'antd';
import moment from 'moment';
import axios from 'axios';

import Container from './Container';

const {Text} = Typography;
const {Content} = Layout;

const { TabPane } = Tabs;

const data = [
    {
      actions: [<span key="comment-list-reply-to-0">Reply to</span>],
      author: 'Han Solo',
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      content: (
        <p>
          We supply a series of design principles, practical patterns and high quality design
          resources (Sketch and Axure), to help people create their product prototypes beautifully and
          efficiently.
        </p>
      ),
      datetime: (
        <Tooltip title={moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss')}>
          <span>{moment().subtract(1, 'days').fromNow()}</span>
        </Tooltip>
      ),
    },
    {
      actions: [<span key="comment-list-reply-to-0">Reply to</span>],
      author: 'Han Solo',
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      content: (
        <p>
          We supply a series of design principles, practical patterns and high quality design
          resources (Sketch and Axure), to help people create their product prototypes beautifully and
          efficiently.
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
  

const initialPanes = [
    { title: 'Source code', content: "", key: '1', closable: false, },
    //{ title: 'V1', content: 'Version', key: '2' },
  ];

export default class DisplayExercise extends PureComponent {
  

  constructor(props){
    super(props);

    

    this.state = {
      activeKey: initialPanes[0].key,
      panes: initialPanes,
      cont: initialPanes[0].content,
      prova: props.match
      };

    
    console.log(this.state.prova);
  }
  newTabIndex = 0;
  

  // componentDidMount() {
  //   axios.get(`http://localhost:5000/exercises/6089303edca19abd5e2e8cc0`)
  //   .then(response => {
  //     console.log(response.data)
  //     this.setState({cont: response.data.code })
  //     console.log(this.state.cont)
  //   })
  //   .catch((error) => { console.log(error);})

  // }

  // ID = 6089303edca19abd5e2e8cc0

  async componentDidMount() {
    console.log("HELLO");
    console.log(this.state.cont);
    try {
      console.log(this.state.prova.params.id);
      const response = await axios.get(`http://localhost:5000/exercises/title/${this.state.prova.params.id}`);
      console.log(response);
      this.setState({cont: response.data })
      console.log(this.state.cont)
    } catch (error) {
      console.error(error);
    }
  }

    onChange = activeKey => {
        this.setState({ activeKey });
    };

    onEdit = (targetKey, action) => {
        this[action](targetKey);
    };

    add = () => {
        const { panes } = this.state;
        const activeKey = `newTab${this.newTabIndex++}`;
        const newPanes = [...panes];
        newPanes.push({ title: 'New Tab', content: 'Content of new Tab', key: activeKey });
        this.setState({
        panes: newPanes,
        activeKey,
        });
    };

    remove = targetKey => {
        const { panes, activeKey } = this.state;
        let newActiveKey = activeKey;
        let lastIndex;
        panes.forEach((pane, i) => {
        if (pane.key === targetKey) {
            lastIndex = i - 1;
        }
        });
        const newPanes = panes.filter(pane => pane.key !== targetKey);
        if (newPanes.length && newActiveKey === targetKey) {
        if (lastIndex >= 0) {
            newActiveKey = newPanes[lastIndex].key;
        } else {
            newActiveKey = newPanes[0].key;
        }
        }
        this.setState({
        panes: newPanes,
        activeKey: newActiveKey,
        });
    };

    render() {
        const { panes, activeKey, cont } = this.state;
        return(
            <div className="display-exercise">
                <Content style={{ padding: '0 50px', marginTop:55}}>

                <Row justify="space-around">

                <Col span={15}><Tabs
                type="editable-card"
                onChange={this.onChange}
                activeKey={activeKey}
                onEdit={this.onEdit}>
                {panes.map(pane => ( <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>
                    <Container codice={"this.state.cont"}/></TabPane>))}
                </Tabs></Col>

                <Col span={6}><Card title={this.state.cont.title} >
                    <p><i>this.state.cont.</i></p>
                    <p>{this.state.cont.description}</p>
                    </Card>

                    <List
                    className="comment-list"
                    header={`${data.length} replies`}
                    itemLayout="horizontal"
                    dataSource={data}
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