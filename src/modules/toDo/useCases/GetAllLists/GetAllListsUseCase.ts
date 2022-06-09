import { IListRepository } from '@modules/toDo/repositories/IListRepository';

import { ListTypeDTO } from '@modules/toDo/dtos/list';

type GetAllListsResponse = ListTypeDTO[] | null;

export class GetAllListsUseCase {
  constructor(private _listRepository: IListRepository) {}

  async execute(): Promise<GetAllListsResponse> {
    const list = await this._listRepository.getAll();

    return list;
  }
}
