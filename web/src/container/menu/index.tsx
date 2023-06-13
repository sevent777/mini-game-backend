import { Menu } from 'antd';
import { observer } from 'mobx-react';

import { configStore } from '@/store/config';

export const MenuTree = observer(() => {
  return (
    <Menu
      theme="dark"
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
