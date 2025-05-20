
  const empresa = window.location.hash.substring(1); 

 async function subir ()
 {
      const nombre = document.getElementById('nombre').value;
      console.log(nombre);
      try {
      const producto = {
          nombre,
      };

      const catempresa = `cat${empresa}`;

      const answer = await fetch(`/pushcategoria/${catempresa}`, {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      },
     body: JSON.stringify(producto), // Convertir objeto a JSON
     })

      if(!answer.ok) console.log("hubo un error en pushear");

      else 
      {
     window.location.href =`info.html#${empresa}`;
    }}
    catch
    {
        console.log("error al subir la categoria");
    }
 }