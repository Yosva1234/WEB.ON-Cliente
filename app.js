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
  try {
    const resultado = await hashing(name); 
    res.json({ valor: resultado });
  } catch (error) {
    res.status(500).json({ error: "Error al verificar la tabla" });
  }
});

app.get('/exist/:name', async (req, res) => {
  const { name } = req.params;
  console.log("Nombre recibido:", name); // Depuración

  try {
    // Sanitiza el nombre (opcional pero recomendado)
    const sanitizedName = name.replace(/[^a-zA-Z0-9_]/g, "");
    if (!sanitizedName) {
      return res.status(400).json({ error: "Nombre inválido" });
    }

    const resultado = await exist(sanitizedName);
    res.json({ valor: resultado });
  } catch (error) {
    console.error("Error en /exist:", error.message); // Log detallado
    res.status(500).json({ error: "Error al verificar la tabla" });
  }
});

app.get('/delete/:name/:id', async (req, res) => {
  const { name , id } = req.params;
  console.log("entro a eliminar", name); // Depuración

  try {
    // Sanitiza el nombre (opcional pero recomendado)
    const sanitizedName = name.replace(/[^a-zA-Z0-9_]/g, "");
    if (!sanitizedName) {
      return res.status(400).json({ error: "Nombre inválido" });
    }

    const resultado = await borrar(sanitizedName, id);
    res.json({ valor: resultado });
  } catch (error) {
    console.error("Error en /borrar:", error.message); // Log detallado
    res.status(500).json({ error: "Error al verificar la tabla" });
  }
});

app.get('/:productos', async(req, res) => {
  const {productos} = req.params;
  console.log(productos);
  if(productos === 'favicon.ico') return res.status(204).end();
  try{
  const [resp] = await pool.query('SELECT * FROM ??', [productos]);
  res.json(resp);
  }catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});


app.post('/:productos', async(req, res) => {
  const { nombre, precio, info, imagen, categoria } = req.body; 
  const {productos} = req.params;

  if (!nombre  || !precio  || !info || !categoria ) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
  }

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
  try {
    const query = 'DELETE FROM ?? WHERE id = ?';
    // Asume que pool.query soporta promesas (ej: mysql2/promise)
    const [results] = await pool.query(query, [name, id]);
    
    if (results.affectedRows === 0) {
      throw new Error("Ningún registro fue eliminado (ID no existe)");
    }
    
    return true; // Éxito
  } catch (error) {
    console.error("Error al borrar:", error);
    throw error; // Propaga el error para manejarlo fuera
  }
}

async function exist(username) {
  try {
    const [tables] = await pool.query("SHOW TABLES LIKE ?", [username]);
    console.log("Resultado de la consulta:", tables); // Depuración
    return tables.length > 0;
  } catch (error) {
    console.error("Error en exist():", error);
    throw error; // Propaga el error
  }
}



 function hashing(username)
{
    return username;
}

