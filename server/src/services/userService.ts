// src/services/userService.ts
import { User } from '../schemas/User';
import sqlite3 from 'sqlite3';

sqlite3.verbose();
const db = new sqlite3.Database(':memory:');

// Initialize the users table
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      age INTEGER NOT NULL,
      twitter TEXT NOT NULL,
      facebook TEXT NOT NULL
    )
  `);
});

// Get all users
export const getAllUsers = async (): Promise<User[]> => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM users', [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows as User[]);
      }
    });
  });
};

// Get a user by ID
export const getUserById = async (id: number): Promise<User | undefined> => {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row as User | undefined);
      }
    });
  });
};

// Create a new user
export const createUser = async (user: User): Promise<void> => {
  const { name, age, facebook, twitter } = user;
  return new Promise((resolve, reject) => {
    const stmt = db.prepare(
      'INSERT INTO users (name, age, twitter, facebook) VALUES (?, ?, ?, ?)'
    );
    stmt.run([name, age, twitter, facebook], (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
    stmt.finalize();
  });
};

// Update a user
export const updateUser = async (id: number, user: Partial<User>): Promise<void> => {
  const { name, age, facebook, twitter } = user;
  return new Promise((resolve, reject) => {
    db.run(
      'UPDATE users SET name = ?, age = ?, twitter = ?, facebook = ? WHERE id = ?',
      [name, age, twitter, facebook, id],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }
    );
  });
};

// Delete a user
export const deleteUser = async (id: number): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM users WHERE id = ?', [id], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};
