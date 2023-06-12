import { IConfigListRsp } from '@/types/api';

import { fetcher } from './fetcher';

export const fetchConfigList: () => Promise<IConfigListRsp> = () => fetcher.get('/cms/config/list');
