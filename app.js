const express = require('express');
const path = require('path');
const mysql = require('mysql2'); 
const cors = require('cors'); 

const app = express();
const PORT = process.env.PORT || 3000;


const pool = mysql.createPool({
  host: 'bqoidrmxthx4m9dwrubr-mysql.services.clever-cloud.com', 
  user: 'uv56cxcocjwosjop', 
  password: 'bqABEWdDYIwcXVr27B6q', 
  database: 'bqoidrmxthx4m9dwrubr', 
  waitForConnections: true, 
  connectionLimit: 10,
  queueLimit: 0 
});


app.use(cors()); 
app.use(express.json()); 
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get('/encript:name', (req, res) => {
 const { name } = req.params;
  res.json({valor:hashing(name)});
});
app.get(`/exist/:name`,(req,res) =>{
 const { name } = req.params;
  res.json({valor:exist(name)});
});

function exist(username)
{
  const [tables] =  pool.query( "SHOW TABLES LIKE ?",  [username]);
  return (tables.length>0);

}

function hashing(username)
{
    return username;
}

app.get('/productos', (req, res) => {
  const query = 'SELECT * FROM productos'; 
  pool.query(query, (err, results) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err.stack);
      res.status(500).send('Error en el servidor');
      return;
    }
    res.json(results); 
  });
});


app.post('/productos', (req, res) => {
  const { nombre, precio, info, imagen, categoria } = req.body; 

  if (!nombre  || !precio  || !info || !categoria ) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
  }

  const query = 'INSERT INTO productos (nombre, precio, info, imagen, categoria) VALUES (?, ? , ? , ? , ?)'; 

  pool.query(query, [nombre, precio, info, imagen, categoria], (err, results) => {
    if (err) {
      console.error('Error al agregar la los productos:', err.stack);
      return res.status(500).json({ error: 'Error en el servidor' });
    }

    res.status(201).json({ message: 'producto agregado correctamente', id: results.insertId });
  });
});

app.delete('/productos/:id', (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM productos WHERE id = ?';
  pool.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error al eliminar el productos:', err.stack);
      res.status(500).send('Error en el servidor');
      return;
    }

    if (results.affectedRows === 0) {
      res.status(404).json({ error: 'producto no encontrada' });
      return;
    }

    res.json({ message: 'producto eliminada correctamente' });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

process.on('SIGINT', () => {
  pool.end(); 
  process.exit();
});