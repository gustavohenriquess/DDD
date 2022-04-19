import { Entity } from '@core/domain/Entity';
import { Either, right } from '@core/logic/Either';
import { InvalidNameError } from './errors/InvalidNameError';
import { Name } from './valueObject/name';

interface IUserProps {
  name: Name;
  age: number;
}

export class User extends Entity<IUserProps> {
  private constructor(props: IUserProps, id?: string) {
    super(props, id);
  }

  get name() {
    return this.props.name;
  }

  get age() {
    return this.props.age;
  }

  static create(
    props: IUserProps,
    id?: string,
  ): Either<InvalidNameError, User> {
    const user = new User(props, id);

    return right(user);
  }
}
