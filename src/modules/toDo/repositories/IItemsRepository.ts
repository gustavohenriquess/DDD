import { Item } from '../domain/Item/Item';
import { ItemTypeDTO } from '../dtos/item';

export interface IItemsRepository {
  getAll(listId: string): Promise<ItemTypeDTO[]>;
  getById(id: string, listId: string): Promise<ItemTypeDTO | null>;
  getByIdDomain(id: string, listId: string): Promise<Item | null>;
  save(item: Item): Promise<void>;
  create(item: Item): Promise<void>;
  delete(id: string): Promise<void>;
  getNextOrder(listId: string): Promise<number>;
}
