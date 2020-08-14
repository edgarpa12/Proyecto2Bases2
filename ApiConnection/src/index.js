const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'svc-1eba693f-1307-4647-87c8-c4315127ed60-ddl.aws-virginia-1.db.memsql.com',
    //host: '192.168.192.23:8080',
    user: 'admin',
    password: 'Sqj161198',
    database: 'reservaciones'
});

db.connect((err) => {
    if(err){
      console.log('Error connecting to Db');
      return;
    }
    console.log('Connection established');
});

module.exports = mysql;