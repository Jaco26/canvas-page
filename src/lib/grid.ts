

export class Grid {
  nRows: number
  nCols: number
  layers: number[][]

  constructor(nCols: number, layers: number[][]) {
    this.nCols = nCols
    this.nRows = Math.floor(layers[0].length / nCols)
    this.layers = layers
  }


  getTile(layer: number, row: number, col: number) {
    return this.layers[layer][row * this.nCols + col]
  }

  getTileLayers(row: number, col: number) {
    const idx = row * this.nCols + col
    return this.layers.map(layer => layer[idx])
  }

  setTile(layer: number, row: number, col: number, value: number) {
    const idx = row * this.nCols + col
    this.layers[layer] = this.layers[layer].map((x, i) => i === idx ? value : x)
  }
}
