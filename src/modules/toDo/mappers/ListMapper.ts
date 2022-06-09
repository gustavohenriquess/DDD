import { List } from '../domain/List/List';
import { Description } from '../domain/List/objectValues/Description';
import { Title } from '../domain/List/objectValues/Title';
import { ListTypeDTO } from '../dtos/list';

type ListDB = {
  id: string;
  title: string;
  description: string;
  isActive: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;
};
export class ListMapper {
  static toPersistence(list: List) {
    return {
      id: list.id,
      title: list.title.value,
      description: list.description.value,
      isActive: list.isActive,
      createdAt: list.createdAt,
      updatedAt: list.updatedAt,
    };
  }

  static toDomain(data: ListDB): List {
    const titleOrError = Title.create(data.title);
    const descriptionOrError = Description.create(data.description);

    if (titleOrError.isLeft()) {
      throw new Error('Invalid title');
    }

    if (descriptionOrError.isLeft()) {
      throw new Error('Invalid description');
    }

    const ListOrError = List.create(
      {
        title: titleOrError.value,
        description: descriptionOrError.value,
        isActive: data.isActive,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      },
      data.id,
    );

    if (ListOrError.isLeft()) {
      throw new Error('Invalid list');
    }

    return ListOrError.value;
  }
  static toDTO(list: ListDB): ListTypeDTO {
    return {
      id: list.id,
      title: list.title,
      description: list.description,
      isActive: list.isActive,
      createdAt: new Date(list.createdAt ?? ''),
      updatedAt: list.updatedAt,
    };
  }
}
