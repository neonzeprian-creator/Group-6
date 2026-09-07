import 'dotenv/config';
import pkg from 'pg';
const { Client } = pkg;

const client = new Client({
    host: process.env.DB_HOST || process.env.HOST,
    port: process.env.DB_PORT || process.env.PORT,
    database: process.env.DB_DATABASE || process.env.DATABASE || process.env.DB_NAME,
    user: process.env.DB_USER || process.env.USER,
    password: process.env.DB_PASSWORD || process.env.DB_PASS,
    connectionString: process.env.DB_CONNECTION_STRING || process.env.DATABASE_URL
});

client.connect()
    .then(() => console.log('Connected to database'))
    .catch((err) => console.error('Database connection error:', err));

export default client;