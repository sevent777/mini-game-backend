import { action, observable } from 'mobx';

import { fetchConfigList } from '@/common/api';
import { IConfigurationType } from '@/types/api';

export class ConfigStore {
  @observable configTypeList: IConfigurationType[] = [];

  @action.bound
  setConfigList(list: IConfigurationType[]) {
    this.configTypeList = list;
  }

  fetchConfigList() {
    fetchConfigList().then(({ list }) => {
      this.setConfigList(list);
      setTimeout(() => {
        this.setConfigList(list);
      }, 2000);
    });
  }
}

export const configStore = new ConfigStore();
