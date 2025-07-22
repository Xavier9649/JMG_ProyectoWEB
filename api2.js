// Esperamos a que el DOM esté completamente cargado antes de ejecutar lógica
window.addEventListener("DOMContentLoaded", () => {
  // Capturamos el formulario y el contenedor de resultados
  const formulario = document.getElementById("form_ingredientes");
  const resultado = document.getElementById("resultado_recetas");

  // Evento al enviar el formulario
  formulario.addEventListener("submit", async (e) => {
    e.preventDefault(); // Evita recargar la página

    const ingrediente = document.getElementById("ingredientes").value.trim(); // Obtiene el texto del input
    if (!ingrediente) return; // Sale si el campo está vacío

    //1. Buscar receta principal usando el ingrediente ingresado
    const urlPrincipal = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediente}`;
    try {
      const res = await fetch(urlPrincipal); // Petición a la API
      const datos = await res.json();        // Convertimos la respuesta en JSON
      const recetas = datos.meals;           // Extraemos el array de recetas

      // Mostramos la primera receta relevante si hay resultados
      resultado.innerHTML = recetas
        ? `<h3>Receta principal:</h3>` + await mostrarDetalles(recetas[0].idMeal)
        : "<p>No se encontraron recetas.</p>";

      // 2. Buscar una receta adicional aleatoria como sugerencia
      const resSugerencia = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
      const sugerencia = await resSugerencia.json(); // Convertimos respuesta en JSON
      resultado.innerHTML += `<h3>⭐ Sugerencia adicional:</h3>` + await mostrarDetalles(sugerencia.meals[0].idMeal);
    } catch (err) {
      console.error("Error:", err); // Imprime error si falla la conexión
      resultado.innerHTML = "<p>Error al conectar con la API.</p>";
    }
  });
});

async function mostrarDetalles(id) {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`; // Endpoint para obtener detalles
  try {
    const res = await fetch(url);        // Petición a la API
    const datos = await res.json();      // Convertimos en JSON
    const receta = datos.meals[0];       // Extraemos objeto de receta

    // Construimos lista de ingredientes y medidas
    let ingredientes = "";
    for (let i = 1; i <= 20; i++) {
      const ing = receta[`strIngredient${i}`];
      const cant = receta[`strMeasure${i}`];
      if (ing && ing.trim()) {
        ingredientes += `<li>${ing} - ${cant}</li>`;
      }
    }

    // Construimos el HTML con imagen, ingredientes e instrucciones
    return `
      <div class="tarjeta-receta">
        <h4>${receta.strMeal}</h4>
        <img src="${receta.strMealThumb}" alt="${receta.strMeal}" width="250">
        <h5>Ingredientes:</h5>
        <ul>${ingredientes}</ul>
        <h5>Preparación:</h5>
        <p>${receta.strInstructions}</p>
      </div>
    `;
  } catch (err) {
    console.error("Error al obtener detalles:", err); // En caso de error
    return "<p>No se pudo cargar la receta.</p>";
  }
}



