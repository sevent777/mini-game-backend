import { ButtonProps, Form, Modal, Space, Spin } from 'antd';
import { FormInstance, Rule, RuleObject } from 'antd/lib/form';
import { observer } from 'mobx-react';
import React from 'react';

import { modal } from '@/store/modal';

interface IFormRuleParams {
  required?: boolean;
  max?: number;
  message?: string;
  whitespace?: boolean;
  validator?: RuleObject['validator'];
}

@observer
export class BaseFormModal<V = unknown, P = unknown, S = unknown> extends React.Component<P, S> {
  name = '';
  formRef = React.createRef<FormInstance<V>>();
  submitEventDataTracking = '';

  constructor(props: P) {
    super(props);

    this.onFinish = this.onFinish.bind(this);
    this.onFinishFailed = this.onFinishFailed.bind(this);
  }

  public onFinish(value: V): Promise<void> | void {
    console.log('onFinish :>> ', value);
  }

  public onFinishFailed<T>(errorInfos: T) {
    console.warn('Form onFinishFailed:', errorInfos);
  }

  get confirmLoading() {
    return false;
  }

  get loading() {
    return false;
  }

  public getTitleIcon(): React.ReactNode {
    return null;
  }

  public getTitleText() {
    return this.name;
  }
  public getTitle(): React.ReactNode {
    return (
      <Space>
        {this.getTitleIcon()}
        {this.getTitleText()}
      </Space>
    );
  }

  public getCancelText() {
    return 'Cancel';
  }

  public getOkText() {
    return this.name;
  }

  public getOkButtonProps(): ButtonProps {
    return {};
  }

  public getRules(params: IFormRuleParams = {}): Rule[] {
    const rules: Rule[] = [];
    const { required, max, whitespace, validator, message = 'Required!' } = params;

    if (typeof required === 'boolean') {
      rules.push({ required, message });
    }
    if (whitespace) {
      rules.push({ whitespace, message });
    }
    if (max > 0) {
      rules.push({ max, message: `Only allow maximum ${max} characters` });
    }
    if (typeof validator === 'function') {
      rules.push({ validator });
    }

    return rules;
  }

  public async beforeClose() {
    return;
  }

  public close = async () => {
    await this.beforeClose();
    modal.closeAndReject();
  };

  public onOk = () => {
    this.formRef.current?.submit();
  };

  public renderContent(): React.ReactNode {
    return null;
  }

  public renderForm() {
    return (
      <Form
        labelAlign="left"
        onFinish={this.onFinish}
        onFinishFailed={this.onFinishFailed}
        ref={this.formRef}
        layout="vertical"
      >
        {this.renderContent()}
      </Form>
    );
  }

  get noEdit() {
    return false;
  }

  public renderModal() {
    return (
      <Modal
        title={this.getTitle()}
        open={true}
        onCancel={this.close}
        width={600}
        okButtonProps={{
          style: { display: this.noEdit ? 'none' : undefined },
          ...this.getOkButtonProps(),
        }}
        cancelText={this.getCancelText()}
        okText={this.getOkText()}
        onOk={this.onOk}
        maskClosable={false}
        confirmLoading={this.confirmLoading}
      >
        <Spin spinning={this.loading}>{this.renderForm()}</Spin>
      </Modal>
    );
  }

  public render() {
    return this.renderModal();
  }
}
