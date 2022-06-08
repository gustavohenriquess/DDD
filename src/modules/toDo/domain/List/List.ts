import { Entity } from '@core/domain/Entity';
import { Either, right } from '@core/logic/Either';

import { InvalidDescriptionError } from './errors/InvalidDescriptionError';
import { InvalidTitleError } from './errors/InvalidTitleError';

import { Description } from './objectValues/Description';
import { Title } from './objectValues/Title';

interface IListProps {
  title: Title;
  description: Description;
  isActive: boolean;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

export class List extends Entity<IListProps> {
  get title() {
    return this.props.title;
  }

  get description() {
    return this.props.description;
  }

  get isActive(): boolean {
    return this.props.isActive;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  private constructor(props: IListProps, id?: string) {
    super(props, id);
  }

  static create(
    props: IListProps,
    id?: string,
  ): Either<InvalidDescriptionError | InvalidTitleError, List> {
    const list = new List(
      {
        ...props,
        description: props.description ?? '',
        isActive: props.isActive ?? true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      id,
    );

    return right(list);
  }

  public update(props: IListProps) {
    this.setTitle(props.title);
    this.setDescription(props.description);
    this.setIsActive(props.isActive);
    this.setUpdatedAt();
  }

  private setTitle(title: Title) {
    this.props.title = title;
  }

  private setDescription(description: Description) {
    this.props.description = description;
  }

  private setIsActive(isActive: boolean) {
    this.props.isActive = isActive;
  }

  private setUpdatedAt() {
    this.props.updatedAt = new Date();
  }
}
