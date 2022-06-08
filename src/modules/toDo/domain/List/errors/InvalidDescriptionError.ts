import { DomainError } from '@core/domain/errors/DomainError';

export class InvalidDescriptionError extends Error implements DomainError {
  constructor(description: string) {
    super(`The title ${description} is invalid!`);
    this.name = 'InvalidDescriptionError';
  }
}
