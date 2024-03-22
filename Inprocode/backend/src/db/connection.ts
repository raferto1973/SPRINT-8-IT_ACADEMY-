
// connection.ts

import mysql from 'mysql';
import keys from '../keys';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'activity',
    multipleStatements: true,
    timezone: 'Z',
});

export default connection; 