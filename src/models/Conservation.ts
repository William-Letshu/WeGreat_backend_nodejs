export class Conversation {
    id?: number;
    user_id!: number;
    merchant_id!: number;

    constructor(init?: Partial<Conversation>) {
      Object.assign(this, init);
    }
  }
  

  