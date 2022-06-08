import { DomainError } from '@core/domain/errors/DomainError';

export class InvalidForecastDateError extends Error implements DomainError {
  constructor(ForecastDate?: Date) {
    super(`The title ${ForecastDate} is invalid!`);
    this.name = 'InvalidForecastDateError';
  }
}
