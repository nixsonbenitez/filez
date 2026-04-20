DROP TABLE IF EXISTS files CASCADE;  
DROP TABLE IF EXISTS folders;


CREATE TABLE folders(
    id SERIAL PRIMARY KEY,
    name text UNIQUE NOT NULL
    
);

CREATE TABLE files (
    id SERIAL PRIMARY KEY,
    name text NOT NULL,
    size integer NOT NULL,
    folder_id integer NOT NULL REFERENCES folders(id) ON DELETE CASCADE,
    UNIQUE (name, folder_id)
);