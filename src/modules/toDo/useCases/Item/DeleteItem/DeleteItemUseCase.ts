import { Either, left, right } from '@core/logic/Either';
import { ItemNotFoundError } from '@modules/toDo/domain/Errors/ItemNotFoundError';
import { IItemsRepository } from '@modules/toDo/repositories/IItemsRepository';

type ItemRequest = {
  id: string;
  listId: string;
};

type ItemResponse = Either<Error, null>;

export class DeleteItemUseCase {
  constructor(private _itemRepository: IItemsRepository) {}

  async execute({ id, listId }: ItemRequest): Promise<ItemResponse> {
    const item = await this._itemRepository.getById(id, listId);

    if (!item) {
      return left(new ItemNotFoundError(id));
    }

    await this._itemRepository.delete(id);

    return right(null);
  }
}
