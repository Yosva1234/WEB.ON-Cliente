const empresa = window.location.hash.substring(1); // nombre de la empresa 

const platosContainer = document.getElementById('platos-container'); // contenedor del html donde pondremos los elementos
    

// funcion llamada para agregar al platos container todos los elementos html  
function mostrar(elementos)
{
  platosContainer.innerHTML = ''; 

  elementos.forEach((productos) => 
  {
   const platoElement = document.createElement('div');

   platoElement.classList.add('plato');

   platoElement.innerHTML = `
   <h3>${productos.nombre}</h3>
   <button onclick="eliminarBebida(${productos.id})">Eliminar</button>
   `;
   
   platosContainer.appendChild(platoElement);
  });
}
  
// funcion donde le pasas el id del elemento que quieres eliminar y hace la peticion al servidor para eliminarla
async function eliminarBebida (id) 
{
 await fetch(`/${empresa}/${id}`, {method: 'DELETE', })

 .then((response) => response.json())
 
  obtenerproductos();  console.log("yeeeees") 

 .catch((error) => console.error('Error al eliminar la bebida:', error));
};

// funcion para hacer la peticion al servidor para que devuelva la tabla de productos 
async function obtenerproductos() 
{
  await fetch(`/${empresa}`) 

 .then(response => 
 {
   if (!response.ok) throw new Error('Error al obtener los datos');    

   return response.json();
  })
 .then(data => { mostrar(data);  }) // llamo a mostrar y le paso la tabla de productos que devolvio el servidor 

 .catch(error => 
  {
   console.error('Error:', error);

   alert('Hubo un error al cargar los datos de las bebidas');
  });
}

// funcion de boton de agregar producto que te manda a la pagina del formulario 
function press()
{
 const usernameinput = window.location.hash.substring(1); 

 window.location.href = `formulario.html#${usernameinput}`; 
}

window.onload = obtenerproductos;

  