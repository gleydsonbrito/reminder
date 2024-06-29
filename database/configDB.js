import pg from 'pg';

const { Pool } = pg

let pool;

export default async function connect() {
    if (global.connection) {
        return global.connection;
    }

    const config = {
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT
    };

    pool = new Pool(config);

    try {
        const client = await pool.connect();
        client.release();  // Libera o cliente de volta ao pool
        global.connection = pool;
       
        return pool;
    
    } catch (error) {
        console.error("Erro ao conectar ao PostgreSQL:", error);
        throw error;
    }
}
