document.getElementById('login-form').addEventListener('submit', async function (event) 
{
 event.preventDefault(); 

 try 
 {
   const usernameinput = document.getElementById('username').value;

   const usernamehashing = await(getelement(usernameinput));

   const existe = await(exist(usernamehashing));

   if (existe)  window.location.href = `bienvenido.html#${usernamehashing}`; 

   else   alert("Usuario o contraseña incorrectos. Inténtalo de nuevo.");

  } 
 catch (error) 
 {
   console.error('Error al obtener datos:', error);

   alert("Hubo un problema al verificar las credenciales.");
 }
});



async function getelement(element) 
{
 try 
 {
   const response = await fetch(`/encript/${element}`);

   if (!response.ok)  throw new Error('Network response was not ok');
  
   const data = await response.json();

   return data.valor;
  }
  catch (error) 
  {
    console.error('Hubo un problema con la solicitud:', error);
  }
}

async function exist(element)
{
 try
 {
    const response = await fetch(`/exist/${element}`);

    if (!response.ok) throw new Error('Network response was not ok');

    const data = await response.json();
    
    return data.valor;
  } 
  catch (error)
  {
   console.error('Hubo un problema con la solicitud:', error);
  }
}