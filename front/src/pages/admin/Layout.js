import React, {useState} from 'react'
import { Layout, Menu, Dropdown } from 'antd';
import Cookies from "js-cookie";
import {
  DatabaseOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  BellTwoTone,
  UserOutlined 
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import  logo from '../../assets/images/logo.f0355d39.svg'
import { useHistory } from "react-router-dom";

const { Header, Content, Sider } = Layout;

export default function LayoutAdmin({children, match}) {
  const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null

  const history = useHistory()
  const [collapsed, setCollapsed] = useState(false)
  const toggle = () => {
    setCollapsed(!collapsed)
  };

  const logout = () => {
    Cookies.remove("user");
    history.push('/')
  }

  const menu = (
    <Menu>
      <Menu.Item key="7">Profile</Menu.Item>
      <Menu.Item key="8" onClick={() => logout()}>Logout</Menu.Item>
    </Menu>
  );

  return (
    <Layout>
    <Sider
    style={{
      height: "949px"
    }}
      trigger={null} collapsible collapsed={collapsed}
    >
      <div className="logo"><img style={{width: `${collapsed ? '63%' : '40%'}`, 
      height: "60px", margin: `${collapsed ? "13px -6px 15px 16px" : "18px -8px 21px 4px"}`}} src={logo}/>
        <span style={{color: "#6c757d", fontFamily: "system-ui", fontWeight: "bold", fontSize: "24px"}}>
          {collapsed ? '' : 'SUPER-REPORT'}
        </span>
      </div>
      <Menu mode="inline" defaultSelectedKeys={[
        match.match.path==="/admin/lecturer" ? "1" :
        match.match.path==="/admin/student" ? "2" : 
        match.match.path==="/admin/quota" ? "3" : 
        match.match.path==="/admin/tkb" ? "4" :  
        match.match.path==="/admin/kltn" ? "5" : 
        match.match.path==="/admin/datn" ? "6" :
        match.match.path==="/admin/lvts" ? "7" :
        match.match.path==="/admin/lats" ? "8" :
        match.match.path==="/admin/cvht" ? "9" :
        match.match.path==="/admin/tttd" ? "10" : "11" ]}>
        {
          (user?.roles === 'ADMIN' || user?.roles === 'ADMIN1') 
          && 
          <Menu.Item key="1" icon={<DatabaseOutlined />}>
          <Link to="/admin/lecturer">Quản lý danh sách giảng viên</Link>
        </Menu.Item>
        }
        {
          (user?.roles === 'ADMIN') 
          && 
          <>
            <Menu.Item key="2" icon={<DatabaseOutlined />}>
              <Link to="/admin/student">Quản lý danh sách sinh viên</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<DatabaseOutlined />}>
              <Link to="/admin/quota">Quản lý danh sách định mức</Link>
            </Menu.Item>
          </>
        }
        {
          (user?.roles === 'ADMIN' || user?.roles === 'ADMIN1') 
          && 
            <Menu.Item key="4" icon={<DatabaseOutlined />}>
            <Link to="/admin/tkb">Quản lý thời khóa biểu</Link>
            </Menu.Item>
        }
         {
          (user?.roles === 'ADMIN') 
          && 
         <>
          <Menu.Item key="5" icon={<DatabaseOutlined />}>
            <Link to="/admin/kltn">Quản lý danh sách khóa luận tốt nghiệp</Link>
          </Menu.Item>
           <Menu.Item key="6" icon={<DatabaseOutlined />}>
            <Link to="/admin/datn">Quản lý danh sách đồ án tốt nghiệp</Link>
          </Menu.Item>
          <Menu.Item key="7" icon={<DatabaseOutlined />}>
            <Link to="/admin/lvts">Quản lý danh sách luận văn thạc sỹ</Link>
          </Menu.Item>
          <Menu.Item key="8" icon={<DatabaseOutlined />}>
            <Link to="/admin/lats">Quản lý danh sách luận án tiến sĩ</Link>
          </Menu.Item>
          <Menu.Item key="9" icon={<DatabaseOutlined />}>
            <Link to="/admin/cvht">Quản lý danh sách cố vấn học tập</Link>
          </Menu.Item>
          <Menu.Item key="10" icon={<DatabaseOutlined />}>
            <Link to="/admin/tttd">Quản lý danh sách thực tập thực địa</Link>
          </Menu.Item>
         </>
        }
        <Menu.Item key="11" icon={<DatabaseOutlined />}>
          <Link to="/report">Báo cáo thống kê</Link>
        </Menu.Item>
      </Menu>
      <span onClick={toggle} style={{color: "#222b45", float: "right", margin: "30px", fontSize: '24px'}}>{
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
         <Dropdown overlay={menu}>
          <UserOutlined />
        </Dropdown>
         </span>
      </div>
    </Header>
      
      <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
        <div className="site-layout-background" style={{ padding: 30, textAlign: 'center', background: "#fff", boxShadow: "0px 15px 13px -15px #b1b1b1", borderRadius: '10px'}}>
        {
          children
        }
        </div>
      </Content>
    </Layout>
  </Layout>
  )
}
