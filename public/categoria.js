
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
     });

     console.log("sali de ahi");

     window.location.href = `info.html#${empresa}`;

 }