const searchCharactersContainer = document.getElementById(
  "search-characters-container"
);
const savedCharactersContainer = document.getElementById(
  "saved-characters-container"
);
const characterSearch = document.getElementById("character-search");
const mainContentContainer = document.getElementById("main-content");

let characters = [];
let savedCharacters = [];

fetch("https://rickandmortyapi.com/api/character")
  .then((response) => response.json())
  .then((data) => {
    characters = data.results;
  })
  .catch((error) => {
    console.log("Error fetching data", error);
  });

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

  const createDetail = (label, value) => {
    const detail = document.createElement("p");
    detail.className = "character-detail";
    detail.innerHTML = `${label}: <span class="attribute">${value}</span>`;
    return detail;
  };

  let button = document.createElement("button");
  button.innerText = "Add";
  button.className = "add-button button";
  button.addEventListener("click", () =>
    addCharacter(
      card,
      characterImage,
      characterName,
      characterStatus,
      characterSpecies
    )
  );

  card.appendChild(img);
  card.appendChild(createDetail("Name", characterName));
  card.appendChild(createDetail("Status", characterStatus));
  card.appendChild(createDetail("Species", characterSpecies));
  card.appendChild(button);

  return card;
};

const displayCharacters = (list, container) => {
  container.innerHTML = "";
  list.forEach((character) => {
    container.appendChild(
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
  let search = e.target.value.toLowerCase();

  let filteredCharacters = characters.filter(
    (character) =>
      character.name.toLowerCase().includes(search) &&
      !savedCharacters.includes(character.name)
  );

  if (search === "") {
    searchCharactersContainer.innerHTML = "";
  } else {
    if (filteredCharacters.length === 0) {
      searchCharactersContainer.innerHTML = `
        <p class="no-found">No characters found for the input ${search}</p>
      `;
    } else {
      displayCharacters(filteredCharacters, searchCharactersContainer);
      scrollToBottom();
    }
  }
});

const addCharacter = (card, image, name, status, species) => {
  if (!savedCharacters.includes(name)) {
    savedCharacters.push(name);

    let newCharacter = createCharacter(image, name, status, species);
    let deleteButton = newCharacter.querySelector("button");

    deleteButton.innerText = "Delete";
    deleteButton.addEventListener("click", () => {
      deleteCharacter(newCharacter, name);
    });
    deleteButton.classList.replace("add-button", "delete-button");

    savedCharactersContainer.appendChild(newCharacter);
    characterSearch.value = "";
    searchCharactersContainer.innerHTML = "";
  }
};

const deleteCharacter = (card, name) => {
  if (confirm("Do you want to delete this character?")) {
    savedCharacters = savedCharacters.filter((character) => character !== name);
    savedCharactersContainer.removeChild(card);
    searchCharactersContainer.innerHTML = "";
    characterSearch.value = "";
  }
};
