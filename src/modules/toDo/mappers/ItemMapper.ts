import { Item } from '../domain/Item/Item';
import { Description } from '../domain/Item/objectValues/Description';
import { Title } from '../domain/Item/objectValues/Title';
import { ItemTypeDTO } from '../dtos/item';

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

  static toDomain(data: ItemTypeDTO): Item {
    const titleOrError = Title.create(data.title);
    const descriptionOrError = Description.create(data.description ?? '');

    if (titleOrError.isLeft()) {
      throw new Error('Invalid title');
    }

    if (descriptionOrError.isLeft()) {
      throw new Error('Invalid description');
    }

    const ItemOrError = Item.create(
      {
        title: titleOrError.value,
        description: descriptionOrError.value,
        order: data.order!,
        forecastDate: data.forecastDate,
        listId: data.listId,
        done: data.done,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      },
      data.id,
    );

    if (ItemOrError.isLeft()) {
      throw new Error('Invalid item');
    }

    return ItemOrError.value;
  }

  static toDTO(item: ItemTypeDTO): ItemTypeDTO {
    return {
      id: item.id,
      title: item.title,
      description: item.description,
      order: item.order,
      forecastDate: item.forecastDate,
      listId: item.listId,
      done: item.done,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    };
  }
}
