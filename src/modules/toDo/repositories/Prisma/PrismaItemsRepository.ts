import { prisma } from '@infra/prisma';
import { Item } from '@modules/toDo/domain/Item/Item';
import { ItemTypeDTO } from '@modules/toDo/dtos/item';
import { ItemMapper } from '../../mappers/ItemMapper';
import { IItemsRepository } from '../IItemsRepository';

export class PrismaItemRepository implements IItemsRepository {
  async getAll(listId: string): Promise<ItemTypeDTO[]> {
    const items = await prisma.item.findMany({
      where: { listId },
      orderBy: { order: 'asc' },
    });

    return items.map((item) => ItemMapper.toDTO(item));
  }

  async getItemsToReorder(listId: string, order: number): Promise<Item[]> {
    const items = await prisma.item.findMany({
      where: {
        listId,
        order: {
          gte: order,
        },
      },
      orderBy: { order: 'asc' },
    });

    return items.map((item) => ItemMapper.toDomain(item));
  }

  async getById(id: string, listId: string): Promise<ItemTypeDTO | null> {
    const item = await prisma.item.findFirst({ where: { id, listId } });

    if (!item) {
      return null;
    }

    return ItemMapper.toDTO(item);
  }

  async getByIdDomain(id: string, listId: string): Promise<Item | null> {
    const item = await prisma.item.findFirst({ where: { id, listId } });

    if (!item) {
      return null;
    }
    return ItemMapper.toDomain(item);
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
