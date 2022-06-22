import { Either, left, right } from '@core/logic/Either';
import { ItemNotFoundError } from '@modules/toDo/domain/Errors/ItemNotFoundError';
import { Item } from '@modules/toDo/domain/Item/Item';
import { IItemsRepository } from '@modules/toDo/repositories/IItemsRepository';

type ItemRequest = {
  id: string;
  listId: string;
  order: number;
};

type ItemResponse = Either<ItemNotFoundError, Item>;

export class ChangeOrderUseCase {
  constructor(private _itemRepository: IItemsRepository) {}

  async execute({ id, listId, order }: ItemRequest): Promise<ItemResponse> {
    const item = await this._itemRepository.getByIdDomain(id, listId);

    if (!item) {
      return left(new ItemNotFoundError(id));
    }

    await this.updateOrders({ listId, order });

    item.updateOrder(order);

    await this._itemRepository.save(item);
    return right(item);
  }

  async updateOrders({ listId, order }: { listId: string; order: number }) {
    const items = await this._itemRepository.getItemsToReorder(listId, order);

    items.map(async (item) => {
      item.updateOrder(item.order + 1);
      await this._itemRepository.save(item);
    });
  }
}
