import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Layout, Menu } from 'antd';
const { Header, Sider, Content } = Layout;

const App = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider>
        <div className="logo">Logo</div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1" icon={<UserOutlined />}>
            Menu Item 1
          </Menu.Item>
          <Menu.Item key="2" icon={<LaptopOutlined />}>
            Menu Item 2
          </Menu.Item>
          <Menu.Item key="3" icon={<NotificationOutlined />}>
            Menu Item 3
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }}>Header</Header>
        <Content style={{ margin: '16px' }}>
          Content<Button>test</Button>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
