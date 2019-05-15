let currentEnemy = 0;
var heroHealth = 100;
var rounds = 0;

let enemy = [{
  name: "ninja",
  damage: 1,
  Health: 100,
  image: './assets/Fighter1.png',
  items: [],
  itemsE: []
}, {
  name: "Orc",
  damage: 2,
  Health: 100,
  image: './assets/Enemy1-a.png',
  items: [],
  itemsE: []
}, {
  name: "Dragon",
  damage: 4,
  Health: 200,
  image: './assets/Dragon.png',
  items: [],
  itemsE: []
}]

let currentEnemyX = enemy[currentEnemy]

// -- Items

let items = {
  shield: { name: "Shield", modifier: -1, description: "Blocks pretty good." },
  break: { name: "Break", modifier: 1, description: "WaTt??" },
}
let itemsE = {
  lightning: { name: "Lightning", modifier: 1, description: "I have the power!" },
  break: { name: "Break", modifier: 2, description: "WaTt??" },
}

function addMods() {
  //declare an output variable
  //iterate over all of the items in the current enemy's items array and add up the item.modifier values
  //return the output variable that's storing the sum of the modifiers
  // (bc you return a number you can invoke this function as part of the attack damage)
  let total = 0
  for (let i = 0; i < currentEnemyX.items.length; i++) {
    const element = currentEnemyX.items[i];
    total += element.modifier
  }
  return total
}

function addModsE() {
  let total = 0
  for (let i = 0; i < currentEnemyX.itemsE.length; i++) {
    const element = currentEnemyX.itemsE[i];
    total += element.modifier
  }
  return total
}
// -- Actions

function slash() {
  if (slashRandomizer() == 20) {
    currentEnemyX.Health -= 25 + addModsE()
  } else {
    currentEnemyX.Health -= 1 + addModsE()
  }
  update()
}
/* var slash () = (slashRandomizer() == 20) ? currentEnemyX.Health -= 25 : currentEnemyX.Health-- */


function slashRandomizer(rand) {
  return Math.floor((Math.random() * 20) + 1)
}

function blast() {
  currentEnemyX.Health -= 5 + addModsE()
  update()
}

function manaStorm() {
  currentEnemyX.Health -= Math.floor((Math.random() * 15) + 1) + (addMods() * 2)
  heroHealth -= Math.floor((Math.random() * 5) + 1) + addMods()
  update()
}

function heal() {
  heroHealth += 10
  rounds++
  update()
}

function shield() {
  //we want to add the shield item to the targets items array when this method is invoked
  currentEnemyX.items.push(items.shield)
}

function lightning() {
  currentEnemyX.itemsE.push(itemsE.lightning)
}
function broken() {
  currentEnemyX.items.push(items.break)
  currentEnemyX.itemsE.push(itemsE.break)
}

function update() {

  document.getElementById("enemyHealth").innerText = currentEnemyX.Health.toString()
  heroHealth -= currentEnemyX.damage + addMods()
  document.getElementById("heroHealth").innerText = heroHealth.toString()
  rounds++
  document.getElementById("rounds").innerText = rounds.toString()
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

  document.getElementById("EnemyPic").innerHTML = `
  <img src="${enemy[currentEnemy].image}" class="enemyPic" alt=""></img>`
  rounds = -1
  update()
  currentEnemyX.image
}

// So since I didnt know the buttons were required I had to redo this, sorry. 