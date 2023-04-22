export class Message {
    id?: number;
    conversation_id!: number;
    sender_type!: "user" | "merchant";
    sender_id!: number;
    content!: string;
    timestamp!: Date;

    constructor(init?: Partial<Message>) {
        Object.assign(this, init);
      }
  }