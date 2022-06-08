import { DomainError } from '@core/domain/errors/DomainError';

export class ListNotFoundError extends Error implements DomainError {
  constructor(id: string) {
    super(`The List with ID ${id} is invalid!`);
    this.name = 'ListNotFoundError';
  }
}
