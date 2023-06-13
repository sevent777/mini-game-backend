import { Layout, Typography } from 'antd';

import { useMount } from './common/hook';
import { MenuTree } from './container/menu';
import { configStore } from './store/config';
const { Header, Sider, Content } = Layout;

const App = () => {
  useMount(() => {
    configStore.fetchConfigList();
  });

  return (
    <Layout style={{ minHeight: '100vh' }} hasSider>
      <Sider>
        <Typography.Title
          level={2}
          style={{
            padding: '0 16px',
            color: '#fff',
          }}
        >
          Jax 2.0
        </Typography.Title>
        <MenuTree />
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }}>Header</Header>
        <Content style={{ margin: '16px' }}>Content</Content>
      </Layout>
    </Layout>
  );
};

export default App;
