
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
     body: JSON.stringify(producto), 
     })

        if (!answer.ok)
      {
        const errorData = await answer.json(); // Lee el mensaje de error del servidor
        throw new Error(errorData.error || "Error en la petición");
      }

     const data = await answer.json(); // Procesa la respuesta exitosa
     console.log("Respuesta del servidor:", data);

      // Solo redirige si todo está OK
     window.location.href = `info.html#${empresa}`;
    }
     catch
     {
         console.log("error al subir la categoria");
     }
 }