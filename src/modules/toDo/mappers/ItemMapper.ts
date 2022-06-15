import { Item } from '../domain/Item/Item';

export class ItemMapper {
  static toPersistence(item: Item) {
    return {
      id: item.id,
      title: item.title.value,
      description: item.description.value,
      order: item.order,
      forecastDate: item.forecastDate,
      listId: item.listId,
      done: item.done,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    };
  }
}
