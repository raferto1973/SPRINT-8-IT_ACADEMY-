
// connection.ts

import mysql from 'mysql2';
import keys from '../keys';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'activity',
    multipleStatements: true,
    timezone: 'Z',
});

export default connection; 