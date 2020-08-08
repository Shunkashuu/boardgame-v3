import Joueur from "./player.js"

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

        for(i = 0; i < this.nbLignes; i++) {
            let trElt = document.createElement('tr');
            trElt.id = 'line-' + i;
            document.querySelector('#plateau').appendChild(trElt);

            for(j = 0; j < this.nbColonnes; j++) {
                const tdElt = document.createElement('td');
                tdElt.id = x + '-' + y;
                tdElt.dataset.x = x;
                tdElt.dataset.y = y;
                tdElt.innerHTML = `${i} - ${j}`;  // data attribute
                document.getElementById(`line-${y}`).appendChild(tdElt);
                x++; // aller à droite
                            // passer à la ligne
            if(document.getElementById(`line-${y}`).children.length == this.nbColonnes) {
                y++;
                x = 0;
            }
        }
    }
}
}

const cell = $('td[data-x="5"] td[data-y="7"]')
console.log(cell)

// $("tr:eq(" + x + ") td:eq(" + y + ")").addClass('PlayerOne')
// eq selection table jquery
// utile pour generer les obstacles
// si cette classe n'a pas la classe player a la classe bloqued classe generique pour soit un player soit un obstacle


// a faire :
// generation aleatoire des cases
// generation des objets