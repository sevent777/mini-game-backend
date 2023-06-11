import { Layout } from 'antd';

import { MenuTree } from './container/menu';
const { Header, Sider, Content } = Layout;

const App = () => {
  return (
    <Layout style={{ minHeight: '100vh' }} hasSider>
      <Sider>
        <div className="logo">Logo</div>
        <MenuTree></MenuTree>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }}>Header</Header>
        <Content style={{ margin: '16px' }}>Content</Content>
      </Layout>
    </Layout>
  );
};

export default App;
