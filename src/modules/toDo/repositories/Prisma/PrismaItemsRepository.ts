import { prisma } from '@infra/prisma';
import { Item } from '@modules/toDo/domain/Item/Item';
import { ItemMapper } from '../../mappers/ItemMapper';
import { IItemsRepository } from '../IItemsRepository';

export class PrismaItemsRepository implements IItemsRepository {
  getAll(): Promise<Item[]> {
    throw new Error('Method not implemented.');
  }

  getById(id: string): Promise<Item> {
    throw new Error(`Method not implemented. ${id}`);
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
