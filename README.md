#  Verde y Vital

**Verde y Vital** es una plataforma web educativa dedicada a promover la alimentación saludable a través de tecnología accesible. Ofrece herramientas interactivas como recetas personalizadas, cálculo de Índice de Masa Corporal (IMC) y análisis nutricional de alimentos.

---

## Propósito

Este proyecto busca empoderar al usuario con información clara, práctica y personalizada sobre su bienestar alimenticio. ¿Qué tienes en tu nevera? ¿Qué significa tu IMC? ¿Qué hay realmente en ese plato? Verde y Vital lo responde.

---

##  Tecnologías utilizadas

- HTML5 estructurado y comentado
- Tailwind CSS para estilización rápida y responsive
- JavaScript moderno con `async/await`
- Consumo de **APIs externas** para análisis dinámico
- GitHub para control de versiones y colaboración

---

##  Funcionalidades principales

###  Calculadora de IMC
Consulta tu Índice de Masa Corporal y recibe un mensaje interpretativo según tus valores.

**API utilizada:** lógica propia en JavaScript  
**Ubicación:** Sección `#Calculadora_imc` en `index.html`

---

### Recetas según ingredientes
Ingresa un ingrediente y descubre recetas saludables relacionadas.

**API utilizada:** [Edamam Recipe API]  
**Método:** `fetch()` con parámetros dinámicos  
**Ubicación:** Sección `#Busqueda_recetas`

---

###  Análisis nutricional
Obtén el valor nutricional de cualquier plato escrito (calorías, proteínas, grasas, azúcares, sodio, etc.).

**API utilizada:** [Nutrition API de Ninja]  
**Requiere clave:** `"X-Api-Key"`  
**Ubicación:** Sección `#analisis_nutricional`

---


