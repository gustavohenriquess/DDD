import { Either, left, right } from '@core/logic/Either';
import { ItemNotFoundError } from '@modules/toDo/domain/Errors/ItemNotFoundError';
import { Item } from '@modules/toDo/domain/Item/Item';
import { Title } from '@modules/toDo/domain/Item/objectValues/Title';
import { IItemsRepository } from '@modules/toDo/repositories/IItemsRepository';

type ItemRequest = {
  id: string;
  listId: string;
  title: string;
};

type ItemResponse = Either<ItemNotFoundError, Item>;

export class ChangeTitleUseCase {
  constructor(private _itemRepository: IItemsRepository) {}

  async execute({ id, listId, title }: ItemRequest): Promise<ItemResponse> {
    const item = await this._itemRepository.getByIdDomain(id, listId);

    if (!item) {
      return left(new ItemNotFoundError(id));
    }

    const titleOrError = Title.update(title);

    if (titleOrError.isLeft()) {
      return left(titleOrError.value);
    }

    item.updateTitle(titleOrError.value);

    await this._itemRepository.save(item);
    return right(item);
  }
}
