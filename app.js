async function loadGames() {
  const res = await fetch("/api/games");
  let games = await res.json();

  const search = document.getElementById("search").value.toLowerCase();
  const category = document.getElementById("category").value;

  games = games.filter(g =>
    g.name.toLowerCase().includes(search) &&
    (!category || g.category === category)
  );

  document.getElementById("games").innerHTML = games.map(g => `
    <div class="card">
      <img src="${g.image}" width="100%">
      <h3>${g.name}</h3>
      <p>${g.category}</p>
      ⭐ ${g.rating.toFixed(1)}
      <br>
      <button onclick="openGame(${g.id})">View</button>
    </div>
  `).join("");
}

function openGame(id){
  window.location = "/game.html?id=" + id;
}

loadGames();