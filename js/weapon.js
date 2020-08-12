export default class Weapon {
    constructor(id, name, damages, url) {
        this.id = id;
        this.name = name;
        this.damages = damages;
        this.url = `../img/${url}.png`;
    }
}