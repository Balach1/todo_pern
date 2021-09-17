const { Pool } = require('pg')

const pool = new Pool({
    user: "postgres",
    password: "!7QrZp^s!wM-zcP4Pb.!D+s-",
    database: "todo_database",
    host: "localhost",
    port: "5432"
});

module.exports = pool;