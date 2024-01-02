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