const mysql = require('mysql');

const db = mysql.createConnection({
    // host: 'svc-4d649326-d551-4380-857b-3b28db85d594-dml.aws-virginia-1.db.memsql.com',
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'hellomemsql'
});

db.connect((err) => {
    if(err){
      console.log('Error connecting to Db');
      return;
    }
    console.log('Connection established');
});
db.query('SELECT * FROM test', (err,rows) => {
    if(err) throw err;
  
    console.log('Data received from Db:');
    console.log(rows);
});