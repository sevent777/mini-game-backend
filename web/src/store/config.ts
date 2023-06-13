import { action, observable } from 'mobx';

import { fetchConfigList } from '@/common/api';
import { IConfiguration } from '@/types/api';

export class ConfigStore {
  @observable configList: IConfiguration[] = [];

  @action.bound
  setConfigList(list: IConfiguration[]) {
    this.configList = list;
  }

  fetchConfigList() {
    fetchConfigList().then(({ list }) => {
      console.log('list :>> ', list);
      this.setConfigList(list);
      setTimeout(() => {
        this.setConfigList(list);
      }, 2000);
    });
  }

  // @computed groupedConfigList() {
  //   return this.configList;
  // }
}

export const configStore = new ConfigStore();

console.log('configStore :>> ', ConfigStore.prototype, configStore);
