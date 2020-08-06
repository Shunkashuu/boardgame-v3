// exercice vidéo
function creerGrille() {
    const nbLignes = 10;
    const nbColonnes = 10;
    let i;
    let j;
    let x = 0;
    let y = 0;

    for(i = 0; i < nbLignes; i++) {
        let trElt = document.createElement('tr');
        trElt.id = 'line-' + i;
        document.querySelector('#plateau').appendChild(trElt);

        for(j = 0; j < nbColonnes; j++) {
            const tdElt = document.createElement('td');
            tdElt.id = x + '-' + y;
            tdElt.innerHTML = `${i} - ${j}`;
            document.getElementById(`line-${y}`).appendChild(tdElt);
            x++; // aller à droite

            // passer à la ligne
            if(document.getElementById(`line-${y}`).children.length == nbColonnes) {
                y++;
                x = 0;
            }
        }
    }
};

creerGrille()

// a faire :
// generation aleatoire des cases
// generation des objets