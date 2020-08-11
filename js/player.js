export default class Player {
    constructor(id, damages, x, y, src){
        this.id = id;
        this.damages = damages;
        this.x = x ;
        this.y = y;
        this.src = src;
        
    }
}

const listPlayers = [
    new Player(0, 10, random(0, this.nbOfLines), random(0, this.nbOfColumns), 'img/player1.png'),
    new Player(1, 10, random(0, this.nbOfLines), random(0, this.nbOfColumns), 'img/player2.png')
]