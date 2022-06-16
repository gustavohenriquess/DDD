export type ItemTypeDTO = {
  id: string;
  title: string;
  description: string | null;
  done: boolean;
  order: number | null;
  listId: string;
  forecastDate: Date | null;
  createdAt: Date | null;
  updatedAt: Date | null;
};
