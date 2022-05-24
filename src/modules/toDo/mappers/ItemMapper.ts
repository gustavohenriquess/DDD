import { Item } from '../domain/Item/Item';

export class ItemMapper {
  static async toPersistence(item: Item) {
    return {
      id: item.id,
      title: item.title.value,
      description: item.description.value,
      forecastDate: item.forecastDate,
      done: item.done,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    };
  }
}
