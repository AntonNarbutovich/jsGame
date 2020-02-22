import Wall from "../components/wall.js"
import FrontWall from "../components/frontWall.js"
import Door from "../components/door.js"
import SteelDoor from "../components/steelDoor.js"
import Window from "../components/window.js"
import WeaponGenerator from "../components/weaponGenerator.js"
import BonusGenerator from "../components/bonusGenerator.js"
import Trampoline from "../components/trampoline.js"
import Table from "../components/table.js"
import Player from "../components/player.js"
import Enemy from "../enemies/enemy.js"

export default function level1(ctx){
  let obstacles = []
  let frontWalls = []
  let doors = []
  let steelDoors = []
  let weaponGenerators = []
  let windows = []
  let bonusGenerators = []
  let trampolins = []
  let tables = []
  let enemies = []

  let backgroundImage = new Image()
  backgroundImage.src = 'img/background2.png'

  let player1 = new Player(1, 600, 550, ctx)
  let player2 = new Player(2, 900, 550, ctx)

  obstacles.push(new Wall(0, 620, 1550, 10, ctx))
  obstacles.push(new Wall(0, 100, 10, 520, ctx))
  obstacles.push(new Wall(1510, 100, 10, 520, ctx))
  obstacles.push(new Wall(200, 430, 10, 100, ctx))
  obstacles.push(new Wall(200, 570, 10, 50, ctx))
  obstacles.push(new Wall(1310, 430, 10, 100, ctx))
  obstacles.push(new Wall(1310, 570, 10, 50, ctx))
  obstacles.push(new Wall(0, 430, 200, 10, ctx))
  obstacles.push(new Wall(1310, 430, 200, 10, ctx))

  windows.push(new Window(200, 530, ctx))
  windows.push(new Window(1310, 530, ctx))

  trampolins.push(new Trampoline(250, 610, ctx))
  trampolins.push(new Trampoline(1220, 610, ctx))


  bonusGenerators.push(new BonusGenerator(80, 610, ctx))
  bonusGenerators.push(new BonusGenerator(1400, 610, ctx))
  weaponGenerators.push(new WeaponGenerator(80, 420, ctx))
  weaponGenerators.push(new WeaponGenerator(1400, 420, ctx))

  tables.push(new Table(740, 595, ctx))


  return [player1, player2, obstacles, frontWalls, doors, steelDoors, weaponGenerators, windows, bonusGenerators, trampolins, tables, enemies, backgroundImage]
}
