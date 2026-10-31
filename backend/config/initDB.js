    import {sql} from './db.js'

    export async function initDB() {
        try {
        await sql`CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            email VARCHAR(255) unique NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        `;
        await sql`CREATE TABLE IF NOT EXISTS boards (
            id SERIAL PRIMARY KEY,
            name VARCHAR (255) NOT NULL,
            created_by INT REFERENCES users(id) ON DELETE CASCADE NOT NULL ,
            created_at TIMESTAMP default CURRENT_TIMESTAMP
        )
        `;
        console.log("Db initialized successfully.")
        } catch (error) {
        console.log("Error initializing database", error)
        }
    };