import { Menu } from 'antd';
import { observer } from 'mobx-react';

import { configStore } from '@/store/config';

import styles from './index.module.css';

export const MenuTree = observer(() => {
  if (!configStore.configTypeList?.length) {
    return null;
  }
  return (
    <Menu
      style={{
        border: 'none',
      }}
      className={styles.menu}
      mode="inline"
      selectedKeys={configStore.selectedKeys}
      items={configStore.configTypeList.map((group) => ({
        label: group.name,
        key: `${group.id}`,
        children: group.configs.map((config) => ({
          label: config.name,
          key: String(config.id),
        })),
      }))}
      defaultOpenKeys={configStore.defaultOpenKeys}
      onSelect={({ selectedKeys }) => {
        configStore.setSelectedKeys(selectedKeys);
      }}
    />
  );
});
