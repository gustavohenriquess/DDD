import { Either, left, right } from '@core/logic/Either';
import { ItemNotFoundError } from '@modules/toDo/domain/Errors/ItemNotFoundError';
import { InvalidForecastDateError } from '@modules/toDo/domain/Item/errors/InvalidForecastDateError';
import { Item } from '@modules/toDo/domain/Item/Item';
import { IItemsRepository } from '@modules/toDo/repositories/IItemsRepository';

type ItemRequest = {
  id: string;
  listId: string;
  forecastDate: Date | null;
};

type ItemResponse = Either<ItemNotFoundError | InvalidForecastDateError, Item>;

export class ChangeForecastDateUseCase {
  constructor(private _itemRepository: IItemsRepository) {}

  async execute({
    id,
    listId,
    forecastDate,
  }: ItemRequest): Promise<ItemResponse> {
    const item = await this._itemRepository.getByIdDomain(id, listId);

    if (!item) {
      return left(new ItemNotFoundError(id));
    }

    if (forecastDate) {
      forecastDate = new Date(forecastDate);

      if (!item.validForecastDate(forecastDate)) {
        return left(new InvalidForecastDateError(forecastDate));
      }
    }

    item.updateForecastDate(forecastDate);

    await this._itemRepository.save(item);

    return right(item);
  }
}
