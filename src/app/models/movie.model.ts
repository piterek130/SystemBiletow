export interface Movie {
  id: number;
  title: string;
  description: string;
  duration: number;
  imageUrl: string;
  trailerUrl: string;
  genres: string[];
  releaseDate: string;
  director: string;
  production: string;
  price: number;
  price: number;
}

export interface RouterState {
  movies?: Movie[];
}

export interface Session {
  id: number;
  movieId: number;
  date: string;
  startTime: string;
  endTime: string;
  hallId: number;
  hallId: number;
}

export interface Hall {
  id: number;
  name: String;
  capacity: number;
}

export interface Booking {
  id: number;
  sessionId: number;
  seatId: number[];
  customerId: number;
  bookingTime: String;
  code: String;
  status: String;
}