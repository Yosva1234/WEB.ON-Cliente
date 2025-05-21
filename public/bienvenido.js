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
  const answer = await borrar(id);

  if(answer)
  {
    obtenerproductos();
    
    console.log("si se cargaron jejejejjeje ");
  }
  else 
  {
    console.log("no se pudieron cargar");
  }

};



async function borrar(id) 
{
 try 
 {
   const response = await fetch(`/delete/${empresa}/${id}`);

   if (!response.ok)  throw new Error('no se pudo borrar el elemento');
  
   const data = await response.json();

   return data.valor;
  }
  catch (error) 
  {
    console.error('Hubo un problema con la solicitud:', error);
  }
}


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

function pressinfo()
{
  const usernameinput = window.location.hash.substring(1); 

  window.location.href = `info.html#${usernameinput}`; 
}

function nombreempresa()
{
  document.getElementById("empresa").innerHTML = "";

  scroll = `
  <h1> ${empresa.toUpperCase()} </h1>
  `;

   document.getElementById("empresa").insertAdjacentHTML('beforeend', scroll);

  obtenerproductos();
}

window.onload = nombreempresa;

  