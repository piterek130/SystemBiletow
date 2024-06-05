CREATE TABLE IF NOT EXISTS movie (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  description TEXT,
  duration INT,
  image_url VARCHAR(255),
  trailer_url VARCHAR(255),
  price DOUBLE,
  release_date VARCHAR(255),
  production VARCHAR(255),
  director VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS session (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  movie_id BIGINT,
  date DATE,
  start_time TIME,
  end_time TIME,
  hall_id BIGINT
);

CREATE TABLE IF NOT EXISTS hall (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  capacity INT
);

CREATE TABLE IF NOT EXISTS booking (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  session_id BIGINT,
  seat_id VARCHAR(255),
  customer_email VARCHAR(255),
--   booking_time TIMESTAMP,
  code VARCHAR(255),
  status VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS movie_genre (
  movie_id BIGINT,
  genre VARCHAR(255),
  PRIMARY KEY (movie_id, genre)
);
