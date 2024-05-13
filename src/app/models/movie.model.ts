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
}

export interface Session {
  id: number;
  movieId: number;
  date: string;
  startTime: string;
  endTime: string;
  hall: number;
}

export interface Ticket {
  id: number;
  sessionId: number;
  seatNumbers: number[];
}
