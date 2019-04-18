import { Id, Params } from "@feathersjs/feathers";
import { assert } from "chai";
import { Connection, DeepPartial, getRepository, Repository } from "typeorm";

import { App } from "../app";
import { Message } from "../entity/Message.entity";
import { logger } from "../logger";

type CreateOne<T> = DeepPartial<T>;
type CreateMany<T> = DeepPartial<T>[];

type MessageData = CreateOne<Message>;

export class MessageService {
  private _maybeRepo: undefined | Repository<Message>;
  private get repo(): Repository<Message> {
    if (!this._maybeRepo) {
      this._maybeRepo = getRepository(Message);
    }
    return this._maybeRepo;
  }
  async find(params: Params) {
    return this.repo.find(params.query);
  }
  async get(id: Id, params?: Params) {
    if (id) {
      return this.repo.find({ id: Number(id) });
    }
    assert.property(params, "query");

    return this.repo.find(params!.query);
  }

  async create(data: MessageData, params: Params): Promise<Message>;
  async create(data: MessageData[], params: Params): Promise<Message[]>;
  async create(data: MessageData | MessageData[], params: Params) {
    if (Array.isArray(data)) {
      const messages = data.map(message => this.repo.create(message));
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
      assert.property(params, "query");
      assert(params!.query);
      return this.repo.delete(params!.query!);
    }
    const idsToDelete = Array.isArray(id) ? id.map(Number) : Number(id);
    return this.repo.delete(idsToDelete);
  }
  setup(app: App, path: string) {
    logger.info("message service setup (path=%s)", path);
  }
}
