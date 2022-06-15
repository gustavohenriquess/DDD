import { prisma } from '@infra/prisma';
import { Item } from '@modules/toDo/domain/Item/Item';
import { ItemMapper } from '../../mappers/ItemMapper';
import { IItemsRepository } from '../IItemsRepository';

export class PrismaItemRepository implements IItemsRepository {
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

  async getNextOrder(listId: string): Promise<number> {
    const item = await prisma.item.findFirst({
      where: { listId },
      orderBy: { order: 'desc' },
    });

    if (!item) return 0;

    const nextOrder = item.order! + 1 || 0;
    return nextOrder;
  }

  async delete(id: string): Promise<void> {
    await prisma.item.delete({ where: { id } });
  }
}
