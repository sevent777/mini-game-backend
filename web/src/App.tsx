import { HddTwoTone } from '@ant-design/icons';
import { Layout, Space, Typography } from 'antd';

import { useMount } from './common/hook';
import { AppContent } from './container/content';
import { MenuTree } from './container/menu';
import { ModalContainer } from './container/modal';
import styles from './index.module.css';
import { configStore } from './store/config';
const { Sider } = Layout;

const App = () => {
  useMount(() => {
    configStore.fetchConfigList();
  });

  return (
    <Layout style={{ minHeight: '100vh' }} hasSider>
      <Sider theme="light" className={styles.sider} width={240}>
        <Space className={styles.menuTop} align="center">
          <HddTwoTone />
          <Typography.Title level={4} className={styles.title} style={{ display: 'block' }}>
            Jax 2.0
          </Typography.Title>
        </Space>
        <MenuTree />
      </Sider>
      <AppContent />
      <ModalContainer />
    </Layout>
  );
};

export default App;
