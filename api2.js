//Aqui ponemos a escuchar el evento submit del fomulario
    document.getElementById('form_nutricion').addEventListener('submit', async function (e) {
    e.preventDefault(); // evita que el formulario recargue la pagina al enviarse
    // guardamos en input el valor del ususario, eliminamos espacios al inicio
    // resultadoDiv es el contenedor para poner el resultado
    const input = document.getElementById('consulta_nutricional').value.trim();
    const resultadoDiv = document.getElementById('resultado-nutricional');
    // validamos que el ususario escriba algo, si esta vacio muestra un mensaje
    // y detiene la ejecución
    if (!input) {
        resultadoDiv.innerHTML = '<p>Por favor, escribe un plato o ingrediente.</p>';
        return;
    }
    // mostramos un mensaje mientras se hace la consulta a la api
    resultadoDiv.innerHTML = '<p>Analizando...</p>';
    // LLAMAMOS A LA APÍ
    // query=${encodeURIComponent(input) ESTO valida el texto por si hay espacios o tildes
    // con los headers enviamos la clave a la api
    try {
        const response = await fetch(`https://api.api-ninjas.com/v1/nutrition?query=${encodeURIComponent(input)}`, {
            headers: {
                'X-Api-Key': 'BGMgLPgQgBqiE9bOaiUhQQ==IcjT9zrorcC4a4xx' 
            }
        });
        // mostrar mensaje en caso que la respuesta sea error
        if (!response.ok) {
            throw new Error('Error al obtener datos');
        }
        // convierte la respuesta de formato jason a  un objeto en JavaScript
        const data = await response.json();
        // verifica si el array de resultados esta vacio, y muestra un mensaje
        if (data.length === 0) {
            resultadoDiv.innerHTML = '<p>No se encontró información nutricional para esa entrada.</p>';
            return;
        }
        // mostrar resultados en una cadena html con foreach
        let html = '<h3 class="text-center"><strong>Resultados Nutricionales:</strong></h3>';
        data.forEach(item => {
            html += `
                <div class="text-center">
                    <strong>${item.name}</strong><br>
                    Calorías: ${item.calories} kcal<br>
                    Proteína: ${item.protein_g} g<br>
                    Grasa: ${item.fat_total_g} g<br>
                    Carbohidratos: ${item.carbohydrates_total_g} g<br>
                    Azúcar: ${item.sugar_g} g<br>
                    Fibra: ${item.fiber_g} g<br>
                </div><hr>
            `;
        });
        // inserta el html generado dentro del div de resultados
        resultadoDiv.innerHTML = html;
        // MANEJO DE ERRORES muestra un error por problemas de conexion u otros
    } catch (error) {
        resultadoDiv.innerHTML = `<p>Ocurrió un error: ${error.message}</p>`;
        console.error(error);
    }
});