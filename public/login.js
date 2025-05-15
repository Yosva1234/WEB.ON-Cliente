document.getElementById('login-form').addEventListener('submit', async function (event) {
  event.preventDefault(); 

  try {

    const username = getelement(document.getElementById('username').value);

    if (username === exist(username)) {
      window.location.href = `bienvenido.html#${username}`; 
    } else {
      alert("Usuario o contraseña incorrectos. Inténtalo de nuevo.");
    }
  } catch (error) {
    console.error('Error al obtener datos:', error);
    alert("Hubo un problema al verificar las credenciales.");
  }
});



async function getelement(element) {
  try {
    const response = await fetch('/encript');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.valor(element);
  } catch (error) {
    console.error('Hubo un problema con la solicitud:', error);
  }
}

async function exist(element) {
  try {
    const response = await fetch('/exist');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.valor(element);
  } catch (error) {
    console.error('Hubo un problema con la solicitud:', error);
  }
}