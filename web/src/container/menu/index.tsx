import { DeleteOutlined, SisternodeOutlined } from '@ant-design/icons';
import { Menu, Modal, Space } from 'antd';
import { observer } from 'mobx-react';

import { configStore } from '@/store/config';
import { modal, ModalKey } from '@/store/modal';

import styles from './index.module.css';

export const MenuTree = observer(() => {
  if (!configStore.configTypeList?.length) {
    return null;
  }

  const showAddNewConfigModal = async (configTypeId: number) => {
    const values = (await modal.open(ModalKey.addNewConfig)) as object;
    configStore.addNewConfig({
      ...values,
      configTypeId,
    });
  };

  const onClickDelete = async (configID: number) => {
    Modal.confirm({
      title: 'Are you sure?',
      content: 'config will be deleted. This action cannot be undone.',
      okText: 'Delete',
      okType: 'danger',
      onOk: () => {
        configStore.deleteConfig(configID);
      },
    });
  };

  return (
    <Menu
      style={{
        border: 'none',
      }}
      className={styles.menu}
      mode="inline"
      selectedKeys={configStore.selectedKeys}
      items={configStore.configTypeList.map((group) => ({
        label: (
          <Space className={styles.title}>
            {group.name}
            <SisternodeOutlined
              onClick={(e) => {
                e.stopPropagation();
                showAddNewConfigModal(group.id);
              }}
            />
          </Space>
        ),
        key: `${group.id}`,
        children: group.configs.map((config) => ({
          label: (
            <div className={styles.menuItem}>
              <div className={styles.title}>{config.name}</div>
              {configStore.activeConfig?.id === config.id && (
                <DeleteOutlined onClick={() => onClickDelete(config.id)} />
              )}
            </div>
          ),
          title: config.name,
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
