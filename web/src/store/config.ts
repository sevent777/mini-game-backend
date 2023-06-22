import { message } from 'antd';
import { action, computed, observable } from 'mobx';

import { addNewConfig, deleteConfig, fetchConfigList, saveConfig } from '@/common/api';
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
      this.fetchConfigList();
      message.success('Successfully saved!');
    } catch (e) {
      message.error('Format error!');
    }
  }

  @action.bound
  async addNewConfig(data) {
    await addNewConfig({
      content: {},
      ...data,
    });
    await this.fetchConfigList();
    message.success('Successfully added!');
  }

  @action.bound
  async deleteConfig(configID: number) {
    await deleteConfig(configID);
    await this.fetchConfigList();
    if (this.activeConfig.id === configID) {
      this.setSelectedKeys([]);
    }
    message.success('Successfully deleted!');
  }

  @action.bound
  setConfigList(list: IConfigurationType[]) {
    this.configTypeList = list;
    this.defaultOpenKeys = [String(list[0]?.id)];
  }

  @action.bound
  setSelectedKeys(selectedKeys: string[]) {
    const [configID] = selectedKeys;
    this.selectedKeys = selectedKeys;
    if (!configID) {
      this.activeConfig = null;
      this.setTempValue(null);
      return;
    }
    this.activeConfig = this.configsMap[configID];
    this.setTempValue(formatJSON(configStore.activeConfig.content));
  }

  fetchConfigList() {
    fetchConfigList().then(({ list }) => {
      this.setConfigList(list);
    });
  }
}

export const configStore = new ConfigStore();
