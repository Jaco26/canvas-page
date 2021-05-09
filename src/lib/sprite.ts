
export type SpriteOptions = {
  x: number
  y: number
  width: number
  height: number
}

export class Sprite {
  x: number
  y: number
  width: number
  height: number

  dx = 0
  dy = 0

  constructor({ x, y, width, height }: SpriteOptions) {
    this.x = x
    this.y = y

    this.width = width
    this.height = height
  }

  accelX(velocity: number) {
    if (Math.abs(this.dx + velocity) < 3)
      this.dx += velocity
  }

  accelY(velocity: number) {
    if (Math.abs(this.dy + velocity) < 3)
      this.dy += velocity
  }

  updatePosition() {
    this.x += this.dx
    this.y += this.dy
  }
}