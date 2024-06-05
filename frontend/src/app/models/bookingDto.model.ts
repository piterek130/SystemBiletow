export interface BookingDto {
    id: number;
    seatId: number[];
    customerEmail: string;
    code: string;
    status: string;
    movieTitle: string;
    date: string;
    startTime: string;
    hallName: string;
  }