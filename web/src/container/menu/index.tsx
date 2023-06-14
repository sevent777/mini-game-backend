import { Menu } from 'antd';
import { observer } from 'mobx-react';

import { configStore } from '@/store/config';

import styles from './index.module.css';

export const MenuTree = observer(() => {
  return (
    <Menu
      style={{
        border: 'none',
      }}
      className={styles.menu}
      mode="inline"
      items={configStore.configTypeList.map((group) => ({
        label: group.name,
        key: `${group.path}_${group.name}`,
        children: group.configs.map((config) => ({
          label: config.name,
          key: config.name,
        })),
      }))}
    />
  );
});
