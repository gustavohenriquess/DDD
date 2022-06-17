import { DomainError } from '@core/domain/errors/DomainError';

export class ItemNotFoundError extends Error implements DomainError {
  constructor(id: string) {
    super(`The Item with ID ${id} is invalid!`);
    this.name = 'ItemNotFoundError';
  }
}
