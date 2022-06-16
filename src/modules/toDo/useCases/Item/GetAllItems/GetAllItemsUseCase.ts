import { ItemTypeDTO } from '@modules/toDo/dtos/item';
import { IItemsRepository } from '@modules/toDo/repositories/IItemsRepository';

type ItemRequest = {
  listId: string;
};

type ItemResponse = ItemTypeDTO[];

export class GetAllItemsUseCase {
  constructor(private _itemRepository: IItemsRepository) {}

  async execute({ listId }: ItemRequest): Promise<ItemResponse> {
    const item = await this._itemRepository.getAll(listId);

    return item;
  }
}
