export default class Joueur {
    constructor(id, degats, x, y, src){
        this.id = id;
        this.degats = degats;
        this.x = x ;
        this.y = y;
        this.src = src;
        
    }
}

//export default Joueur
const Toto = () => {  // fonction flechee
    console.log("depuis ma super fonction");
}

export {Toto}  //export nomme