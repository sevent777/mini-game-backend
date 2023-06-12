import { Menu } from 'antd';
import { observer } from 'mobx-react';

import { configStore } from '@/store/config';

export const MenuTree = observer(() => {
  console.log('configStore.configList :>> ', configStore.configList);
  return (
    <Menu
      items={configStore.configList.map((config) => ({
        label: config.name,
        key: `${config.type}_${config.name}`,
      }))}
    />
  );
});
