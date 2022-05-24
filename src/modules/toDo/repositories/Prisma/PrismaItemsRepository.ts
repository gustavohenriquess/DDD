import { prisma } from '@infra/prisma';
import { Item } from '@modules/toDo/domain/Item/Item';
import { ItemMapper } from '../../mappers/ItemMapper';
import { IItemsRepository } from '../IItemsRepository';

export class PrismaItemsRepository implements IItemsRepository {
  async getAll(): Promise<Item[]> {
    return await prisma.item.findMany();
  }

  async getById(id: string): Promise<Item> {
    return await prisma.item.findOne({ where: { id } });
  }

  async save(item: Item): Promise<void> {
    const data = await ItemMapper.toPersistence(item);

    await prisma.item.update({
      where: { id: item.id },
      data,
    });
  }

  async create(item: Item): Promise<void> {
    const data = await ItemMapper.toPersistence(item);

    await prisma.item.create({ data });
  }

  async delete(id: string): Promise<void> {
    await prisma.item.delete({ where: { id } });
  }
}
