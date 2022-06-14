import { Either, left, right } from '@core/logic/Either';
import { isNotBooleanError } from '@modules/toDo/domain/Errors/isNotBooleanError';
import { ListNotFoundError } from '@modules/toDo/domain/Errors/ListNotFoundError';
import { List } from '@modules/toDo/domain/List/List';
import { IListRepository } from '@modules/toDo/repositories/IListRepository';

type ListRequest = {
  id: string;
  isActive: boolean;
};

type ChangeListIsActiveResponse = Either<ListNotFoundError, List>;

export class ChangeListIsActiveUseCase {
  constructor(private _listRepository: IListRepository) {}

  async execute({
    id,
    isActive,
  }: ListRequest): Promise<ChangeListIsActiveResponse> {
    const list = await this._listRepository.getById(id);

    if (!list) {
      return left(new ListNotFoundError(id));
    }

    if (typeof isActive !== 'boolean') {
      return left(new isNotBooleanError('isActive', typeof isActive));
    }

    list.updateIsActive(isActive);

    await this._listRepository.save(list);
    return right(list);
  }
}
