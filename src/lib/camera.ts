import { Sprite } from "./sprite"

export type Viewport = {
  x: number
  y: number
  width?: number
  height?: number
}

export class Camera {
  x: number
  y: number
  maxX: number
  maxY: number
  width: number
  height: number
  worldWidth: number
  worldHeight: number

  constructor({ x, y, width, height }: Viewport, worldWidth: number, worldHeight: number) {
    this.x = x
    this.y = y
    this.maxX = worldWidth - width
    this.maxY = worldHeight - height
    this.width = width
    this.height = height
    this.worldWidth = worldWidth
    this.worldHeight = worldHeight
  }

  focusOn(sprite: Sprite) {
    const newX = sprite.x - this.width / 2
    const newY = sprite.y - (this.height / 2)
    this.x = newX < 0
      ? 0
      : newX > this.maxX
        ? this.maxX
        : newX
    this.y = newY < 0
      ? 0
      : newY > this.maxY
        ? this.maxY
        : newY
  }
}
