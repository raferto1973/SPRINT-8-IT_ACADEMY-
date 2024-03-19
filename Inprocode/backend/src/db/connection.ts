
// connection.ts

import mysql from 'mysql';
import keys from '../keys';

const connection = mysql.createConnection({
    ...keys,
    timezone: 'Z', 
});

export default connection; 