import { IConfigListRsp, IConfigOperationPayload } from '@/types/api';

import { fetcher } from './fetcher';

export const fetchConfigList: () => Promise<IConfigListRsp> = () => fetcher.get('/cms/config/list');

export const saveConfig = (configID, data: Partial<IConfigOperationPayload>): Promise<void> =>
  fetcher.post(`/cms/config/update/${configID}`, data);
