import Phaser from "phaser";

export default class HorrorScene extends Phaser.Scene {
  constructor() {
    super("Horror-Scene");
  }

  init(){
    let wallsMap = undefined;
  }

  preload() {
    this.load.image('floor', '/images/floor.png')
    this.load.image('wall', '/images/wall.png')
  }

  create() {
    const TILESIZE = 30
    const vTiles = Math.floor(((this.scale.width / TILESIZE) - 1));
    const hTiles = Math.floor(((this.scale.width / TILESIZE) - 1));
    const mapHeight = Math.floor((vTiles - 1) / 2);
    const mapWidth = Math.floor((hTiles - 1) / 2);
    // New Maze object
    const mymaze = new Maze(mapWidth, mapHeight);
    // Maze start
    mymaze.gateway(0, 1);
    // Maze exit
    mymaze.gateway(mapWidth - 1, mapHeight - 3);
    // Generates the maze map
    const mazeMap = mymaze.tiles();
    // Center map on screen
    const x = Math.round((this.scale.width - TILESIZE * hTiles) / 2);
    const y = Math.round((this.scale.height - TILESIZE * vTiles) / 2);
    // Gets Solution
    this.solution = mymaze.getRoute(mazeMap,0,1,mapWidth - 1,mapHeight - 3);
    // Display the maze map
    this.renderTiles(x, y, mazeMap, TILESIZE); 
  }

  update() {

  }

  swapZeros(arr) {
    arr.forEach((row, i) => {
      row.forEach((v, i, a) => {
        a[i] = a[i] ? 0 : 1;
      });
    });
  }

  renderTiles(x, y, maze, tilesize) {
    const width = tilesize * maze[0].length;
    const height = tilesize * maze.length;

    // Walls    
    this.wallsMap = this.make.tilemap({ data: maze, tileWidth: 50, tileHeight: 50 });
    let wallTile = this.wallsMap.addTilesetImage('wall');
    let wallsLayer = this.wallsMap.createLayer(0, wallTile, x, y);
    wallsLayer.setDisplaySize(width, height);

    // Floor 
    this.swapZeros(maze); // swaps 0 - 1
    let map = this.make.tilemap({ data: maze, tileWidth: 50, tileHeight: 50 });
    let floorTile = map.addTilesetImage('floor');
    let floorLayer = map.createLayer(0, floorTile, x, y);
    floorLayer.setDisplaySize(width, height);

    // Shadows
    const offset = 0.2 * tilesize;
    let rt = this.add.renderTexture(x + offset, y + offset, width, height);
    rt.draw(wallsLayer, 0, 0);
    rt.setAlpha(0.4);
    rt.setTint(0);

    // Move walls to front
    wallsLayer.setDepth(rt.depth + 1);

    // Renders solution
    this.renderSolution(map);
  }

  renderSolution(mazeMap){
    let path = this.solution;
    path.forEach((v) => {
      mazeMap.getTileAt(v[0],v[1],true).tint = 0xffff00;
    });
  }
}
