let currentEnemy = 0;
var heroHealth = 100;
var rounds = 0;

let enemy = [{
  name: "ninja",
  damage: 1,
  Health: 100,
  image: './assets/Fighter1.png',
}, {
  name: "Orc",
  damage: 2,
  Health: 100,
  image: './assets/Enemy1-a.png'
}, {
  name: "Dragon",
  damage: 4,
  Health: 200,
  image: './assets/Dragon.jpg',
}]

let currentEnemyX = enemy[currentEnemy]

function changeHero() {
}

function slash() {
  currentEnemyX.Health--
  update()
}

function blast() {
  currentEnemyX.Health -= 5
  update()
}

function manaStorm() {
  currentEnemyX.Health -= 10
  heroHealth -= 10
  update()
}

function heal() {
  heroHealth += 10
  rounds++
  update()
}

function update() {

  document.getElementById("enemyHealth").innerText = currentEnemyX.Health
  heroHealth -= currentEnemyX.damage
  document.getElementById("heroHealth").innerText = heroHealth
  rounds++
  document.getElementById("rounds").innerText = rounds
  if (heroHealth <= 0) {
    document.getElementById("lose").innerHTML = `<h1>You Lose!</h1>`
  }
  if (currentEnemyX.Health <= 0) {
    newEnemy()
  }

}

function newEnemy() {

  if (currentEnemy < enemy.length - 1) {
    currentEnemy = currentEnemy + 1
    currentEnemyX = enemy[currentEnemy]
  }
  else { document.getElementById("lose").innerHTML = `<h1>You Win!</h1>` }
  document.getElementById("enemyName").innerText = currentEnemyX.name
  rounds = -1
  update()
}