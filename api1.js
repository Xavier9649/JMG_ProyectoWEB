// Añadimos el evento 'submit' del formulario IMC al hacer clic en "Calcular IMC"
document.getElementById('form_imc').addEventListener('submit', async (e) => { // La variable e representa el evento del formulario
  //Con addEventListener async, podemos usar 'await' dentro de la función, esto permite esperar respuestas de la API sin bloquear el hilo principal
  e.preventDefault(); // Evita que el formulario recargue la página

  //Capturamos los valores de peso y altura
  const peso = document.getElementById('Peso').value.trim();
  const altura = document.getElementById('altura').value.trim();
  // Eliminamos los posibles espacios de lo escrito con trim()

  //Capturamos los contenedores en donde se mostrán las respuestas
  const resultado = document.getElementById('resultado_imc'); // Datos del IMC
  const mensaje = document.getElementById('Mensaje_imc'); // Mensaje de recomendación

 //Usamos un condicional para imprimir mensajes en el DOM segun sea la situación
  if (!peso || !altura) {
    resultado.innerHTML = '<p>Ingrese su peso y altura</p>'
    mensaje.innerHTML = '';
    return; // Salimos de la función
  } else {
    resultado.innerHTML = '<p>Calculando IMC...</p>'
    mensaje.innerHTML = '';
  }

  try {
    //Peticion a la API con los datos recogidos de los espacios de altura y peso
    const respuestaApi = await fetch (`https://api.apiverve.com/v1/bmicalculator?weight=${peso}&height=${altura}&unit=metric`, {
            headers: {'x-api-key': '5b3ba1f8-75c4-4249-b5a2-32418bbbc7ca'

            }
    });

    // Verificamos si la respuesta es correcta.
    if (!respuestaApi.ok) throw new Error('Error al obtener datos');
    //response.ok es un booleano que devuelve true si la respuesta HTTP fue exitosa
    // Si no es exitosa, lanzamos un error para manejarlo en el catch
    
    //Conversion de la respuesta recibida de la Api a objeto JavaScript desde JSON
    //Conversion de la respuestas Json a objeto JS
    const data = await respuestaApi.json();
    
    // Extraemos las propiedades del objeto que contiene los resultados del IMC
    const info = data.data;

    // Mostramos los resultados en el DOM: IMC, Estado, y mas

    resultado.innerHTML = `
      <h3><strong>Tu IMC:</strong> ${info.bmi.toFixed(2)}</h3>
      <p><strong>Estado:</strong> ${info.risk}</p>
      <p><strong>Resumen:</strong> ${info.summary}</p>
    `;
    //Mostramos la recomendación personalizada basada en el rango de IMC
    mensaje.innerHTML = `<p><strong>Información:</strong> ${info.recommendation}</p>`;

  } catch (error) {
    // Mostramos un mensaje en caso de error y lo imprimimos en la consola
    resultado.innerHTML = `<p>${error.message}</p>`;
    console.error(error);
  }
});

