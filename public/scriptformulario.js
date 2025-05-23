
  const empresa = window.location.hash.substring(1); 

document.getElementById('uploadForm').addEventListener('submit', async (e) => {
  e.preventDefault();



  // Mostrar el spinner
  document.getElementById('loading').style.display = 'block';
  const nombre = document.getElementById('nombre').value;
  const precio = document.getElementById('preciocup').value;
  const info = document.getElementById('info').value;
  const fileInput = document.getElementById('imageInput');
  const categoria = document.getElementById('categoria').value;
  const file = fileInput.files[0];

  if (!nombre  || !precio  || !info || !file || !categoria) {
      alert('Por favor, completa todos los campos.');
      document.getElementById('loading').style.display = 'none'; // Ocultar spinner si hay error
      return;
  } 

  const formData = new FormData();
  formData.append('image', file);

  try {
      


      const imgbbResponse = await fetch('https://api.imgbb.com/1/upload?key=95d0cb31085b82cc5bb9a74c7eaaa790', {
          method: 'POST',
          body: formData,
      });

      console.log("ya subio la foto");

      const imgbbData = await imgbbResponse.json();
      if (!imgbbData.success) {
          throw new Error('Error al subir la imagen.');
      }

      const imageUrl = imgbbData.data.url;

      // Enviar los datos del producto al backend
      const producto = {
          nombre,
          precio: parseFloat(precio),
          info,
          imagen: imageUrl,
          categoria,
      };

      console.log("antes de pushear");

      const answer = await fetch(`/push/${empresa}`, {
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
          window.location.href =`bienvenido.html#${empresa}`;
          document.getElementById('loading').style.display = 'none';
      }
    }}
    catch
    {
       console.log('error:', saveData);
       document.getElementById('loading').style.display = 'none';
       console.log("perro errorsazo guardando el producto");
    }
 
});

let categorias;


function crearcategorias()
{
     document.getElementById("categoria").innerHTML="";

    categorias.forEach(element => {
        
        const scrool = `
          <option value="${element.name}">${element.name}</option>
        `;
         document.getElementById("categoria").insertAdjacentHTML('beforeend', scrool);
    });

}

 function obtenercategorias()
  {
    const hashValue = empresa;

    const aux = 'cat'+hashValue;

    console.log(aux)

    fetch(`/${aux}`) 
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }
        return response.json();
      })
      .then(data => {
        categorias = data;
        crearcategorias();
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Hubo un error al cargar los datos de las bebidas');
      });
  }

  window.onload = obtenercategorias;