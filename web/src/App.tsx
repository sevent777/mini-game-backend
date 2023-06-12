import { Layout } from 'antd';

import { useMount } from './common/hook';
import { MenuTree } from './container/menu';
import { configStore } from './store/config';
const { Header, Sider, Content } = Layout;

const App = () => {
  useMount(() => {
    console.log('useMount :>> ');
    configStore.fetchConfigList();
  });

  return (
    <Layout style={{ minHeight: '100vh' }} hasSider>
      <Sider>
        <div className="logo">Logo</div>
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
