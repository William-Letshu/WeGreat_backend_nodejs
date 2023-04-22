export class Booking {
    id!: number;
    user_id!: number;
    service_id: number | undefined;
    booking_date!: Date;
    booking_status: string | undefined;
    booking_rating: number | undefined;
  
    constructor(init?: Partial<Booking>) {
      Object.assign(this, init);
    }
  }
  