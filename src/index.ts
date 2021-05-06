import { Grid, testTiles } from './lib/grid'
import { Camera } from './lib/camera'


const GRID_ROWS = 10
const GRID_COLS = 10
const GRID_TILE_SIZE = 100

const CAM_WIDTH = 400
const CAM_HEIGHT = 400
const CAM_MOVE_VELOCITY = 4

const WORLD_WIDTH = GRID_COLS * GRID_TILE_SIZE
const WORLD_HEIGHT = GRID_ROWS * GRID_TILE_SIZE



const COLORS = [
  'grey',
  'blue',
  'green',
  'brown',
]

const canvas = document.createElement('canvas')
canvas.width = CAM_WIDTH
canvas.height = CAM_HEIGHT

document.body.appendChild(canvas)

const ctx = canvas.getContext('2d')

const grid = new Grid(GRID_COLS, GRID_ROWS)
grid.loadTiles(testTiles)
const camera = new Camera(CAM_WIDTH, CAM_HEIGHT, WORLD_WIDTH, WORLD_HEIGHT)

function paint() {
  ctx.clearRect(camera.x, camera.y, camera.width, camera.height)
  const startCol = Math.floor(camera.x / GRID_TILE_SIZE)
  const startRow = Math.floor(camera.y / GRID_TILE_SIZE)
  const endCol = startCol + (camera.width / GRID_TILE_SIZE)
  const endRow = startRow + (camera.height / GRID_TILE_SIZE)
  const offsetX = -camera.x + startCol * GRID_TILE_SIZE
  const offsetY = -camera.y + startRow * GRID_TILE_SIZE

  for (let c = startCol; c <= endCol; c++) {
    for (let r = startRow; r <= endRow; r++) {
      const tileValue = grid.getTile(r, c)
      const tileX = (c - startCol) * GRID_TILE_SIZE + offsetX
      const tileY = (r - startRow) * GRID_TILE_SIZE + offsetY
      ctx.fillStyle = COLORS[tileValue]
      ctx.fillRect(tileX + 1, tileY + 1, GRID_TILE_SIZE, GRID_TILE_SIZE)
    }
  }
}

const pressedKeys: string[] = []

window.addEventListener('keydown', e => {
  if (!pressedKeys.includes(e.key)) {
    pressedKeys.push(e.key)
  }
})

window.addEventListener('keyup', e => {
  const idx = pressedKeys.indexOf(e.key)
  if (idx > -1) {
    pressedKeys.splice(idx, 1)
  }
})

function update() {
  if (pressedKeys.includes('ArrowUp')) {
    if (camera.y - CAM_MOVE_VELOCITY >= 0) {
      camera.y -= CAM_MOVE_VELOCITY
    }
  }
  if (pressedKeys.includes('ArrowDown')) {
    if (camera.y + CAM_MOVE_VELOCITY <= camera.maxY) {
      camera.y += CAM_MOVE_VELOCITY
    }
  }
  if (pressedKeys.includes('ArrowLeft')) {
    if (camera.x - CAM_MOVE_VELOCITY >= 0) {
      camera.x -= CAM_MOVE_VELOCITY
    }
  }
  if (pressedKeys.includes('ArrowRight')) {
    if (camera.x + CAM_MOVE_VELOCITY <= camera.maxX) {
      camera.x += CAM_MOVE_VELOCITY
    }
  }
}

(function loop() {
  update()
  paint()
  requestAnimationFrame(loop)
})()