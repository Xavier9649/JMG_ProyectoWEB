// Escucha el evento 'submit' del formulario IMC al hacer clic en "Calcular IMC"
document.getElementById('form_imc').addEventListener('submit', async function (e) {
  e.preventDefault(); // Evita que el formulario recargue la página

  // Captura y limpia los valores ingresados por el usuario
  const peso = document.getElementById('Peso').value.trim();
  const altura = document.getElementById('altura').value.trim();

  // Referencias a los contenedores donde mostraremos los resultados
  const resultado = document.getElementById('resultado_imc');
  const mensaje = document.getElementById('Mensaje_imc');

  // Validación: si no hay peso o altura, se muestra un aviso
  if (!peso || !altura) {
    resultado.innerHTML = '<p>Por favor, ingresa peso y altura.</p>';
    return; // Sale de la función
  }

  // Mensaje temporal mientras se procesa la solicitud
  resultado.innerHTML = '<p>Calculando IMC...</p>';
  mensaje.innerHTML = ''; // Limpiamos recomendaciones anteriores

  try {
    // 📡 Petición GET a la API BMI de APIVerve usando peso, altura y unidad métrica
    const response = await fetch(`https://api.apiverve.com/v1/bmicalculator?weight=${peso}&height=${altura}&unit=metric`, {
      headers: {
        'x-api-key': '5b3ba1f8-75c4-4249-b5a2-32418bbbc7ca' // Clave de autenticación para acceder a la API
      }
    });

    // Verificamos si la respuesta es correcta (código 200). Si no, lanzamos error manual.
    if (!response.ok) throw new Error('Error al obtener datos');

    // Convertimos la respuesta en JSON
    const data = await response.json();

    // Extraemos el objeto 'data' que contiene los resultados del IMC
    const info = data.data;

    //Mostramos los resultados en el DOM:
    // - IMC calculado con dos decimales
    // - Estado de salud (riesgo)
    // - Descripción general del resultado
    resultado.innerHTML = `
      <h3>Tu IMC: ${info.bmi.toFixed(2)}</h3>
      <p><strong>Estado:</strong> ${info.risk}</p>
      <p><strong>Resumen:</strong> ${info.summary}</p>
    `;

    // 💡 Recomendación personalizada basada en el rango de IMC
    mensaje.innerHTML = `<p><strong>Recomendación:</strong> ${info.recommendation}</p>`;
  } catch (error) {
    // Muestra mensaje en caso de error y lo imprime en la consola
    resultado.innerHTML = `<p>Ocurrió un error: ${error.message}</p>`;
    console.error(error);
  }
});

