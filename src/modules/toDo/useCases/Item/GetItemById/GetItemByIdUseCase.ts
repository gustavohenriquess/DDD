import { ItemTypeDTO } from '@modules/toDo/dtos/item';
import { IItemsRepository } from '@modules/toDo/repositories/IItemsRepository';

type ItemRequest = {
  id: string;
  listId: string;
};

type ItemResponse = ItemTypeDTO | null;

export class GetItemByIdUseCase {
  constructor(private _itemRepository: IItemsRepository) {}

  async execute({ id, listId }: ItemRequest): Promise<ItemResponse> {
    const item = await this._itemRepository.getById(id, listId);

    return item;
  }
}
