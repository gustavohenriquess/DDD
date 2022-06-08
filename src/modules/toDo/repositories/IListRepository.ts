import { List } from '../domain/List/List';

export interface IListRepository {
  getAll(): Promise<List[]>;
  getById(id: string): Promise<List | null>;
  save(list: List): Promise<void>;
  create(list: List): Promise<void>;
  delete(id: string): Promise<void>;
}
