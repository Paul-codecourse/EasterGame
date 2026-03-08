# Easter Browser Game Example – Catch the Eggs 🐣🎮

This is a **complete small Phaser 3 game**.

Gameplay:

* Eggs fall from the sky.
* Move a basket left/right to catch them.
* Catch eggs to gain points.
* Missing eggs reduces lives.
* Game ends when all lives are lost.

Features included:

* Score system
* Lives
* Increasing difficulty
* Restart key
* Simple physics

---

# 1. Project Structure

```
project/
  index.html
  main.js
  assets/
    egg.png
    basket.png
```

You can use **any simple egg and basket PNG images**.

---

# 2. index.html

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Catch the Eggs</title>
  <script src="https://cdn.jsdelivr.net/npm/phaser@3/dist/phaser.js"></script>
</head>

<body>

<script src="main.js"></script>

</body>
</html>
```

---

# 3. main.js (Complete Game)

```javascript
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: "#bde0fe",

  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  },

  scene: {
    preload,
    create,
    update
  }
};

const game = new Phaser.Game(config);

let basket;
let cursors;
let eggs;

let score = 0;
let lives = 3;

let scoreText;
let livesText;
let gameOverText;

let spawnDelay = 1000;
let spawnEvent;

function preload() {
  this.load.image("egg", "assets/egg.png");
  this.load.image("basket", "assets/basket.png");
}

function create() {

  basket = this.physics.add.image(400, 550, "basket");
  basket.setCollideWorldBounds(true);
  basket.setImmovable(true);

  cursors = this.input.keyboard.createCursorKeys();

  eggs = this.physics.add.group();

  scoreText = this.add.text(16, 16, "Score: 0", {
    fontSize: "28px",
    fill: "#000"
  });

  livesText = this.add.text(650, 16, "Lives: 3", {
    fontSize: "28px",
    fill: "#000"
  });

  gameOverText = this.add.text(250, 280, "", {
    fontSize: "48px",
    fill: "#ff0000"
  });

  spawnEvent = this.time.addEvent({
    delay: spawnDelay,
    callback: spawnEgg,
    callbackScope: this,
    loop: true
  });

  this.physics.add.overlap(basket, eggs, catchEgg, null, this);
}

function update() {

  basket.setVelocityX(0);

  if (cursors.left.isDown) {
    basket.setVelocityX(-350);
  }
  else if (cursors.right.isDown) {
    basket.setVelocityX(350);
  }

  eggs.getChildren().forEach((egg) => {

    if (egg.y > 600) {

      egg.destroy();
      loseLife.call(this);

    }

  });

}

function spawnEgg() {

  const x = Phaser.Math.Between(50, 750);

  const egg = eggs.create(x, 0, "egg");

  egg.setVelocityY(200);

}

function catchEgg(basket, egg) {

  egg.destroy();

  score += 10;

  scoreText.setText("Score: " + score);

  increaseDifficulty.call(this);

}

function loseLife() {

  lives--;

  livesText.setText("Lives: " + lives);

  if (lives <= 0) {
    endGame.call(this);
  }

}

function increaseDifficulty() {

  if (score % 50 === 0) {

    spawnDelay = Math.max(300, spawnDelay - 100);

    spawnEvent.remove();

    spawnEvent = this.time.addEvent({
      delay: spawnDelay,
      callback: spawnEgg,
      callbackScope: this,
      loop: true
    });

  }

}

function endGame() {

  this.physics.pause();

  gameOverText.setText("GAME OVER\nPress R to Restart");

  this.input.keyboard.once("keydown-R", () => {

    score = 0;
    lives = 3;
    spawnDelay = 1000;

    this.scene.restart();

  });

}
```

---

# 4. How to Run the Game

1. Create the folder structure shown above.
2. Add simple **egg.png** and **basket.png** images.
3. Open `index.html` with a local server.

Example quick server:

```
npx serve
```

or

```
python -m http.server
```

Then open:

```
http://localhost:3000
```

---

# 5. Easy Improvements

You can quickly enhance the game with:

## Golden Eggs

Worth extra points.

## Bad Eggs

Lose points if caught.

## Particle Effects

Egg splatter when missed.

## Sound Effects

* Catch sound
* Crack sound

## Mobile Controls

Add touch movement.

---

# 6. Possible Expansion Ideas

Turn this simple prototype into a larger game by adding:

* Multiple egg types
* Boss rounds (giant eggs)
* Online leaderboards
* Powerups
* Bunny skins

---

# Final Note

This project is intentionally **small and beginner-friendly**.

Total code: ~200–250 lines.

It’s a great starting point for building **seasonal browser games**.
