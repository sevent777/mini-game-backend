import { Layout } from 'antd';

import { JsonEditor } from '@/component/json-editor';
const { Content } = Layout;

export const AppContent = () => {
  return (
    <Content>
      <JsonEditor value='{"a": 1}' />
    </Content>
  );
};
