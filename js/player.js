export default class Player {
    constructor(id, damages, url){
        this.id = id;
        this.damages = damages;
        this.url = `../img/${url}.png`;
    }
}