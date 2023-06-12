import { Layout } from 'antd';

import { fetcher } from './common/fetcher';
import { useMount } from './common/hook';
import { MenuTree } from './container/menu';
const { Header, Sider, Content } = Layout;

const App = () => {
  useMount(() => {
    fetcher.get('/cms/config/list').then((data) => {
      console.log('data :>> ', data);
    });
  });

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
