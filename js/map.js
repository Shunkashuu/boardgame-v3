import Player from './player.js';
import Weapon from './weapon.js';

// class Map : génération des obstacles, import des joueurs et des armes
export default class Map {
  constructor(nbLines, nbCols, nbWeapons, listWeapons, nbPlayers, listPlayers) {
    this.nbLines = nbLines;
    this.nbCols = nbCols;
    this.nbWeapons = nbWeapons;
    this.listWeapons = [
      new Weapon(0, 'Default', 10, 'default'),
      new Weapon(1, 'Cage Eclair', 20,  'electrik'),
      new Weapon(2, 'Double Pied', 30, 'fighting'),
      new Weapon(3, 'Noeud herbe', 40,  'plant'),
      new Weapon(4, 'Surf', 50, 'water'),
  ];
    this.nbPlayers = nbPlayers;
    this.listPlayers = [
      new Player(0, 10, 'img/player1.png'),
      new Player(1, 10, 'img/player2.png')
  ]

  }
  createGrid() {
    let i;
    let j;
    let x = 0;
    let y = 0;

    for (i = 0; i < this.nbLines; i++) {
      let trElt = document.createElement('tr');
      trElt.id = 'line-' + i;
      document.querySelector('#plateau').appendChild(trElt);

      for (j = 0; j < this.nbCols; j++) {
        const tdElt = document.createElement('td');
        tdElt.id = x + '-' + y;
        tdElt.dataset.x = x;
        tdElt.dataset.y = y;
        //tdElt.innerHTML = `${i} - ${j}`; // data attribute
        document.getElementById(`line-${y}`).appendChild(tdElt);
        x++; // aller à droite
        // passer à la ligne
        if (document.getElementById(`line-${y}`).children.length == this.nbCols) {
          y++;
          x = 0;
        }
      }
    }
  }

  createWalls() {
    const $tdElts = $('td');

    // le nb de mur va être dans cet interval
    const min = 10;
    const max = 15;

    // generation d'un nb aléatoire (voir la fonction dans initGame.js)
    const randomNumber = random(min, max);

    for (let i = 0; i < randomNumber; i++) {
      // sélectionne un td au hasard
      let index = random(0, $tdElts.length);  //index = 0 à 99 taille de la grille
      let randomTdElt = $tdElts[index];

      // fais les vérifications pour qu'un mur n'apparaisse pas sur un autre
      while (this.getCellInfos(randomTdElt.id) !== 0) {
        //3-1
        index = random(0, $tdElts.length);
        randomTdElt = $tdElts[index];
      }

      // on donne la class walls et les roches
      $(randomTdElt).addClass('walls');
    }
  }

  createWeapons() {
    const $tdElts = $('td');

    const min = 4;
    const max = 4;
    let nb = 1;

    const randomNumber = random(min, max);

    for (let i = 0; i < randomNumber; i++) {
      
      let index = random(0, $tdElts.length);
      let randomTdElt = $tdElts[index];

      while (this.getCellInfos(randomTdElt.id) !== 0) {
        //3-1
        index = random(0, $tdElts.length);
        randomTdElt = $tdElts[index];
      }

      // on donne la class walls et les roches
      $(randomTdElt).addClass('weapon' + nb);
      nb++;
    }
  }

  createPlayers() {
    const $tdElts = $('td');

    const min = 2;
    const max = 2;
    let nb = 1;

    const randomNumber = random(min, max);

    for (let i = 0; i < randomNumber; i++) {
      
      let index = random(0, $tdElts.length);
      let randomTdElt = $tdElts[index];

      while (this.getCellInfos(randomTdElt.id) !== 0) {
        //3-1
        index = random(0, $tdElts.length);
        randomTdElt = $tdElts[index];
      }

      // on donne la class walls et les roches
      $(randomTdElt).addClass('player' + nb);
      nb++;
    }
  }
  

  // renvoi ce qu'il y a sur la cellule visée
  // parametre pos une position sous la forme {3-1}
  // returne un nombre correspondant à la classe associée ou 0 si rien ne correspond
  
  getCellInfos(pos) {
    // la pos ressemble à 3-1 par exemple
    // on la sélectionne avec jquery
    let posTd = $(`#${pos}`);
    if ($(posTd).hasClass('walls')) return 1;
    if ($(posTd).hasClass('weapon1')) return 1;
    if ($(posTd).hasClass('weapon2')) return 1;
    if ($(posTd).hasClass('weapon3')) return 1;
    if ($(posTd).hasClass('weapon4')) return 1;
    if ($(posTd).hasClass('player1')) return 1;
    else return 0;
  }

  regarderAutour(pos, celluleARegarder = 1) {
    // pos est sous la forme 3-1
    const x = pos.chartAt(0);
    const y = pos.charAt(pos.charAt.length - 1);
  }
}