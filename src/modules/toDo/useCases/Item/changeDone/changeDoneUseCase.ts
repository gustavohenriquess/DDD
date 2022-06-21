import { Either, left, right } from '@core/logic/Either';
import { ItemNotFoundError } from '@modules/toDo/domain/Errors/ItemNotFoundError';
import { Item } from '@modules/toDo/domain/Item/Item';
import { IItemsRepository } from '@modules/toDo/repositories/IItemsRepository';

type ItemRequest = {
  id: string;
  listId: string;
  done: boolean;
};

type ItemResponse = Either<ItemNotFoundError, Item>;
export class ChangeDoneUseCase {
  constructor(private _itemRepository: IItemsRepository) {}

  async execute({ id, listId, done }: ItemRequest): Promise<ItemResponse> {
    const item = await this._itemRepository.getByIdDomain(id, listId);

    if (!item) {
      return left(new ItemNotFoundError(id));
    }

    item.updateDone(done);

    await this._itemRepository.save(item);
    return right(item);
  }

  private async nextOrder(listId: string): Promise<number> {
    return await this._itemRepository.getNextOrder(listId);
  }
}
