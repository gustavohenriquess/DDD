import { DomainError } from '@core/domain/errors/DomainError';

export class isNotBooleanError extends Error implements DomainError {
  constructor(property: string, type: string) {
    super(`The ${property} property must be a boolean, but got ${type}`);
    this.name = 'isNotBooleanError';
  }
}
