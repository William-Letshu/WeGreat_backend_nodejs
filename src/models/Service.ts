export class Service {
    id!: number;
    merchant_id!: number;
    service_name!: string;
    description?: string;
    price: number | undefined;
  
    constructor(init?: Partial<Service>) {
      Object.assign(this, init);
    }
  }
  