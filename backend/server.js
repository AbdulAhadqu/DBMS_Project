const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
host: 'localhost',
user: 'root',
password: 'Ahad@1814',
database: 'dbms_project'
});

db.connect((err) => {
if (err) {
console.error('❌ MySQL connection error:', err.message);
return;
}
console.log('✅ Connected to MySQL database');
});

app.get('/', (req, res) => {
return res.json({ message: 'Hey Backend !!!' });
});

app.get('/:table', (req, res) => {
  const table = req.params.table;
  const query = `SELECT * FROM ??`;
  const allowedTables = ['Books', 'Customers', 'Orders'];

  db.query(query, [table], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});


// app.get('/books', (req, res) => {
// const query = 'SELECT * FROM Books';
// db.query(query, (err, data) => {
// if (err) {
// console.error('Query error:', err.message);
// return res.status(500).json({ error: err.message });
// }
// return res.json(data);
// });
// });

// app.get('/customers', (req, res) => {
// const query = 'SELECT * FROM customers';
// db.query(query, (err, data) => {
// if (err) {
// console.error('Query error:', err.message);
// return res.status(500).json({ error: err.message });
// }
// return res.json(data);
// });
// });

// app.get('/orders', (req, res) => {
// const query = 'SELECT * FROM orders';
// db.query(query, (err, data) => {
// if (err) {
// console.error('Query error:', err.message);
// return res.status(500).json({ error: err.message });
// }
// return res.json(data);
// });
// });

app.put('/:table/:id', (req, res) => {
  const table = req.params.table;
  const id = req.params.id;
  const data = req.body;
  
  const fields = Object.keys(data);
  const values = Object.values(data);
  if (!fields.length) {
    return res.status(400).json({ error: 'No fields provided to update.' });
  }

  let primarykey;
  if (table=='books')
  {
    primarykey = 'book_id';
  }
  else if (table =='customers'){
    primarykey= 'customer_id';
  }
  else{
    primarykey='order_id';}

  const setClause = fields.map(field => `${field} = ?`).join(', ');

  const query = `UPDATE ?? SET ${setClause} WHERE ${primarykey} = ?`;
  db.query(query, [table, ...values, id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    return res.json({ message: `Record in ${table} updated successfully`, result });
  });
});

app.delete ('/:table/:id' ,(req, res)=>{
    const table = req.params.table;
    const id = req.params.id;
    
    let primarykey;
  if (table=='books')
  {
    primarykey = 'book_id';
  }
  else if (table =='customers'){
    primarykey= 'customer_id';
  }
  else{
    primarykey='order_id';
    const deleteBook = `DELETE FROM ${table} WHERE ${primarykey} = ?`;
    db.query(deleteBook, [id], (err2, result2) => {
        if (err2) return res.status(500).json({ error: err2 });
        res.json({ message: `Book and related orders deleted`, result: result2 });
    });
  }

    const deleteOrders = `DELETE FROM orders WHERE ${primarykey} = ?`;
    db.query(deleteOrders, [id], (err, result) => {
      if (err) return res.status(500).json({ error: err });

    const deleteBook = `DELETE FROM ${table} WHERE ${primarykey} = ?`;
    db.query(deleteBook, [id], (err2, result2) => {
        if (err2) return res.status(500).json({ error: err2 });
        res.json({ message: `Book and related orders deleted`, result: result2 });
    });
});

})

app.post ('/:table', (req, res)=>{
    const table = req.params.table;
    const body = req.body;
    const keys = Object.keys(body);
    const values = Object.values(body);
    
    if (!keys.length) {
    return res.status(400).json({ error: 'No fields provided to update.' });
    }

    const columns = keys.join(', ');
    const placeholder = keys.map(()=>'?').join(', ');
    const query =  `INSERT INTO ?? (${columns}) VALUES (${placeholder})`;

    db.query (query,[table,...values], (err, result)=>{
        if (err) return res.status (500).json ({error:err})
        return res.json({message:'New Record Added !!',result})
    })
} )

app.listen(8000, () => {
console.log('🚀 Server is running on port 8000');
});