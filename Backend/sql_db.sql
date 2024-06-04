CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    email VARCHAR NOT NULL CHECK (email ~* '^[^@]+@[^@]+\.[^@]+$'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    password VARCHAR NOT NULL,
    role_id INTEGER
);

CREATE TYPE task_status AS ENUM (
	'not_started', 
	'in_progress', 
	'completed'
);

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    name VARCHAR NOT NULL,
    detail VARCHAR,
    due_date TIMESTAMP,
    status task_status NOT NULL DEFAULT 'not_started',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE roles (
	id SERIAL PRIMARY KEY,
	name VARCHAR NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE role_permission (
	id INT PRIMARY KEY NOT NULL,
	role_id INT NOT NULL,
	permission_id INT NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE permission (
	id SERIAL PRIMARY KEY,
	name VARCHAR NOT NULL,
	description VARCHAR NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);