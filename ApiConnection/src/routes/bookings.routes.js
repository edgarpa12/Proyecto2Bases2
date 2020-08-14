const express = require("express");
const router = express.Router();
const mysql = require('mysql');
const { db } = require("../index");

// ADD a new task
var pool = mysql.createPool({
    host            : 'svc-1eba693f-1307-4647-87c8-c4315127ed60-ddl.aws-virginia-1.db.memsql.com',
    user            : 'admin',
    password        : 'Sqj161198',
    database        : 'reservaciones',
    connectionLimit : 10,               // this is the max number of connections before your pool starts waiting for a release
    multipleStatements : true           // I like this because it helps prevent nested sql statements, it can be buggy though, so be careful
});

router.post("/", async (req, res) => {
    pool.getConnection(function (err, conn) {
        if (err)
            return res.send(400);
        conn.query('SELECT * FROM horarios', function(err, rows) {
            if(err) {
                conn.release();
                return res.send(400, 'Couldnt get a connection');
            }
            res.send(rows);
            conn.release();
        });
    });
});


  /*  const { date } = req.body;

  mysql.query("SELECT * FROM test", (err, rows) => {
    if (err) throw err;

    console.log("Data received from Db:");
    res.json({ rows: rows });
  });*/
module.exports = router;
