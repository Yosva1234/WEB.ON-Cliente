  const nombre = document.getElementById('nombre').value;
 const empresa = window.location.hash.substring(1); 

 async function subir ()
 {
      try {
      const producto = {
          nombre,
      };

      const cateempresa = `cat${empresa}`;

      const answer = await fetch(`/pushcategoria/${cateempresa}`, {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      },
     body: JSON.stringify(producto), // Convertir objeto a JSON
     })

      if(!answer.ok) console.log("hubo un error en pushear");

      else 
      {
      const saveData = await answer.json();
      if (saveData.valor) {
          console.log('Producto guardado:', saveData);
          window.location.href =`info.html#${empresa}`;
          document.getElementById('loading').style.display = 'none';
      }
    }}catch
    {
        console.log("error al subir la categoria");
    }
 }