
  const empresa = window.location.hash.substring(1); 

 async function subir ()
 {
      const nombre = document.getElementById('nombre').value;
      console.log(nombre);
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
        const errorData = await answer.json();
        throw new Error(errorData.error || "Error en la petición");
      }

     const data = await answer.json(); 
     console.log("Respuesta del servidor:", data);

     window.location.href = `info.html#${empresa}`;
 }