import { Entity } from '@core/domain/Entity';
import { Either, left, right } from '@core/logic/Either';
import { InvalidDescriptionError } from './errors/InvalidDescriptionError';
import { InvalidForecastDateError } from './errors/InvalidForecastDateError';
import { InvalidTitleError } from './errors/InvalidTitleError';
import { Description } from './objectValues/Description';
import { Title } from './objectValues/Title';

interface IItemProps {
  title: Title;
  description: Description;
  forecastDate?: Date;
  done: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class Item extends Entity<IItemProps> {
  get title() {
    return this.props.title;
  }

  get description() {
    return this.props.description;
  }

  get forecastDate() {
    return this.props.forecastDate;
  }

  get done() {
    return this.props.done;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  private constructor(props: IItemProps, id?: string) {
    super(props, id);
  }

  private static validateForecastDate(props: IItemProps): boolean {
    if (props.forecastDate && props.forecastDate < new Date()) {
      return false;
    }

    return true;
  }

  static create(
    props: IItemProps,
    id?: string,
  ): Either<
    InvalidTitleError | InvalidDescriptionError | InvalidForecastDateError,
    Item
  > {
    if (!Item.validateForecastDate(props)) {
      return left(new InvalidForecastDateError(props.forecastDate));
    }

    const item = new Item(
      {
        ...props,
        description: props.description ?? '',
        done: props.done ?? false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      id,
    );

    return right(item);
  }
}
