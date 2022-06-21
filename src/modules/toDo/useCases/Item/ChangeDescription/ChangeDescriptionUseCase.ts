import { Either, left, right } from '@core/logic/Either';
import { ItemNotFoundError } from '@modules/toDo/domain/Errors/ItemNotFoundError';
import { Item } from '@modules/toDo/domain/Item/Item';
import { Description } from '@modules/toDo/domain/Item/objectValues/Description';
import { IItemsRepository } from '@modules/toDo/repositories/IItemsRepository';

type ItemRequest = {
  id: string;
  listId: string;
  description: string;
};

type ItemResponse = Either<ItemNotFoundError, Item>;

export class ChangeDescriptionUseCase {
  constructor(private _itemRepository: IItemsRepository) {}

  async execute({
    id,
    listId,
    description,
  }: ItemRequest): Promise<ItemResponse> {
    const item = await this._itemRepository.getByIdDomain(id, listId);

    if (!item) {
      return left(new ItemNotFoundError(id));
    }

    const descriptionOrError = Description.create(description);

    if (descriptionOrError.isLeft()) {
      return left(descriptionOrError.value);
    }

    item.updateDescription(descriptionOrError.value);

    await this._itemRepository.save(item);
    return right(item);
  }
}
