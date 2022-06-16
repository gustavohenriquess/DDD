import { Item } from '../domain/Item/Item';
import { ItemTypeDTO } from '../dtos/item';

export interface IItemsRepository {
  getAll(listId: string): Promise<ItemTypeDTO[]>;
  getById(id: string): Promise<Item>;
  save(item: Item): Promise<void>;
  create(item: Item): Promise<void>;
  delete(id: string): Promise<void>;
  getNextOrder(listId: string): Promise<number>;
}
