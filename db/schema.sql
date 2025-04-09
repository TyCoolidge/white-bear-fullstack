-- Create users table
CREATE TABLE users (
    id VARCHAR(36) PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at BIGINT,
    updated_at BIGINT
);

-- Create memory_cards table
CREATE TABLE memory_cards (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    imagery TEXT,
    next_attempt_at BIGINT,
    last_attempt_at BIGINT,
    total_successful_attempts INT,
    level INT,
    created_at BIGINT,
    updated_at BIGINT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX idx_user_id ON memory_cards(user_id);
CREATE INDEX idx_username ON users(username);
CREATE INDEX idx_email ON users(email); 