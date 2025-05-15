document.addEventListener('DOMContentLoaded', () => {
    const platosContainer = document.getElementById('platos-container');
    
    const empresa = window.location.hash.substring(1); 
    // Función para cargar las bebidas
    function cargarBebidas() {
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
    window.eliminarBebida = (id) => {
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
  });

 
    const boton = document.getElementById("add");

    function press()
    {
     const usernameinput = window.location.hash.substring(1); 
      window.location.href = `formulario.html#${usernamehashing}`; 
    }

boton.addEventListener('click', press);
  