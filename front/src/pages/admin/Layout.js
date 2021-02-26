import React from 'react'
import { Layout, Menu } from 'antd';
import {
  DatabaseOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Content, Sider } = Layout;

export default function LayoutAdmin({children, match}) {

  return (
    <Layout>
    <Sider
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
      }}
    >
      <div className="logo" />
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
    </Sider>
    <Layout className="site-layout" style={{ marginLeft: 200 }}>
      <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
        <div className="site-layout-background" style={{ padding: 24, textAlign: 'center' }}>
        {
          children
        }
        </div>
      </Content>
    </Layout>
  </Layout>
  )
}
