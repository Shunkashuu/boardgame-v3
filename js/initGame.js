import Map from './map.js';

/**
 * @Description Renvoi un nombre aléatoire entre {min} et {max}
 * window permet de dire que cette fonction est appellable de manière globale dans tout le projet
 * tu vas surement en avoir besoin pour génerer les armes et les joueurs aussi
 * @author snouzy
 * @date 2020-08-08
 * @param {int} min  le nombre minimum souhaité
 * @param {int} max  le nombre maximum souhaité
 * @returns {int}    un nombre entre min et max
 */
window.random = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

export default class Init {
  creerGrille() {
    // tous les objets
    const Grille = new Map(10, 10);
    Grille.creerGrille();
    Grille.genererMurs(); //generation des murs
  }
}
