import { prisma } from '@infra/prisma';
import { List } from '@modules/toDo/domain/List/List';
import { ListTypeDTO } from '@modules/toDo/dtos/list';
import { ListMapper } from '../../mappers/ListMapper';
import { IListRepository } from '../IListRepository';

export class PrismaListRepository implements IListRepository {
  async getAll(): Promise<ListTypeDTO[]> {
    const lists = await prisma.list.findMany();

    return lists.map((list) => ListMapper.toDTO(list));
  }

  async getByIdDTO(id: string): Promise<ListTypeDTO | null> {
    const listDB = await prisma.list.findFirst({ where: { id } });

    if (!listDB) {
      return null;
    }

    const list = ListMapper.toDTO(listDB);

    return list;
  }

  async getById(id: string): Promise<List | null> {
    const listDB = await prisma.list.findFirst({ where: { id } });

    if (!listDB) {
      return null;
    }

    const list = ListMapper.toDomain(listDB);

    return list;
  }

  async save(list: List): Promise<void> {
    const data = await ListMapper.toPersistence(list);

    await prisma.list.update({
      where: { id: list.id },
      data,
    });
  }

  async create(list: List): Promise<void> {
    const data = await ListMapper.toPersistence(list);

    await prisma.list.create({ data });
  }

  async delete(id: string): Promise<void> {
    await prisma.list.delete({ where: { id } });
  }
}
