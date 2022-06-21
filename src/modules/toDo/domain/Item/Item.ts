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
  order: number;
  done?: boolean;
  listId: string;
  forecastDate: Date | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

export class Item extends Entity<IItemProps> {
  get title() {
    return this.props.title;
  }

  get description() {
    return this.props.description;
  }

  get order() {
    return this.props.order;
  }

  get listId() {
    return this.props.listId;
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
    if (props.forecastDate && !Item.validateForecastDate(props)) {
      return left(new InvalidForecastDateError(props.forecastDate));
    }

    const item = new Item(
      {
        ...props,
        description: props.description ?? '',
        order: props.order,
        done: props.done ?? false,
        forecastDate: props.forecastDate ?? null,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? new Date(),
      },
      id,
    );

    return right(item);
  }

  public updateDone(done: boolean) {
    this.setDone(done);
    this.setUpdatedAt();
  }

  public updateTitle(title: Title) {
    this.setTitle(title);
    this.setUpdatedAt();
  }

  public updateDescription(description: Description) {
    this.setDescription(description);
    this.setUpdatedAt();
  }

  private setDone(done: boolean) {
    this.props.done = done;
  }

  private setTitle(title: Title) {
    this.props.title = title;
  }

  private setDescription(description: Description) {
    this.props.description = description;
  }

  private setUpdatedAt() {
    this.props.updatedAt = new Date();
  }
}
