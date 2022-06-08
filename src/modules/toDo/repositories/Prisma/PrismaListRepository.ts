import { prisma } from '@infra/prisma';
import { List } from '@modules/toDo/domain/List/List';
import { ListMapper } from '../../mappers/ListMapper';
import { IListRepository } from '../IListRepository';

export class PrismaListRepository implements IListRepository {
  getAll(): Promise<List[]> {
    throw new Error('Method not implemented.');
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
