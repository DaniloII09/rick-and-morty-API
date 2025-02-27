const charactersContainer = document.getElementById("characters-container");
const characterSearch = document.getElementById("character-search");

let characters = [];

let isEditing = false;
let currentEditing = null;

const createCharacter = (
  characterImage,
  characterName,
  characterStatus,
  characterSpecies
) => {
  const card = document.createElement("div");
  card.className = "card";

  const img = document.createElement("img");
  img.src = characterImage;
  img.alt = characterName;
  img.className = "character-image";

  const nameDetail = document.createElement("p");
  nameDetail.className = "character-detail";
  nameDetail.innerText = "Name:";
  const name = document.createElement("span");
  name.className = "atribute";
  name.innerText = characterName;
  nameDetail.appendChild(name);

  const statusDetail = document.createElement("p");
  statusDetail.className = "character-detail";
  statusDetail.innerText = "Status:";
  const status = document.createElement("span");
  status.className = "atribute";
  status.innerText = characterStatus;
  statusDetail.appendChild(status);

  const speciesDetail = document.createElement("p");
  speciesDetail.className = "character-detail";
  speciesDetail.innerText = "Species:";
  const species = document.createElement("span");
  species.className = "atribute";
  species.innerText = characterSpecies;
  speciesDetail.appendChild(species);

  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.addEventListener("click", () => {
    console.log("Deleted item");
  });

  card.appendChild(img);
  card.appendChild(nameDetail);
  card.appendChild(statusDetail);
  card.appendChild(speciesDetail);
  card.appendChild(deleteBtn);

  return card;
};

fetch("https://rickandmortyapi.com/api/character")
  .then((response) => response.json())
  .then((data) => {
    characters = data.results;
    displayCharacters(characters);
  });

const displayCharacters = (characters) => {
  charactersContainer.innerHTML = "";
  characters.forEach((character) => {
    charactersContainer.appendChild(
      createCharacter(
        character.image,
        character.name,
        character.status,
        character.species
      )
    );
  });
};

characterSearch.addEventListener("input", (e) => {
  console.log("Typing:", e.target.value);
  let search = e.target.value.toLowerCase();

  let filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(search)
  );

  displayCharacters(filteredCharacters);
});

console.log(characterSearch);
