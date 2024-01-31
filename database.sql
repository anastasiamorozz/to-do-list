create TABLE Users(
    id SERIAL PRIMARY KEY,
    username VARCHAR (50) NOT NULL UNIQUE,
    email VARCHAR (120) NOT NULL UNIQUE,
    password VARCHAR (128) NOT NULL
);

create TABLE Task(
    task_id serial primary key,
    title varchar (64),
    day date not null,
    status varchar(32) check (status in ('To Do', 'In Progress', 'Completed')),
    user_id integer references Users(id) on delete cascade
);

CREATE TABLE Rooms (
  room_id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  creator_id INTEGER REFERENCES Users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE UsersInRoom (
  user_id INTEGER REFERENCES Users(id) ON DELETE CASCADE,
  room_id INTEGER REFERENCES Rooms(room_id) ON DELETE CASCADE,
  PRIMARY KEY (user_id, room_id)
);
