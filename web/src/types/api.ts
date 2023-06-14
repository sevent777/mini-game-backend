import { components } from './swagger';

export type Schemas = components['schemas'];

export type IConfigurationType = Schemas['ConfigurationType'];
export type IConfiguration = Schemas['Configuration'];
export type IConfigListRsp = Schemas['ConfigListRsp'];

export type IConfigOperationPayload = Schemas['ConfigOperationPayload'];
