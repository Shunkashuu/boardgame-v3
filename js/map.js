import Joueur from './player.js';

// exercice vidéo
export default class Map {
  constructor(nbLignes, nbColonnes) {
    this.nbLignes = nbLignes;
    this.nbColonnes = nbColonnes;
  }
  creerGrille() {
    let i;
    let j;
    let x = 0;
    let y = 0;

    for (i = 0; i < this.nbLignes; i++) {
      let trElt = document.createElement('tr');
      trElt.id = 'line-' + i;
      document.querySelector('#plateau').appendChild(trElt);

      for (j = 0; j < this.nbColonnes; j++) {
        const tdElt = document.createElement('td');
        tdElt.id = x + '-' + y;
        tdElt.dataset.x = x;
        tdElt.dataset.y = y;
        tdElt.innerHTML = `${i} - ${j}`; // data attribute
        document.getElementById(`line-${y}`).appendChild(tdElt);
        x++; // aller à droite
        // passer à la ligne
        if (document.getElementById(`line-${y}`).children.length == this.nbColonnes) {
          y++;
          x = 0;
        }
      }
    }
  }

  /**
   * @Description Génère les murs
   * @author snouzy
   * @date 2020-08-08
   */
  genererMurs() {
    const $tdElts = $('td');

    // le nb de mur va être dans cet interval
    const min = 10;
    const max = 15;

    // generation d'un nb aléatoire (voir la fonction dans initGame.js)
    const randomNumber = random(min, max);

    for (let i = 0; i < randomNumber; i++) {
      // sélectionne un td au hasard
      let index = random(0, $tdElts.length);
      let randomTdElt = $tdElts[index];

      // fais les vérifications pour qu'un mur n'apparaisse pas sur un autre
      while (this.getCellInfos(randomTdElt.id) !== 0) {
        //3-1
        index = random(0, $tdElts.length);
        randomTdElt = $tdElts[index];
      }

      // on colorie les murs en gris
      // tu peux renommer la classe en "mur" si ça t'aide
      $(randomTdElt).addClass('greyed');
    }
  }

  /**
   * @Description Renvoi ce qu'il y a sur la cellule visée
   * @author snouzy
   * @date 2020-08-08
   * @param {any} pos  une position sous la forme {3-1}
   * @returns {int}    un nombre correspondant à la classe associée ou 0 si rien ne correspond
   */
  getCellInfos(pos) {
    // la pos ressemble à 3-1 par exemple
    // on la sélectionne avec jquery
    let posTd = $(`#${pos}`);
    if ($(posTd).hasClass('greyed')) return 1;
    else return 0;
  }

  regarderAutour(pos, celluleARegarder = 1) {
    // pos est sous la forme 3-1
    const x = pos.chartAt(0);
    const y = pos.charAt(pos.charAt.length - 1);
  }
}

const cell = $('td[data-x="5"] td[data-y="7"]');
console.log(cell);

// $("tr:eq(" + x + ") td:eq(" + y + ")").addClass('PlayerOne')
// eq selection table jquery
// utile pour generer les obstacles
// si cette classe n'a pas la classe player a la classe bloqued classe generique pour soit un player soit un obstacle

// a faire :
// generation aleatoire des cases
// generation des objets
