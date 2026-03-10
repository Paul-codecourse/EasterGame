# Phaser.js Easter Game Starter Snippets 🐣🎮

This document contains **small Phaser.js examples** you can reuse when building Easter-themed browser games.

Examples include:

* Basic Phaser game setup
* Player movement
* Falling eggs
* Collision detection
* Scoring system
* Restarting the game

These snippets assume **Phaser 3**.

---

# 1. Basic Phaser Game Setup

```javascript
import Phaser from "phaser";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: "#87CEEB",
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

function preload() {
  this.load.image("egg", "assets/egg.png");
  this.load.image("basket", "assets/basket.png");
}

function create() {
}

function update() {
}
```

---

# 2. Player Basket Movement

```javascript
let basket;
let cursors;

function create() {
  basket = this.physics.add.image(400, 550, "basket");
  basket.setCollideWorldBounds(true);

  cursors = this.input.keyboard.createCursorKeys();
}

function update() {
  basket.setVelocityX(0);

  if (cursors.left.isDown) {
    basket.setVelocityX(-300);
  } else if (cursors.right.isDown) {
    basket.setVelocityX(300);
  }
}
```

---

# 3. Spawning Falling Eggs

```javascript
let eggs;

function create() {
  eggs = this.physics.add.group();

  this.time.addEvent({
    delay: 1000,
    callback: spawnEgg,
    callbackScope: this,
    loop: true
  });
}

function spawnEgg() {
  const x = Phaser.Math.Between(50, 750);
  const egg = eggs.create(x, 0, "egg");

  egg.setVelocityY(200);
}
```

---

# 4. Catching Eggs (Collision)

```javascript
this.physics.add.overlap(basket, eggs, catchEgg, null, this);

function catchEgg(basket, egg) {
  egg.destroy();
  score += 10;
  scoreText.setText("Score: " + score);
}
```

---

# 5. Simple Score System

```javascript
let score = 0;
let scoreText;

function create() {
  scoreText = this.add.text(16, 16, "Score: 0", {
    fontSize: "32px",
    fill: "#000"
  });
}
```

---

# 6. Game Over Condition

Example: if an egg hits the ground.

```javascript
function update() {
  eggs.getChildren().forEach((egg) => {
    if (egg.y > 600) {
      gameOver();
    }
  });
}

function gameOver() {
  this.scene.pause();

  this.add.text(300, 300, "Game Over", {
    fontSize: "48px",
    fill: "#ff0000"
  });
}
```

---

# 7. Restarting the Game

```javascript
this.input.keyboard.on("keydown-R", () => {
  score = 0;
  this.scene.restart();
});
```

---

# 8. Particle Effect When Egg Breaks

```javascript
const particles = this.add.particles("egg");

particles.createEmitter({
  x: egg.x,
  y: egg.y,
  speed: { min: -200, max: 200 },
  scale: { start: 0.5, end: 0 },
  lifespan: 500,
  quantity: 10
});
```

---

# 9. Increasing Difficulty Over Time

```javascript
let spawnDelay = 1000;

this.time.addEvent({
  delay: spawnDelay,
  callback: spawnEgg,
  callbackScope: this,
  loop: true
});

this.time.addEvent({
  delay: 5000,
  callback: () => {
    spawnDelay = Math.max(300, spawnDelay - 100);
  },
  loop: true
});
```

---

# 10. Basic Game Loop

Typical structure for a simple browser game:

1. Preload assets
2. Create player and objects
3. Spawn eggs/enemies
4. Handle collisions
5. Update score
6. Trigger game over
7. Allow restart

---

# Suggested Folder Structure

```
project/
  index.html
  main.js
  assets/
    egg.png
    basket.png
```

---

# Simple Starter Idea

Using the snippets above you can build **Catch the Eggs**:

Gameplay:

* Eggs fall from the sky
* Player moves basket
* Catch eggs for points
* Missing eggs ends the game

This can be implemented in **~150–250 lines of code**.

---

# Optional Improvements

After the prototype works, consider adding:

* Sound effects
* Animated sprites
* Mobile touch controls
* Leaderboards
* High score saving

```
```
