import { Entity } from '@core/domain/Entity';
import { Either, right } from '@core/logic/Either';

import { InvalidDescriptionError } from './errors/InvalidDescriptionError';
import { InvalidTitleError } from './errors/InvalidTitleError';

import { Description } from './objectValues/Description';
import { Title } from './objectValues/Title';

interface IListProps {
  title: Title;
  description: Description;
  createdAt: Date;
  updatedAt: Date;
}

export class List extends Entity<IListProps> {
  get title() {
    return this.props.title;
  }

  get description() {
    return this.props.description;
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
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      id,
    );

    return right(list);
  }
}
