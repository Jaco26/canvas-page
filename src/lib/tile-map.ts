import { Camera, Viewport } from './camera'
import { Grid } from './grid'

export type Tile = {
  x: number
  y: number
  layers: number[]
}

export type TileMapOptions = {
  tileSize: number
  layers: number[][]
  nCols: number
  viewport: Viewport
}

export class TileMap {
  private baseTileSize: number

  tileSize: number
  layers: number[][]
  camera: Camera
  grid: Grid

  constructor({ tileSize, nCols, layers, viewport }: TileMapOptions) {
    this.grid = new Grid(nCols, layers)
    const worldWidth = nCols * tileSize
    const worldHeight = this.grid.nRows * tileSize
    this.camera = new Camera(viewport, worldWidth, worldHeight)
    this.tileSize = this.baseTileSize = tileSize
    this.layers = layers
  }

  renderViewport(): { offsetX: number, offsetY: number, tiles: Tile[] } {
    const { camera, grid, tileSize } = this
    const startCol = Math.floor(camera.x / tileSize)
    const startRow = Math.floor(camera.y / tileSize)
    const endCol = startCol + Math.ceil(camera.width / tileSize)
    const endRow = startRow + Math.ceil(camera.height / tileSize)
    const offsetX = -camera.x + startCol * tileSize
    const offsetY = -camera.y + startRow * tileSize
    const tiles: Tile[] = []
    for (let c = startCol; c <= endCol; c++) {
      for (let r = startRow; r <= endRow; r++) {
        tiles.push({
          x: (c - startCol) * tileSize + offsetX,
          y: (r - startRow) * tileSize + offsetY,
          layers: grid.getTileLayers(r, c)
        })
      }
    }
    return {
      tiles,
      offsetX: offsetX - startCol * tileSize,
      offsetY: offsetY - startRow * tileSize,
    }
  }

}