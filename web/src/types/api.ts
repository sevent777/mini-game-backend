import { components } from './swagger';

export type Schemas = components['schemas'];

export type IConfiguration = Schemas['Configuration'];
export type IConfigListRsp = Schemas['ConfigListRsp'];
