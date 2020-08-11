export default class Weapon {
    constructor(name, damages, x, y, src) {
        this.name = name;
        this.damages = damages;
        this.x = x;
        this.y = y;
        this.src = src;
    }
}

const listWeapons = [
    new Weapon('Cage Eclair', 20, random(0, this.nbOfLines), random(0, this.nbOfColumns), 'img/electrik.png'),
    new Weapon('Double Pied', 30, random(0, this.nbOfLines), random(0, this.nbOfColumns), 'img/fighting.png'),
    new Weapon("Noeud d'herbe", 40, random(0, this.nbOfLines), random(0, this.nbOfColumns), 'img/plant.png'),
    new Weapon('Surf', 50, random(0, this.nbOfLines), random(0, this.nbOfColumns), 'img/water.png'),
    new Weapon('Default', 10, random(0, this.nbOfLines), random(0, this.nbOfColumns), 'img/default.png'),
]