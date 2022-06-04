import { List } from '../domain/List/List';

export class ListMapper {
  static async toPersistence(list: List) {
    return {
      id: list.id,
      title: list.title.value,
      description: list.description.value,
      isActive: list.isActive,
      createdAt: list.createdAt,
      updatedAt: list.updatedAt,
    };
  }
}
