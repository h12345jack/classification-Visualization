import React from 'react';
import { Layout, Menu, Icon, Row, Col, Button } from 'antd';
const { Header, Sider, Content, Footer } = Layout;
import MdAccountBalance from 'react-icons/lib/md/account-balance'
import {getClassName } from '../utils/util'
import Tree from '../component/Tree'

import "./layout.css"

export default class LayoutDemo extends React.Component {
  state = {
    collapsed: false,
    classfication: 'lcc'
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  handleMenuClick = (e)=>{
    this.setState({
      classfication: e.key
    })
  }

  render() {
    console.log(this.state.classfication, 'render father');
    return (
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <Row style={{height:64,padding:16}}>
            <Col span={3}>
            <MdAccountBalance size={30} className="logo" style={{marginRight:16}}/>
            </Col>
            <Col>{!this.state.collapsed &&
              
              <span className="logo-title" style={{color:'#fffcff',marginLeft: 10,fontSize:15}}>分类体系可视化</span>

            }
            </Col>
            
          </Row>
          <Menu theme="dark" mode="vertical" defaultSelectedKeys={['1']} onClick={(e)=>this.handleMenuClick(e)}>
            <Menu.Item key="lcc">
              <Icon type="database" />
              <span className="nav-text">LCC(美国国会图书分类法)</span>
            </Menu.Item>
            <Menu.Item key="ztf">
              <Icon type="database" />
              <span className="nav-text">中图法(中国图书分类法)</span>
            </Menu.Item>
            <Menu.Item key="zhihu">
              <Icon type="team" />
              <span className="nav-text">知乎话题</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Row>
            <Col span={1}>
              <Icon
                className="trigger"
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />
            </Col>
            <Col>
              <h2>{getClassName(this.state.classfication)}</h2>
            </Col>
            </Row>
          </Header>
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
            <Row>
            <Col span={22}>
              
              <Tree
                ref="tree"
                classfication = {this.state.classfication}
                />

             </Col>
             <Col span={1}>
             <div className="reset-button">
               <Menu  mode="vertical">
                <Menu.Item key="1" >
                <Button className="nav-text" style={{width:"100px"}} onClick={()=> this.refs.tree.initTree()}>还原前两层</Button>
                </Menu.Item>
                <Menu.Item key="2" >
                <Button className="nav-text" style={{width:"100px"}} onClick={()=> this.refs.tree.resetRoot()}>中心复原</Button>
                </Menu.Item>
               </Menu>
              </div>
             </Col>
             </Row>
          </Content>
          <Footer  style={{ textAlign: 'center' }}> 
          <span>数据收集、整理与可视化来自于IM13黄俊杰</span>
          <br/>
          <span>收集时间为2017年4月</span>
          </Footer>

        </Layout>
      </Layout>
    );
  }
}

