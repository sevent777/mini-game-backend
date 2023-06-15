import { observer } from 'mobx-react';
import React from 'react';

import { modal, ModalKey } from '@/store/modal';

import { AddNewConfigModal } from './confirm-submit';

@observer
export class ModalContainer extends React.Component {
  config: Record<ModalKey, React.ComponentType> = {
    [ModalKey.addNewConfig]: AddNewConfigModal,
  };

  public render() {
    if (!modal.ids?.length) return null;
    return <>{modal.ids.map((id) => React.createElement(this.config[id] || null, { key: id }))}</>;
  }
}
