const appId  = 'ff55bd78'; // con comillas
const apiKey = 'b9c26763dd3a461121efc8fee973faa3';

const analyzeBtn = document.getElementById('analizarBtn');
const comidaInput = document.getElementById('comidaInput');
const resultadosDiv = document.getElementById('resultados');

analyzeBtn.addEventListener('click', () => {
  const comidaTexto = comidaInput.value;
  if (!comidaTexto.trim()) return;

  console.log('Botón presionado');

  fetch('https://trackapi.nutritionix.com/v2/natural/nutrients', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-app-id': appId,
      'x-app-key': apiKey
    },
    body: JSON.stringify({ query: comidaTexto })
  })
  .then(res => res.json())
  .then(data => {
    mostrarResultados(data);
    localStorage.setItem('ultimaComida', comidaTexto);
  })
  .catch(err => {
    resultadosDiv.innerHTML = '<p>Error al obtener datos. Intenta nuevamente.</p>';
    console.error(err);
  });
});

function mostrarResultados(data) {
  resultadosDiv.innerHTML = '';
  data.foods.forEach(item => {
    const tarjeta = `
      <div>
        <h3>${item.food_name}</h3>
        <p>Calorías: ${item.nf_calories}</p>
        <p>Proteínas: ${item.nf_protein}g</p>
        <p>Grasas: ${item.nf_total_fat}g</p>
        <p>Azúcar: ${item.nf_sugars}g</p>
      </div>
      <hr>
    `;
    resultadosDiv.innerHTML += tarjeta;
  });
}