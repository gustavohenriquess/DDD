import { Either, left, right } from '@core/logic/Either';
import { InvalidDescriptionError } from '@modules/toDo/domain/Item/errors/InvalidDescriptionError';
import { InvalidTitleError } from '@modules/toDo/domain/Item/errors/InvalidTitleError';
import { Item } from '@modules/toDo/domain/Item/Item';
import { Description } from '@modules/toDo/domain/Item/objectValues/Description';
import { Title } from '@modules/toDo/domain/Item/objectValues/Title';
import { IItemsRepository } from '@modules/toDo/repositories/IItemsRepository';

type ItemRequest = {
  title: string;
  description: string;
  listId: string;
  forecastDate: Date;
};

type CreateUserResponse = Either<
  InvalidTitleError | InvalidDescriptionError,
  Item
>;
export class CreateItemUseCase {
  constructor(private _itemRepository: IItemsRepository) {}

  async execute({
    title,
    description,
    forecastDate,
    listId,
  }: ItemRequest): Promise<CreateUserResponse> {
    const titleOrError = Title.create(title);
    const descriptionOrError = Description.create(description);

    if (titleOrError.isLeft()) {
      return left(titleOrError.value);
    }

    if (descriptionOrError.isLeft()) {
      return left(descriptionOrError.value);
    }
    const order = await this.nextOrder(listId);

    const ItemOrError = Item.create({
      title: titleOrError.value,
      description: descriptionOrError.value,
      order,
      forecastDate,
      listId,
    });

    if (ItemOrError.isLeft()) {
      return left(ItemOrError.value);
    }

    const item = ItemOrError.value;

    await this._itemRepository.create(item);

    return right(item);
  }

  private async nextOrder(listId: string): Promise<number> {
    return await this._itemRepository.getNextOrder(listId);
  }
}
