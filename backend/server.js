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
database: 'ecommerce_db',
timezone:'Z'
});

db.connect((err) => {
if (err) {
console.error('❌ MySQL connection error:', err.message);
return;
}
console.log('✅ Connected to MySQL database' );
});



app.get('/table', (req, res) => {
const query =   `SHOW TABLES;`;
db.query (query , (err, result)=>{
  if (err) return res.status(400).json({error :err})
  return res.json (result);
})
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

app.put('/:table/:primary_key/:id', (req, res) => {
  const table = req.params.table;
  const id = req.params.id;
  const data = req.body;
  const primarykey = req.params.primary_key;

  const fields = Object.keys(data);
  const values = Object.values(data);
  if (!fields.length) {
    return res.status(400).json({ error: 'No fields provided to update.' });
  }
  const setClause = fields.map(field => `${field} = ?`).join(', ');

  const query = `UPDATE ?? SET ${setClause} WHERE ${primarykey} = ?`;
  db.query(query, [table, ...values, id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    return res.json({ message: `Record in ${table} updated successfully`, result });
  });
});

app.delete ('/:table/:primary_key/:id' ,(req, res)=>{
    const table = req.params.table;
    const id = req.params.id;
    const primarykey = req.params.primary_key;
    const deleteBook = `DELETE FROM ${table} WHERE ${primarykey} = ?`;
    db.query(deleteBook, [id], (err2, result2) => {
        if (err2) return res.status(500).json({ error: err2 });
        res.json({ message: `Book and related orders deleted`, result: result2 });
    });


})


app.listen(8000, () => {
console.log('🚀 Server is running on port 8000');
});
