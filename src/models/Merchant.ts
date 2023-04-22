export class Merchant {
    id!: number;
    username!: string;
    email!: string;
    first_name!: string;
    second_names?: string;
    surname!: string;
    identity_document!: string;
    description?: string;
    police_clearance: boolean | undefined;
    password!: string | Buffer;
  
    constructor(init?: Partial<Merchant>) {
      Object.assign(this, init);
    }
  }
  