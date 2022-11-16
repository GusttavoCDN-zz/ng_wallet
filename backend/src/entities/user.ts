import { randomUUID } from 'crypto';

interface UserProps {
  username: string
  password: string
}

export class User {
  public readonly id: string;
  public readonly username: string;
  public readonly password: string;
  public readonly accountId: string;

  constructor(props: UserProps) {
    this.id = randomUUID();
    this.username = props.username;
    this.password = props.password;
    this.accountId = randomUUID();
  }
}
