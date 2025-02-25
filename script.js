const charactersContainer = document.getElementById("characters-container");

fetch("https://rickandmortyapi.com/api/character")
  .then((response) => response.json())
  .then((data) => {
    data.results.forEach((character) => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <img 
          src=${character.image}
          alt=${character.name}
          class="character-image">
        <p class="character-detail">
          Name: <span class="atribute">${character.name}</span>
        </p>
        <p class="character-detail">
          Status: <span class="atribute">${character.status}</span>
        </p>
        <p class="character-detail">
          Species: <span class="atribute">${character.species}</span>
        </p>
      `

      charactersContainer.appendChild(card);
    });
  })