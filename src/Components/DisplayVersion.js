import React, {PureComponent} from 'react';
import {Divider,Typography, Layout,Row, Col, Tabs, Skeleton, Card, Comment, Tooltip, List} from 'antd';
import moment from 'moment';

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
  
  

const initialPanes = [
    { title: 'Source code', content: <Skeleton />, key: '1', closable: false, },
    { title: 'V1', content: 'Version', key: '2' },
  ];

export default class DisplayVersion extends PureComponent {
    newTabIndex = 0;
     state = {
    activeKey: initialPanes[0].key,
    panes: initialPanes,
    };

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
        const { panes, activeKey } = this.state;
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
                    {pane.content}</TabPane>))}
                </Tabs></Col>

                <Col span={6}><Card title="Version title" >
                    <p>Card content</p>
                    <p>Card content</p>
                    <p>Card content</p>
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