
import { Sprite } from './sprite'

export type Command = (sprite: Sprite) => void

export type CommandStream = Command[]

export type KeyMapping = { [key: string]: Command }

export class KeyboardInput {
  keyMapping: KeyMapping

  private pressedKeys: string[] = []

  constructor(keyMapping: KeyMapping) {
    this.keyMapping = keyMapping
  }

  listen(): CommandStream {
    return this.pressedKeys.reduce(
      (acc: CommandStream, x) => {
        if (this.keyMapping[x]) {
          acc.push(this.keyMapping[x])
        }
        return acc
      },
      []
    )
  }

  init() {
    window.addEventListener('keydown', e => this.onKeydown(e))
    window.addEventListener('keyup', e => this.onKeyup(e))
    return this
  }

  private onKeydown(e: KeyboardEvent) {
    if (!this.pressedKeys.includes(e.key)) {
      this.pressedKeys.push(e.key)
    }
  }

  private onKeyup(e: KeyboardEvent) {
    const idx = this.pressedKeys.indexOf(e.key)
    if (idx > -1) {
      this.pressedKeys.splice(idx, 1)
    }
  }
}