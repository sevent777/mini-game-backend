import { action, observable } from 'mobx';

type Resolver = { resolve: (value?: unknown) => void; reject: (value?: unknown) => void };

export enum ModalKey {
  addNewConfig,
}

export class ModalStore {
  @observable
  public ids: ModalKey[] = [];

  private resolvers: Resolver[] = [];

  @action.bound
  public open(key: ModalKey) {
    this.ids.push(key);
    return new Promise((resolve, reject) => {
      this.resolvers.push({
        resolve,
        reject,
      });
    });
  }

  @action.bound
  public close(value?: unknown) {
    this.resolvers.pop()?.resolve(value);
    this.ids.pop();
  }

  @action.bound
  public closeAndReject(value?: unknown) {
    this.resolvers.pop()?.reject(value);
    this.ids.pop();
  }
}

export const modal = new ModalStore();
