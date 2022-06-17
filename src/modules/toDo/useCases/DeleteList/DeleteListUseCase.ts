import { Either, left, right } from '@core/logic/Either';
import { ListNotFoundError } from '@modules/toDo/domain/Errors/ListNotFoundError';
import { IListRepository } from '@modules/toDo/repositories/IListRepository';

type ListRequest = {
  id: string;
};

type ListResponse = Either<ListNotFoundError | Error, null>;

export class DeleteListUseCase {
  constructor(private _listRepository: IListRepository) {}

  async execute({ id }: ListRequest): Promise<ListResponse> {
    const list = await this._listRepository.getById(id);

    if (!list) {
      return left(new ListNotFoundError(id));
    }

    await this._listRepository.delete(id);

    return right(null);
  }
}
