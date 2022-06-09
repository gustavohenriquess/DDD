import { List } from '../domain/List/List';
import { ListTypeDTO } from '../dtos/list';

export interface IListRepository {
  getAll(): Promise<ListTypeDTO[]>;
  getByIdDTO(id: string): Promise<ListTypeDTO | null>;
  getById(id: string): Promise<List | null>;
  save(list: List): Promise<void>;
  create(list: List): Promise<void>;
  delete(id: string): Promise<void>;
}
