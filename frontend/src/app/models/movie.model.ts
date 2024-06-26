export interface Movie {
  id: number;
  title: string;
  description: string;
  duration: number;
  imageUrl: string;
  trailerUrl: string;
  genres: string;
  releaseDate: string;
  director: string;
  production: string;
  price: number;
}

export interface Session {
  id: number;
  movieId: number;
  date: string;
  startTime: string;
  endTime: string;
  hallId: number;
}

export interface Hall {
  id: number;
  name: string;
  capacity: number;
}

export interface Booking {
  sessionId: number;
  seatId: number[];
  customerEmail: string;
  code: string;
}

