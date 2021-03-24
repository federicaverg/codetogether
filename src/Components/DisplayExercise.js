import React, {PureComponent} from 'react';
import {Divider,Typography, Layout,Row, Col, Tabs, Space} from 'antd';

const {Text} = Typography;
const {Content} = Layout;
const { TabPane } = Tabs;

const initialPanes = [
    { title: 'Source code', content: 'Source code of exercise', key: '1', closable: false, },
    { title: 'V1', content: 'Version', key: '2' },
  ];


export default class DisplayExercise extends PureComponent {
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
                <Divider orientation="left">
                <Text style={{fontSize: '16px', letterSpacing:'2px', textTransform: 'uppercase',color:'#969FB3'}}>Title</Text></Divider>

                <Row justify="space-around">
                <Col span={13}><Tabs
                type="editable-card"
                onChange={this.onChange}
                activeKey={activeKey}
                onEdit={this.onEdit}>
                {panes.map(pane => ( <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>
                    {pane.content}</TabPane>))}
                </Tabs></Col>
                <Col span={9}>col</Col>
                </Row>                       
                </Content>
            </div>
        )
    }
}