const express = require('express');
const path = require('path');
const mysql = require('mysql2/promise'); 
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

app.get('/encript/:name', async (req, res) => {
  const { name } = req.params;
    const resultado = await hashing(name); 
    res.json({ valor: resultado });
});

app.get('/exist/:name', async (req, res) => {
  const { name } = req.params;
  console.log("Nombre recibido:", name); // Depuración
    // Sanitiza el nombre (opcional pero recomendado)
    const sanitizedName = name.replace(/[^a-zA-Z0-9_]/g, "");
    if (!sanitizedName) {
      return res.status(400).json({ error: "Nombre inválido" });
    }
    const resultado = await exist(sanitizedName);
    res.json({ valor: resultado });
  
});

app.get('/delete/:name/:id', async (req, res) => {
  const { name , id } = req.params;

    const sanitizedName = name.replace(/[^a-zA-Z0-9_]/g, "");
    if (!sanitizedName) {
      return res.status(400).json({ error: "Nombre inválido" });
    }
    const resultado = await borrar(sanitizedName, id);
    res.json({ valor: resultado });
});

app.get('/:productos', async(req, res) => {
  const {productos} = req.params;
  console.log(productos);
  if(productos === 'favicon.ico') return res.status(204).end();
  const [resp] = await pool.query('SELECT * FROM ??', [productos]);
  res.json(resp);
});

app.post('/push', async(req,res) =>
{
 const {nombre,precio,info,imagen,categoria} = req.body;

 const resultado = await push(nombre,precio,info,imagen,categoria);

 res.json({ valor: resultado });
});

async function push(nombre,precio,info,imagen,categoria)
{
  const query = `INSERT INTO ?? (nombre, precio, info, imagen, categoria) VALUES (?, ? , ? , ? , ?)`;

  const [results] = await pool.query(query, [productos,nombre, precio, info, imagen, categoria], (err, results));

  return true;
}


app.post('/:productos', async(req, res) => {
  const { nombre, precio, info, imagen, categoria } = req.body; 
  const {productos} = req.params;

  try{
  const query = `INSERT INTO ?? (nombre, precio, info, imagen, categoria) VALUES (?, ? , ? , ? , ?)`;

  const [results] = await pool.query(query, [productos,nombre, precio, info, imagen, categoria], (err, results) => {
    if (err) {
      console.error('Error al agregar la los productos:', err.stack);
      return res.status(500).json({ error: 'Error en el servidor' });
    }

    res.status(201).json({ message: 'producto agregado correctamente', id: results.insertId });
  });

} catch(error)
{
    console.error('Error al agregar producto:', error);
    res.status(500).json({ 
      error: 'Error en el servidor',
      detalle: error.message 
    });
}

});



app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

process.on('SIGINT', () => {
  pool.end(); 
  process.exit();
});

async function borrar(name, id) {
    const query = 'DELETE FROM ?? WHERE id = ?';
    const [results] = await pool.query(query, [name, id]);
    return true; 
}

async function exist(username) {
    const [tables] = await pool.query("SHOW TABLES LIKE ?", [username]);
    return tables.length > 0;
}



 function hashing(username)
{
    return username;
}

