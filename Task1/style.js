// Load recipes from localStorage or start with empty array
let recipes = JSON.parse(localStorage.getItem('recipes')) || [];
let editIndex = null;

// Add or update a recipe
function addRecipe() {
  const title = document.getElementById('title').value.trim();
  const image = document.getElementById('image').value.trim();
  const ingredients = document.getElementById('ingredients').value
    .split(',')
    .map(i => i.trim())
    .filter(i => i);
  const steps = document.getElementById('steps').value.trim();

  if (!title) {
    alert("Please enter a recipe title!");
    return;
  }

  const recipe = { title, image, ingredients, steps };

  if (editIndex !== null) {
    recipes[editIndex] = recipe;
    editIndex = null;
  } else {
    recipes.push(recipe);
  }

  saveRecipes();
  displayRecipes();
  clearForm();
}

// Show all recipes
function displayRecipes() {
  const container = document.getElementById('recipes');
  container.innerHTML = '';
  recipes.forEach((r, i) => {
    const card = document.createElement('div');
    card.className = 'recipe-card';
    card.innerHTML = `
      <img src="${r.image || 'https://via.placeholder.com/400x200?text=No+Image'}" alt="${r.title}">
      <div class="recipe-content">
        <h3>${r.title}</h3>
        <ul class="ingredients">
          ${r.ingredients.map(ing => `<li>${ing}</li>`).join('')}
        </ul>
        <p><strong>📝</strong> ${r.steps}</p>
        <button class="edit-btn" onclick="editRecipe(${i})">Edit</button>
        <button class="delete-btn" onclick="deleteRecipe(${i})">Delete</button>
      </div>
    `;
    container.appendChild(card);
  });
}

// Edit a recipe
function editRecipe(index) {
  const r = recipes[index];
  document.getElementById('title').value = r.title;
  document.getElementById('image').value = r.image;
  document.getElementById('ingredients').value = r.ingredients.join(', ');
  document.getElementById('steps').value = r.steps;
  editIndex = index;
}

// Delete a recipe
function deleteRecipe(index) {
  recipes.splice(index, 1);
  saveRecipes();
  displayRecipes();
}

// Clear form inputs
function clearForm() {
  document.getElementById('title').value = '';
  document.getElementById('image').value = '';
  document.getElementById('ingredients').value = '';
  document.getElementById('steps').value = '';
}

// Save recipes to localStorage
function saveRecipes() {
  localStorage.setItem('recipes', JSON.stringify(recipes));
}

// Display recipes on page load
displayRecipes();
