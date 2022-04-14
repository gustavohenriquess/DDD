import { Entity } from '@core/domain/Entity';

interface IUserProps {
  name: string;
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
}
