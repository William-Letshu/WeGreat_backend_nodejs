import { FalseLiteral } from "typescript";

export class User {
  id!: number;
  username!: string;
  email!: string;
  password!: string;
  first_name!: string;
  second_names!: string;
  surname!: string;
  identity_document!: string;
  disabled: boolean | FalseLiteral = false;

  constructor(init?: Partial<User>) {
    Object.assign(this, init);
  }
}
