import { IListRepository } from '@modules/toDo/repositories/IListRepository';

import { ListTypeDTO } from '@modules/toDo/dtos/list';

type ListRequest = {
  id: string;
};

type GetListByIdResponse = ListTypeDTO | null;
export class GetListByIdUseCase {
  constructor(private _listRepository: IListRepository) {}

  async execute({ id }: ListRequest): Promise<GetListByIdResponse> {
    const list = await this._listRepository.getByIdDTO(id);

    return list;
  }
}
