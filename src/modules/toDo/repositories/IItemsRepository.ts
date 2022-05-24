import { Item } from '../domain/Item/Item';

export interface IItemsRepository {
  getAll(): Promise<Item[]>;
  getById(id: string): Promise<Item>;
  save(item: Item): Promise<void>;
  create(item: Item): Promise<void>;
  delete(id: string): Promise<void>;
}
