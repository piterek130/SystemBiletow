export interface SessionDto{
    id: number;
    movieTitle: string;
    ticketPrice: number;
    date: string;
    startTime: string;
    endTime: string;
    hallName: string;
    hallCapacity: number;
    bookedSeats: number[];
}