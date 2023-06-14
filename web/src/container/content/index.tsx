import { Empty, Layout } from 'antd';
import { observer } from 'mobx-react';

import { JsonEditor } from '@/component/json-editor';
import { configStore } from '@/store/config';

import { AppHeader } from '../header';
const { Content } = Layout;

export const AppContent = observer(() => {
  if (!configStore.activeConfig) {
    return <Empty style={{ padding: 100, width: '100%' }} />;
  }

  return (
    <Layout key={configStore.activeConfig.id}>
      <AppHeader />
      <Content>
        <JsonEditor
          initialValue={configStore.tempValue}
          onChange={(value) => {
            configStore.setTempValue(value);
          }}
          onSave={() => configStore.saveTempValue()}
        />
      </Content>
    </Layout>
  );
});
