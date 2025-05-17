const empresa = window.location.hash.substring(1); 

function cargarcategorias(elementos)
{
    document.getElementById("categorias-container").innerHTML ="";

    elementos.forEach(element =>
    {
     const scroll = document.createElement('div');

     scroll.classList.add('plato');

      scroll.innerHTML = `
     <h3>${element.name}</h3>
     <button onclick="eliminarcategoria(${element.id})">Eliminar</button>
     `;
      document.getElementById("categorias-container").appendChild(scroll);
    });
}

async function eliminarcategoria (id) 
{
  const answer = await borrar(id);

  if(answer)
  {
    obtenercategorias();
    
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

    const catempresa = `cat${empresa}`;

   const response = await fetch(`/delete/${catempresa}/${id}`);

   if (!response.ok)  throw new Error('no se pudo borrar el elemento');
  
   const data = await response.json();

   return data.valor;
  }
  catch (error) 
  {
    console.error('Hubo un problema con la solicitud:', error);
  }
}


function obtenercategorias()
{
    let catempresa = `cat${empresa}`;
    const data = fetch(`/${catempresa}`)
    .then(response => 
    {
        if(!response.ok) console.log("error en obtener las categorias");
        
        return response.json();
    }
    )
    .then(data => 
    {
        cargarcategorias(data);
    }
    )
}

function pressback()
{
  window.location.href = `bienvenido.html#${empresa}`; 
}

function press ()
{
    window.location.href=`formulariocategoria.html#${empresa}`;
}


window.onload = obtenercategorias;