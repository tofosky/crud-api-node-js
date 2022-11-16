// import express from 'express';
// import bodyParser from 'body-parser';

// //import customersRoutes from './routes/customers.js';
// const app = express();
// const PORT  = 5000;
// const mysql = require('mysql');


// app.use(bodyParser.json());

// //app.use('/customers', customersRoutes );

// app.get('/', (req,res) => res.send('hello from home page.'));

import express from 'express';
import bodyParser from 'body-parser';
//import { urlencoded, json } from 'body-parser';
import { createPool } from 'mysql';

const app = express();
const port = process.env.PORT || 5000

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.listen(port, () => console.log(`server Running on port ${port}`) );



//mysql
const pool = createPool({
    connectionLimit :    10,
    host            :   'localhost',
    user            :   'root',
    password        :    '',
    database        :    'moa'
 })
 
 //get all feeds
  app.get('', (req,res) =>{
    pool.getConnection((err, connection) =>{
     if(err) throw err
     console.log(`coected as id ${connection.threadId}`);

     // query(sqlstrig, callack)
     connection.query('SELECT * from moa', (err,rows) =>{
        connection.release() // retur the coectio to pool

        if(!err){
            res.send(rows)
        } else{
            console.log(err);
        }
     })
    })
  })

//get all feeds y id
  app.get('/:id', (req,res) =>{
    pool.getConnection((err, connection) =>{
     if(err) throw err
     console.log(`coected as id ${connection.threadId}`);

     // query(sqlstrig, callack)
     connection.query('SELECT * from moa WHERE id = ?', [req.params.id], (err,rows) =>{
        connection.release() // retur the coectio to pool

        if(!err){
            res.send(rows)
        } else{
            console.log(err);
        }
     })
    })
  })


  //delete records/ feeds 
  app.delete('/:id', (req,res) =>{
    pool.getConnection((err, connection) =>{
     if(err) throw err
     console.log(`coected as id ${connection.threadId}`);

     // query(sqlstrig, callack)
     connection.query('DELETE from moa WHERE id = ?', [req.params.id], (err,rows) =>{
        connection.release() // retur the coectio to pool

        if(!err){
            res.send(`Beer with the record ID: ${req.params.id} has been removed` )
        } else{
            console.log(err);
        }
     })
    })
  })

   //add a records/ feeds 
   app.post('', (req,res) =>{
    pool.getConnection((err, connection) =>{
     if(err) throw err
     console.log(`coected as id ${connection.threadId}`);
     const params = req.body

     // query(sqlstrig, callack)
     connection.query('INSERT INTO moa SET  ?',params, (err,rows) =>{
        connection.release() // retur the coectio to pool

        if(!err){
            res.send(`Beer with the record name: ${params.name} has been added` )
        } else{
            console.log(err);
        }
     })

     console.log(req.body);
    })
  })

   //update a records/ feeds 
   app.put('', (req,res) =>{
    pool.getConnection((err, connection) =>{
     if(err) throw err
     console.log(`coected as id ${connection.threadId}`);
    // const params = req.body
     const {id,name,tagline,description, image} = req.body

     // query(sqlstrig, callack)
     connection.query('UPDATE moa SET name=? WHERE tagline=? id = ?', [name, tagline, id], (err,rows) =>{
        connection.release() // retur the coectio to pool

        if(!err){
            res.send(`Beer with the record name: ${name} has been added` )
        } else{
            console.log(err);
        }
     })

     console.log(req.body);
    })
  })

