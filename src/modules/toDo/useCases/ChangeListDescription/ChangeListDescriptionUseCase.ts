import { Either, left, right } from '@core/logic/Either';
import { ListNotFoundError } from '@modules/toDo/domain/Errors/ListNotFoundError';
import { InvalidDescriptionError } from '@modules/toDo/domain/List/errors/InvalidDescriptionError';
import { List } from '@modules/toDo/domain/List/List';
import { Description } from '@modules/toDo/domain/List/objectValues/Description';
import { IListRepository } from '@modules/toDo/repositories/IListRepository';

type ListRequest = {
  id: string;
  description: string;
};

type ChangeListDescriptionResponse = Either<
  InvalidDescriptionError | ListNotFoundError,
  List
>;

export class ChangeListDescriptionUseCase {
  constructor(private _listRepository: IListRepository) {}

  async execute({
    id,
    description,
  }: ListRequest): Promise<ChangeListDescriptionResponse> {
    const list = await this._listRepository.getById(id);

    if (!list) {
      return left(new ListNotFoundError(id));
    }

    const descriptionOrError = Description.create(description);

    if (descriptionOrError.isLeft()) {
      return left(descriptionOrError.value);
    }

    list.updateDescription(descriptionOrError.value);

    await this._listRepository.save(list);
    return right(list);
  }
}
