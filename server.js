const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());
app.use(express.static("public"));

let games = fs.existsSync("games.json")
  ? JSON.parse(fs.readFileSync("games.json"))
  : [];

// GET ALL GAMES
app.get("/api/games", (req, res) => {
  res.json(games);
});

// ADD GAME (PRIVATE)
app.post("/api/add-secret-999", (req, res) => {
  const { name, image, desc, link, category, trailer } = req.body;

  const game = {
    id: Date.now(),
    name,
    image,
    desc,
    link,
    category,
    trailer,
    rating: 0,
    votes: 0,
    downloads: 0
  };

  games.push(game);
  fs.writeFileSync("games.json", JSON.stringify(games));

  res.json({ msg: "Game added" });
});

// RATE GAME
app.post("/api/rate/:id", (req, res) => {
  const game = games.find(g => g.id == req.params.id);
  if (!game) return res.send("Not found");

  const { rating } = req.body;
  game.votes++;
  game.rating = ((game.rating * (game.votes - 1)) + rating) / game.votes;

  fs.writeFileSync("games.json", JSON.stringify(games));
  res.json(game);
});

app.listen(3000, () => console.log("🔥 Server running"));