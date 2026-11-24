const input = document.getElementById("recipe-id");
const getBtn = document.getElementById("get-btn");
const getStatus = document.getElementById("status");
const recipeArea = document.getElementById("recipe");

async function getRecipe() {
  recipeArea.textContent = "";

  const response = await fetch(`https://dummyjson.com/recipes/${input.value}`);
  const recipe = await response.json();
  console.log(recipe);

  //23,50,75,100 bootstrap
  const card = document.createElement("div");
  card.className = "card p-3 mb-5 w-75";

  const title = document.createElement("h2");
  title.textContent = recipe.name;
  card.appendChild(title);

  const cuisine = document.createElement("p");
  cuisine.textContent = `Cuisine: ${recipe.cuisine}`;
  card.appendChild(cuisine);
  const prep = document.createElement("p");
  prep.textContent = `Prep time: ${recipe.prepTimeMinutes} minutes`;
  card.appendChild(prep);

  const img = document.createElement("img");
  img.src = recipe.image;
  img.alt = recipe.name;
  img.className = "rounded-2";
  card.prepend(img);

  recipeArea.appendChild(card);

  input.value = "";
}

getBtn.addEventListener("click", getRecipe);

// Getting the POST elements (Day idk )
const dishInput = document.getElementById("dish-name");
const postButton = document.getElementById("post-btn");
const postStatus = document.getElementById("post-status");
const savedArea = document.getElementById("saved");

//the function and clearing out the old message

async function addDish() {
  savedArea.textContent = "";

  const response = await fetch("https://dummyjson.com/recipes/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: dishInput.value }),
  });

  //
  const newDish = await response.json();
  console.log(newDish);

  //Getting it to show on the page
  const message = document.createElement("p");
  message.className = "alert alert-success";
  message.textContent =
    `Added "` +
    newDish.name +
    `" as recipe #` +
    newDish.id +
    " (practice server: not actually saved)";

  savedArea.appendChild(message);

  //
  dishInput.value = "";
}

// Under the function not inside

postButton.addEventListener("click", addDish);
