import { Either, left, right } from '@core/logic/Either';
import { List } from '@modules/toDo/domain/List/List';
import { Description } from '@modules/toDo/domain/List/objectValues/Description';
import { Title } from '@modules/toDo/domain/List/objectValues/Title';
import { IListRepository } from '@modules/toDo/repositories/IListRepository';

import { InvalidDescriptionError } from '@modules/toDo/domain/List/errors/InvalidDescriptionError';
import { InvalidTitleError } from '@modules/toDo/domain/List/errors/InvalidTitleError';

type ListRequest = {
  title: string;
  description: string;
  isActive: boolean;
};

type CreateUserResponse = Either<
  InvalidTitleError | InvalidDescriptionError,
  List
>;
export class CreateListUseCase {
  constructor(private _listRepository: IListRepository) {}

  async execute({
    title,
    description,
    isActive,
  }: ListRequest): Promise<CreateUserResponse> {
    const titleOrError = Title.create(title);
    const descriptionOrError = Description.create(description);

    if (titleOrError.isLeft()) {
      return left(titleOrError.value);
    }

    if (descriptionOrError.isLeft()) {
      return left(descriptionOrError.value);
    }

    const ListOrError = List.create({
      title: titleOrError.value,
      description: descriptionOrError.value,
      isActive: isActive,
    });

    if (ListOrError.isLeft()) {
      return left(ListOrError.value);
    }

    const list = ListOrError.value;

    await this._listRepository.create(list);

    return right(list);
  }
}
