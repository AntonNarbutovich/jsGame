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

  let backgroundImage = new Image()
  backgroundImage.src = 'img/background.png'

  let player1 = new Player(1, 450, 450, ctx)
  let player2 = new Player(2, 900, 350, ctx)

  obstacles.push(new Wall(0, 600, 1000, 10, ctx))

  return [player1, player2, obstacles, frontWalls, doors, steelDoors, weaponGenerators, windows, bonusGenerators, trampolins, tables, backgroundImage]
}
