import { Either, left, right } from '@core/logic/Either';
import { ListNotFoundError } from '@modules/toDo/domain/Errors/ListNotFoundError';
import { InvalidDescriptionError } from '@modules/toDo/domain/List/errors/InvalidDescriptionError';
import { InvalidTitleError } from '@modules/toDo/domain/List/errors/InvalidTitleError';
import { List } from '@modules/toDo/domain/List/List';
import { Description } from '@modules/toDo/domain/List/objectValues/Description';
import { Title } from '@modules/toDo/domain/List/objectValues/Title';
import { IListRepository } from '@modules/toDo/repositories/IListRepository';

type ListRequest = {
  id: string;
  title: string;
  description: string;
  isActive: boolean;
};

type UpdateUserResponse = Either<
  InvalidTitleError | InvalidDescriptionError | ListNotFoundError,
  List
>;

export class UpdateListUseCase {
  constructor(private _listRepository: IListRepository) {}

  async execute({
    id,
    title,
    description,
    isActive,
  }: ListRequest): Promise<UpdateUserResponse> {
    const list = await this._listRepository.getById(id);

    if (!list) {
      return left(new ListNotFoundError(id));
    }

    const titleOrError = Title.update(title);
    const descriptionOrError = Description.create(description);

    if (titleOrError.isLeft()) {
      return left(titleOrError.value);
    }
    if (descriptionOrError.isLeft()) {
      return left(descriptionOrError.value);
    }

    list.update({
      title: titleOrError.value,
      description: descriptionOrError.value,
      isActive,
    });

    await this._listRepository.save(list);
    return right(list);
  }
}
