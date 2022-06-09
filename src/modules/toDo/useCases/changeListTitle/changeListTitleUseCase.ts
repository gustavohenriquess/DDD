import { Either, left, right } from '@core/logic/Either';
import { ListNotFoundError } from '@modules/toDo/domain/Errors/ListNotFoundError';
import { InvalidTitleError } from '@modules/toDo/domain/List/errors/InvalidTitleError';
import { List } from '@modules/toDo/domain/List/List';
import { Title } from '@modules/toDo/domain/List/objectValues/Title';
import { IListRepository } from '@modules/toDo/repositories/IListRepository';

type ListRequest = {
  id: string;
  title: string;
};

type ChangeListTitleResponse = Either<
  InvalidTitleError | ListNotFoundError,
  List
>;

export class ChangeListTitleUseCase {
  constructor(private _listRepository: IListRepository) {}

  async execute({ id, title }: ListRequest): Promise<ChangeListTitleResponse> {
    const list = await this._listRepository.getById(id);

    if (!list) {
      return left(new ListNotFoundError(id));
    }

    const titleOrError = Title.update(title);

    if (titleOrError.isLeft()) {
      return left(titleOrError.value);
    }

    list.updateTitle(titleOrError.value);

    await this._listRepository.save(list);
    return right(list);
  }
}
