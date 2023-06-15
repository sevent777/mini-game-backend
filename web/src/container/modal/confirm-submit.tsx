import { Form, Input } from 'antd';

import { modal } from '@/store/modal';

import { BaseFormModal } from './form';

export class AddNewConfigModal extends BaseFormModal {
  renderContent() {
    return (
      <>
        <Form.Item label="配置名" required name={'name'} rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </>
    );
  }
  onFinish(values: unknown): void | Promise<void> {
    modal.close(values);
  }
}
