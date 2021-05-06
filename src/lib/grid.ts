

export class Grid {
  rows: number
  cols: number
  tiles: number[]

  constructor(rows: number, cols: number) {
    this.rows = rows
    this.cols = cols
    this.tiles = new Array(rows * cols).fill(0)
  }

  loadTiles(tiles: number[]) {
    this.tiles = tiles
  }

  getTile(row: number, col: number) {
    return this.tiles[row * this.cols + col]
  }

  setTile(idx: number, value?: number) {
    if (typeof value === 'number') {
      this.tiles = this.tiles.map((x, i) => i === idx ? value : x)
    }
    return this.tiles[idx]
  }
}

export const testTiles = [
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