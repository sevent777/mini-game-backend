import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Menu } from 'antd';

export const MenuTree = () => {
  return (
    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
      <Menu.Item key="1" icon={<UserOutlined />}>
        Menu Item 1
      </Menu.Item>
      <Menu.Item key="2" icon={<LaptopOutlined />}>
        Menu Item 2
      </Menu.Item>
      <Menu.Item key="3" icon={<NotificationOutlined />}>
        Menu Item 3
      </Menu.Item>
    </Menu>
  );
};
