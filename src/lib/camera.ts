

export class Camera {
  maxX: number
  maxY: number
  width: number
  height: number

  x = 0
  y = 0

  constructor(frameWidth: number, frameHeight: number, worldWidth: number, worldHeight: number) {
    this.width = frameWidth
    this.height = frameHeight
    this.maxX = worldWidth - frameWidth
    this.maxY = worldHeight - frameHeight
  }
}