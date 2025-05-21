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
  console.log("Nombre recibido:", name); 
    const resultado = await exist(name);
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

app.post('/push/:name', async (req, res) => {
  try {
    const { nombre, precio, info, imagen, categoria } = req.body;
    const { name } = req.params;
    const resultado = await push(name, nombre, precio, info, imagen, categoria);
    res.json({ valor: resultado });
  } catch (error) {
    console.error("Error en /push:", error);
    res.status(500).json({ error: "Falló la inserción" });
  }
});

app.post('/pushcategoria/:name', async (req, res) => {
  try {
    const { nombre } = req.body;
    console.log(`push categoria todo ok      // ${nombre} //`)
    const { name } = req.params;
    const resultado = await pushcategoria(name, nombre);
    res.json({ valor: resultado });
    console.log("termino el try de pushcategoria");
  } catch (error) {
    console.error("Error en /push:", error);
    res.status(500).json({ error: "Falló la inserción" });
  }
});



async function push(name,nombre,precio,info,imagen,categoria)
{
  const query = `INSERT INTO ?? (nombre, precio, info, imagen, categoria) VALUES (?, ? , ? , ? , ?)`;

  const [results] = await pool.query(query, [name,nombre, precio, info, imagen, categoria], (err, results) =>
  {  
     if(err)
    {
        console.error('Error al agregar la los productos:', err.stack);
        return res.status(500).json({ error: 'Error en el servidor' });
    }
  });

  console.log("se pusheo todo bien");

  return true;
}



async function  pushcategoria(empresa, name)
{
  const query = `INSERT INTO ?? (name) VALUES(?)`;

  const [resulst] = await pool.query(query,[empresa,name], (err,resulst) => 
  {
    if(err)
    {
     console.error('Error al agregar la categoria:', err.stack);
     return res.status(500).json({ error: 'Error en el servidor' });
    }
  });

  console.log("ya se pusheo 0");
  return true;

}


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

