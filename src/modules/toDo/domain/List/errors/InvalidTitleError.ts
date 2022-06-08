import { DomainError } from '@core/domain/errors/DomainError';

export class InvalidTitleError extends Error implements DomainError {
  constructor(title: string) {
    super(`The title ${title} is invalid!`);
    this.name = 'InvalidTitleError';
  }
}
