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

  obstacles.push(new Wall(100, 600, 1400, 30, ctx))
  obstacles.push(new Wall(1000, 550, 200, 30, ctx))
  obstacles.push(new Wall(1050, 500, 100, 30, ctx))
  obstacles.push(new Wall(1300, 550, 100, 50, ctx))
  obstacles.push(new Wall(1300, 420, 100, 50, ctx))
  obstacles.push(new Wall(1470, 480, 40, 30, ctx))

  obstacles.push(new Wall(100, 30, 30, 130, ctx))
  obstacles.push(new Wall(100, 200, 30, 400, ctx))
  obstacles.push(new Wall(100, 535, 80, 10, ctx))
  obstacles.push(new Wall(100, 410, 80, 10, ctx))
  obstacles.push(new Wall(250, 500, 50, 10, ctx))
  obstacles.push(new Wall(280, 450, 50, 10, ctx))
  obstacles.push(new Wall(100, 400, 30, 200, ctx))

  //obstacles.push(new Wall(100, 400, 220, 30, ctx))
  obstacles.push(new Wall(300, 400, 30, 145, ctx))
  obstacles.push(new Wall(400, 450, 230, 30, ctx))
  obstacles.push(new Wall(700, 450, 270, 30, ctx))

  obstacles.push(new Wall(300, 390, 70, 30, ctx))
  obstacles.push(new Wall(400, 325, 650, 10, ctx))
  obstacles.push(new Wall(1150, 325, 400, 10, ctx))
  obstacles.push(new Wall(1400, 290, 150, 35, ctx))
  obstacles.push(new Wall(1450, 255, 100, 35, ctx))
  obstacles.push(new Wall(800, 200, 600, 10, ctx))
  obstacles.push(new Wall(1250, 200, 10, 85, ctx))
  obstacles.push(new Wall(470, 260, 30, 10, ctx))
  obstacles.push(new Wall(200, 200, 230, 10, ctx))

  obstacles.push(new Wall(500, 200, 320, 10, ctx))
  obstacles.push(new Wall(500, 200, 30, 70, ctx))
  obstacles.push(new Wall(790, 200, 30, 70, ctx))
  obstacles.push(new Wall(630, 300, 60, 30, ctx))

  obstacles.push(new Wall(300, 200, 30, 150, ctx))

  obstacles.push(new Wall(500, 50, 300, 10, ctx))
  obstacles.push(new Wall(500, 0, 10, 120, ctx))
  obstacles.push(new Wall(600, 0, 10, 120, ctx))
  obstacles.push(new Wall(700, 0, 10, 120, ctx))
  obstacles.push(new Wall(800, 0, 10, 120, ctx))

  obstacles.push(new Wall(1100, 0, 10, 150, ctx))

  obstacles.push(new Wall(100, 0, 340, 30, ctx))

  frontWalls.push(new FrontWall(200, 30, 40, 160, ctx))
  frontWalls.push(new FrontWall(300, 30, 40, 160, ctx))
  frontWalls.push(new FrontWall(400, 30, 40, 160, ctx))

  frontWalls.push(new FrontWall(850, 210, 10, 115, ctx))
  frontWalls.push(new FrontWall(900, 210, 10, 115, ctx))
  frontWalls.push(new FrontWall(950, 210, 10, 115, ctx))
  frontWalls.push(new FrontWall(1000, 210, 10, 115, ctx))


  doors.push(new Door(310, 545, ctx))

  doors.push(new Door(510, 270, ctx))
  doors.push(new Door(800, 270, ctx))

  doors.push(new Door(1100, 145, ctx))

  //steelDoors.push(new SteelDoor(400, 545, ctx))


  windows.push(new Window(100, 160, ctx))
  windows.push(new Window(1300, 470, ctx))
  windows.push(new Window(1300, 510, ctx))
  windows.push(new Window(300, 350, ctx))

  windows.push(new Window(500, 160, ctx))
  windows.push(new Window(600, 160, ctx))
  windows.push(new Window(700, 160, ctx))
  windows.push(new Window(800, 160, ctx))
  windows.push(new Window(500, 120, ctx))
  windows.push(new Window(600, 120, ctx))
  windows.push(new Window(700, 120, ctx))
  windows.push(new Window(800, 120, ctx))


  weaponGenerators.push(new WeaponGenerator(800, 590, ctx))
  weaponGenerators.push(new WeaponGenerator(500, 440, ctx))
  weaponGenerators.push(new WeaponGenerator(640, 290, ctx))
  weaponGenerators.push(new WeaponGenerator(1150, 190, ctx))


  bonusGenerators.push(new BonusGenerator(640, 190, ctx))
  bonusGenerators.push(new BonusGenerator(1400, 590, ctx))

  trampolins.push(new Trampoline(1075, 490, ctx))
  trampolins.push(new Trampoline(130, 400, ctx))

  tables.push(new Table(630, 575, ctx))
  tables.push(new Table(930, 175, ctx))

  return [player1, player2, obstacles, frontWalls, doors, steelDoors, weaponGenerators, windows, bonusGenerators, trampolins, tables, backgroundImage]
}
