import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import { withRouter } from 'react-router-dom'

import logo from './logo.png'
import './frame.less'
const { Header, Content, Sider } = Layout;

@withRouter

class Frame extends Component {
    onMenusClick = ({key})=>{
        console.log(key)
        this.props.history.push(key)
    }
    render() {
        return (
            <Layout>
    <Header className="header" style={{backgroundColor:"#F5F5F5"}}>
      <div className="FW-logo">
        <img src={logo} alt="fezulin" />
    </div>
          </Header>
    <Layout>
      <Sider width={200} className="site-layout-background">
        <Menu
          mode="inline"
          selectedKeys={[this.props.location.pathname]}
          onClick={this.onMenusClick}
          style={{ height: '100%', borderRight: 0 }}
        >
          {
              this.props.menus.map((route) =>{
                      return(
                        <Menu.Item key={route.pathname}>{route.title}</Menu.Item>  
                  )
              })
          } 
        </Menu>
      </Sider>
      <Layout style={{ padding: '16px' }}>
        
        <Content
          className="site-layout-background"
          style={{
            // padding: 24,
            margin: 0,
            minHeight: 760,
            backgroundColor: '#fff'
          }}
        >
          {this.props.children}
        </Content>
      </Layout>
    </Layout>
  </Layout>
        )
    }
}

export default Frame