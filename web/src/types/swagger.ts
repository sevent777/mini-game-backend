/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/ban-types */
/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  '/api/cms/config/type/create': {
    post: operations['CmsController_createType'];
  };
  '/api/cms/config/type/update/{id}': {
    post: operations['CmsController_updateType'];
  };
  '/api/cms/config/list': {
    get: operations['CmsController_getList'];
  };
  '/api/cms/config/create': {
    post: operations['CmsController_create'];
  };
  '/api/cms/config/update/{id}': {
    post: operations['CmsController_update'];
  };
  '/api/user/login': {
    post: operations['UserController_login'];
  };
}

export interface components {
  schemas: {
    ConfigTypeOperationPayload: {
      name: string;
      path: string;
    };
    Configuration: {
      id: number;
      name: string;
      content: { [key: string]: unknown };
    };
    ConfigurationType: {
      id: number;
      path: string;
      name: string;
      schema: string;
      configs: components['schemas']['Configuration'][];
    };
    ConfigListRsp: {
      list: components['schemas']['ConfigurationType'][];
    };
    ConfigOperationPayload: {
      name: string;
      configTypeId: number;
      content: { [key: string]: unknown };
      effectiveTime: number;
    };
    LoginPayload: {
      name: string;
      wxOpenid: string;
      avatarUrl: string;
    };
    User: {
      name: string;
      avatarUrl: string;
    };
    LoginResponse: {
      userInfo: components['schemas']['User'];
    };
  };
}

export interface operations {
  CmsController_createType: {
    parameters: {};
    responses: {
      201: unknown;
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['ConfigTypeOperationPayload'];
      };
    };
  };
  CmsController_updateType: {
    parameters: {
      path: {
        id: number;
      };
    };
    responses: {
      201: unknown;
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['ConfigTypeOperationPayload'];
      };
    };
  };
  CmsController_getList: {
    parameters: {};
    responses: {
      200: {
        content: {
          'application/json': components['schemas']['ConfigListRsp'];
        };
      };
    };
  };
  CmsController_create: {
    parameters: {};
    responses: {
      201: unknown;
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['ConfigOperationPayload'];
      };
    };
  };
  CmsController_update: {
    parameters: {
      path: {
        id: number;
      };
    };
    responses: {
      201: unknown;
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['ConfigOperationPayload'];
      };
    };
  };
  UserController_login: {
    parameters: {};
    responses: {
      200: {
        content: {
          'application/json': components['schemas']['LoginResponse'];
        };
      };
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['LoginPayload'];
      };
    };
  };
}

export interface external {}
