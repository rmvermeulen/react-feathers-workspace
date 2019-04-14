import { Id, Params } from '@feathersjs/feathers';
import { DeepPartial, getRepository } from 'typeorm';
import { App } from '../app';
import { Message } from '../entity/Message';
import { User } from '../entity/User';

import { assert } from 'chai';

type CreateOne<T> = DeepPartial<T>;
type CreateMany<T> = DeepPartial<T>[];
type CreateData<T> = CreateOne<T> | CreateMany<T>;

type MessageData = CreateOne<Message>;

export class Messages {
  private repo = getRepository(Message);
  async find(params: Params) {
    return this.repo.find(params.query);
  }
  async get(id: Id, params?: Params) {
    if (id) {
      return this.repo.find({ id: Number(id) });
    }
    assert.property(params, 'query');

    return this.repo.find(params!.query);
  }

  async create(data: MessageData, params: Params): Promise<Message>;
  async create(data: MessageData[], params: Params): Promise<Message[]>;
  async create(data: MessageData | MessageData[], params: Params) {
    if (Array.isArray(data)) {
      const messages = data.map((message) => this.repo.create(message));
      return this.repo.save(messages);
    }
    const message = this.repo.create(data);
    return this.repo.save(message);
  }

  async update(id: Id, data: MessageData, params: Params) {
    if (id) {
      return this.repo.update(id, data);
    }
    const { query } = params;
    assert.isObject(query, `Cannot update message without id or params.query`);
    return this.repo.update(query!, data);
  }
  async patch(id: Id, data: MessageData, params: Params) {
    return this.update(id, data, params);
  }
  async remove(id: Id | Id[] | null, params?: Params) {
    if (id === null) {
      assert.property(params, 'query');
      assert(params!.query);
      return this.repo.delete(params!.query!);
    }
    const idsToDelete = Array.isArray(id) ? id.map(Number) : Number(id);
    return this.repo.delete(idsToDelete);
  }
  setup(app: App, path: string) {}
}
