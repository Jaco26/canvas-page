import { TileMap } from './lib/tile-map'
import { KeyboardInput } from './lib/user-input'
import { Sprite } from './lib/sprite'

declare global {
  interface Window { tileMap: TileMap }
}

const CAM_WIDTH = 500
const CAM_HEIGHT = 500
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

const tileMap = window.tileMap = new TileMap({
  tileSize: 100,
  layers: [
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 1, 1, 1, 1, 1, 1, 0, 0, 0,
      0, 1, 1, 1, 2, 2, 2, 2, 1, 0,
      0, 1, 1, 1, 2, 2, 2, 2, 1, 0,
      0, 1, 1, 1, 2, 2, 2, 2, 1, 0,
      0, 1, 1, 1, 2, 2, 2, 2, 1, 0,
      0, 1, 1, 1, 3, 3, 2, 2, 1, 0,
      0, 1, 1, 3, 3, 3, 2, 2, 1, 0,
      0, 0, 1, 1, 1, 1, 1, 0, 1, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ]
  ],
  nCols: 10,
  viewport: {
    x: 50,
    y: 50,
    width: CAM_WIDTH,
    height: CAM_HEIGHT,
  },
})

const keyboard = new KeyboardInput({
  ArrowUp: sprite => sprite.accelY(-.5),
  ArrowLeft: sprite => sprite.accelX(-.5),
  ArrowRight: sprite => sprite.accelX(.5),
  ArrowDown: sprite => sprite.accelY(.5),
}).init()

const sprite = new Sprite({ x: 50, y: 50, width: 20, height: 20 })

function translateSpriteToCamera(offsetX: number, offsetY: number) {
  const x = sprite.x + offsetX
  const y = sprite.y + offsetY
  return { x, y, width: sprite.width, height: sprite.height }
}

function paint() {
  ctx.clearRect(0, 0, tileMap.camera.width, tileMap.camera.height)
  const { offsetX, offsetY, tiles } = tileMap.renderViewport()
  for (let i = 0; i < tiles.length; i++) {
    const { x, y, layers } = tiles[i]
    ctx.fillStyle = COLORS[layers[0]]
    ctx.fillRect(x, y, tileMap.tileSize, tileMap.tileSize)
  }
  ctx.fillStyle = 'black'
  const { x, y, width, height } = translateSpriteToCamera(offsetX, offsetY)
  ctx.fillRect(x, y, width, height)
}

function update() {
  keyboard.listen().forEach(command => command(sprite))
  sprite.updatePosition()
  tileMap.camera.focusOn(sprite)
}

(function loop() {
  update()
  paint()
  requestAnimationFrame(loop)
})()