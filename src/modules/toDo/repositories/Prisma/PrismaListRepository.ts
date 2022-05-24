import { prisma } from '@infra/prisma';
import { List } from '@modules/toDo/domain/List/List';
import { ListMapper } from '../../mappers/ListMapper';
import { IListRepository } from '../IListRepository';

export class PrismaListRepository implements IListRepository {
  async getAll(): Promise<List[]> {
    return await prisma.list.findMany();
  }

  async getById(id: string): Promise<List> {
    return await prisma.list.findOne({ where: { id } });
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
