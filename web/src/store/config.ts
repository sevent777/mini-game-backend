import { message } from 'antd';
import { action, computed, observable } from 'mobx';

import { fetchConfigList, saveConfig } from '@/common/api';
import { IConfiguration, IConfigurationType } from '@/types/api';
import { formatJSON } from '@/utils';

export class ConfigStore {
  @observable configTypeList: IConfigurationType[] = [];
  @observable selectedKeys: string[] = [];
  @observable defaultOpenKeys: string[];
  @observable tempValue: string;
  @observable activeConfig: IConfiguration = null;

  @computed get configsMap(): Record<string, IConfiguration> {
    const map = {};
    this.configTypeList.forEach(({ configs }) =>
      configs.forEach((config) => {
        map[config.id] = config;
      })
    );
    return map;
  }

  @action.bound
  setTempValue(value: string) {
    this.tempValue = value;
  }

  @action.bound
  async saveTempValue() {
    try {
      const content = JSON.parse(this.tempValue);
      await saveConfig(this.activeConfig.id, {
        content,
      });
    } catch (e) {
      message.error('格式异常!');
    }
  }

  @action.bound
  setConfigList(list: IConfigurationType[]) {
    this.configTypeList = list;
    this.defaultOpenKeys = [String(list[0]?.id)];
    this.setSelectedKeys([String(list[0]?.configs?.[0]?.id)]);
  }

  @action.bound
  setSelectedKeys(selectedKeys: string[]) {
    const [configID] = selectedKeys;
    this.selectedKeys = selectedKeys;
    this.activeConfig = this.configsMap[configID];
    this.setTempValue(formatJSON(configStore.activeConfig.content));
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
