import { SaveOutlined, SettingOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import styles from './index.module.css';

export const AppHeader = () => {
  return (
    <header className={styles.header}>
      <div className={styles.title}>My App</div>
      <div className={styles.actionBar}>
        <Button type="primary" icon={<SaveOutlined />}>
          保存
        </Button>
        <Button icon={<SettingOutlined />}>设置</Button>
      </div>
    </header>
  );
};
