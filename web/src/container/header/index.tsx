import { SaveOutlined, SettingOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { observer } from 'mobx-react';

import { configStore } from '@/store/config';

import styles from './index.module.css';

export const AppHeader = observer(() => {
  return (
    <header className={styles.header}>
      <div className={styles.title}>{configStore.activeConfig.name}</div>
      <div className={styles.actionBar}>
        <Button
          type="primary"
          icon={<SaveOutlined />}
          onClick={() => {
            configStore.saveTempValue();
          }}
        >
          保存
        </Button>
        <Button icon={<SettingOutlined />}>设置</Button>
      </div>
    </header>
  );
});
