import { prisma } from '@infra/prisma';
import { Item } from '@modules/toDo/domain/Item/Item';
import { ItemTypeDTO } from '@modules/toDo/dtos/item';
import { ItemMapper } from '../../mappers/ItemMapper';
import { IItemsRepository } from '../IItemsRepository';

export class PrismaItemRepository implements IItemsRepository {
  async getAll(listId: string): Promise<ItemTypeDTO[]> {
    const items = await prisma.item.findMany({
      where: { listId },
    });

    items.map((item) => ItemMapper.toDTO(item));

    return items;
  }

  async getById(id: string, listId: string): Promise<ItemTypeDTO | null> {
    const item = await prisma.item.findFirst({ where: { id, listId } });

    if (!item) {
      return null;
    }

    return ItemMapper.toDTO(item);
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
