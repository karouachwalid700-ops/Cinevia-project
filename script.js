const films = [
  {
    image: "images/The walking dead.jpg",
    category: "Horror",
    titre: "THE WALKING DEAD",
    description: "Un groupe de survivants tente de rester en vie dans un monde détruit par une épidémie de zombies. Ils doivent affronter non seulement les morts-vivants, mais aussi d'autres humains dangereux."
  },
  {
    image: "images/Scarface.jpg",
    category: "Drama",
    titre: "SCARFACE",
    description: "Un immigré ambitieux grimpe rapidement dans le monde du trafic de drogue. Mais son pouvoir, son orgueil et ses choix dangereux vont finir par détruire tout ce qu'il a construit."
  },
  {
    image: "images/John wick.jpg",
    category: "Action",
    titre: "JOHN WICK",
    description: "Un ancien tueur à gages reprend son ancienne vie après une perte tragique. Il se lance dans une mission de vengeance violente contre ceux qui ont tout détruit."
  },
  {
    image: "images/STRANGER THINGS.jpg",
    category: "Horror",
    titre: "STRANGER THINGS",
    description: "Dans une petite ville, des enfants enquêtent sur la disparition de leur ami. Ils découvrent des expériences secrètes et un monde parallèle rempli de dangers."
  },
  {
    image: "images/Terrifier.jpg",
    category: "Horror",
    titre: "Terrifier",
    description: "Un clown psychopathe terrorise ses victimes pendant la nuit d'Halloween. Le film est connu pour son ambiance sombre et ses scènes très violentes."
  },
  {
    image: "images/Mr Robot.jpg",
    category: "Drama",
    titre: "MR ROBOT",
    description: "Un hacker brillant mais instable est recruté par un groupe mystérieux. Ensemble, ils veulent détruire les grandes entreprises et changer le système."
  },
  {
    image: "images/Avatar.jpg",
    category: "Action",
    titre: "AVATAR",
    description: "Un soldat est envoyé sur une planète inconnue et découvre un peuple unique. Il va devoir choisir entre sa mission et la protection de ce nouveau monde."
  },
  {
    image: "images/PEAKY BLINDERS.jpg",
    category: "Drama",
    titre: "PEAKY BLINDERS",
    description: "Après la guerre, un chef de gang intelligent développe son empire criminel. Il doit faire face à la police, aux ennemis et aux conflits politiques."
  },
  {
    image: "images/From.jpg",
    category: "Horror",
    titre: "FROM",
    description: "Des voyageurs se retrouvent coincés dans une ville étrange dont personne ne peut sortir. La nuit, des créatures mystérieuses apparaissent et rendent la survie encore plus difficile."
  },
  {
    image: "images/dexter.jpg",
    category: "Drama",
    titre: "DEXTER",
    description: "Un expert en analyse de sang mène une double vie secrète. Il traque et tue les criminels pour satisfaire ses instincts tout en gardant une apparence normale."
  },
  {
    image: "images/Fast And Furious.jpg",
    category: "Action",
    titre: "FAST & FURIOUS",
    description: "Un groupe de pilotes talentueux réalise des missions dangereuses mêlant vitesse, braquages et action. La famille et la loyauté sont au cœur de leur aventure."
  },
  {
    image: "images/The Matrix.jpg",
    category: "Action",
    titre: "THE MATRIX",
    description: "Un homme découvre que le monde dans lequel il vit est une illusion contrôlée. Il rejoint une rébellion pour libérer l'humanité de cette réalité artificielle."
  },
];

const container = document.getElementById("content-countainer");

function createCard(film) {
  return `
    <div class="card" data-category="${film.category}" data-title="${film.titre}">
      <img src="${film.image}" onclick="openModal('${film.titre}')">
      <p>${film.category}</p>
      <h3>${film.titre}</h3>
      <button class="btn-details" onclick="openModal('${film.titre}')">
        Voir détails
      </button>
    </div>
  `;
}

films.forEach(film => {
  container.innerHTML += createCard(film);
});

let currentFilm = null;
let favoris = [];

function openModal(titre) {
  const film = films.find(f => f.titre === titre);
  currentFilm = film.titre;

  document.getElementById("modal-img").src = film.image;
  document.getElementById("modal-title").textContent = film.titre;
  document.getElementById("modal-cat").textContent = "Genre : " + film.category;
  document.getElementById("modal-desc").textContent = film.description;

  const favBtn = document.getElementById("favBtn");
  favBtn.textContent = favoris.includes(currentFilm)
    ? "Retirer des Favoris"
    : "Ajoutez aux Favoris";

  document.getElementById("modal").style.display = "flex";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

function toggleFav() {
  if (!currentFilm) return;

  if (favoris.includes(currentFilm)) {
    favoris = favoris.filter(f => f !== currentFilm);
  } else {
    favoris.push(currentFilm);
  }

  displayFavoris();
  openModal(currentFilm);
}

function displayFavoris() {
  const favContainer = document.getElementById("fav-container");
  favContainer.innerHTML = "";

  favoris.forEach(titre => {
    const film = films.find(f => f.titre === titre);
    favContainer.innerHTML += `
      <div class="card-fav">
        <img src="${film.image}" onclick="openModal('${film.titre}')">
        <p>${film.category}</p>
        <h3>${film.titre}</h3>
        <button class="btn-remove" onclick="removeFav('${film.titre}')">
          Supprimer
        </button>
      </div>
    `;
  });
}

function removeFav(titre) {
  favoris = favoris.filter(f => f !== titre);
  displayFavoris();
}

const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", function () {
  const value = this.value.toLowerCase();
  const cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    const title = card.dataset.title.toLowerCase();
    card.style.display = title.includes(value) ? "block" : "none";
  });
});

const buttons = document.querySelectorAll(".buttons");

buttons.forEach(btn => {
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    const category = this.getAttribute("data-category");
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
      card.style.display =
        category === "Tous" || card.dataset.category === category
          ? "block"
          : "none";
    });
  });
});