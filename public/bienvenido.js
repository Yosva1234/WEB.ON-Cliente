    const empresa = window.location.hash.substring(1); 
    const platosContainer = document.getElementById('platos-container');
    

    console.log(empresa);

    // Función para cargar las bebidas
    function cargarBebidas() {
      if(!empresa || empresa === 'favicon.ico') return;
      fetch(`/${empresa}`) // Hacer una solicitud GET a la ruta /bebidas
        .then((response) => response.json())
        .then((data) => {
          platosContainer.innerHTML = ''; // Limpiar el contenedor
          data.forEach((productos) => {
            const platoElement = document.createElement('div');
            platoElement.classList.add('plato');
            platoElement.innerHTML = `
              <h3>${productos.nombre}</h3>
              <button onclick="eliminarBebida(${productos.id})">Eliminar</button>
            `;
            platosContainer.appendChild(platoElement);
          });
        })
        .catch((error) => console.error('Error al cargar las bebidas:', error));
    }
  
     // Función para eliminar una bebida
    function eliminarBebida (id) {
      if(!empresa || empresa === 'favicon.ico') return;
      fetch(`/${empresa}/${id}`, {
        method: 'DELETE', // Enviar una solicitud DELETE
      })
        .then((response) => response.json())
        .then(() => {
          cargarBebidas(); // Recargar las bebidas después de eliminar
        })
        .catch((error) => console.error('Error al eliminar la bebida:', error));
    };
  
    cargarBebidas();
  

    function press()
    {
     const usernameinput = window.location.hash.substring(1); 
      window.location.href = `formulario.html#${usernameinput}`; 
    }

     window.onload = cargarBebidas;
  