import React, {useState} from 'react'
import { Layout, Menu } from 'antd';
import {
  DatabaseOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  BellTwoTone,
  UserOutlined 
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import  logo from '../../assets/images/logo.f0355d39.svg'

const { Header, Content, Sider } = Layout;

export default function LayoutAdmin({children, match}) {

  const [collapsed, setCollapsed] = useState(false)
  const toggle = () => {
    setCollapsed(!collapsed)
  };

  return (
    <Layout>
    <Sider
    style={{
      height: "949px"
    }}
      trigger={null} collapsible collapsed={collapsed}
    >
      <div className="logo"><img style={{width: `${collapsed ? '63%' : '27%'}`, 
      height: "25px", margin: `${collapsed ? "13px -6px 15px 16px" : "18px -8px 21px 4px"}`}} src={logo}/>
        <span style={{color: "#fff", fontFamily: "system-ui", fontWeight: "bold"}}>
          {collapsed ? '' : 'SUPER-REPORT'}
        </span>
      </div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={[match.match.path==="/admin/tkb" ? "1" : match.match.path==="/admin/kltn" ? "2" : match.match.path==="/admin/lecturer" ? "3" : match.match.path==="/admin/student" ? "4" : "5"]}>
        <Menu.Item key="1" icon={<DatabaseOutlined />}>
          <Link to="/admin/tkb">Data tkb</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<DatabaseOutlined />}>
          <Link to="/admin/kltn">Data kltn</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<DatabaseOutlined />}>
          <Link to="/admin/lecturer">Data lecturer</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<DatabaseOutlined />}>
          <Link to="/admin/student">Data student</Link>
        </Menu.Item>
        <Menu.Item key="5" icon={<DatabaseOutlined />}>
          <Link to="/admin/report">Report</Link>
        </Menu.Item>
      </Menu>
      <span onClick={toggle} style={{color: "#fff", float: "right", margin: "30px"}}>{
        collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>
      }</span>
    </Sider>
    <Layout className="site-layout">
    <Header className="site-layout-background" style={{ padding: 0, background: "#fff",
    height: "48px", lineHeight: "48px" }} >
      <div style={{float: "right"}} className="header-report">
         <span className="bell">
            <BellTwoTone />
         </span>
         <span className="user">
         <UserOutlined />
         </span>
      </div>
    </Header>
      
      <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
        <div className="site-layout-background" style={{ padding: 30, textAlign: 'center', background: "#fff", boxShadow: "0px 15px 13px -15px #b1b1b1"}}>
        {
          children
        }
        </div>
      </Content>
    </Layout>
  </Layout>
  )
}
