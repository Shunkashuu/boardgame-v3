import Map from './map.js';

// window : appel global
window.random = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

export default class Init {
  createGrid() {
    // tous les objets
    const Grille = new Map(10, 10);
    Grille.createGrid();
    Grille.createWalls();
    Grille.createWeapons();
    Grille.createPlayers();
  }
}
