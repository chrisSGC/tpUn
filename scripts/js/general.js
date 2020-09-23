var fondsPossibles = ['Spacebattle.jpg', 'stargate.jpg', 'stvssw.jps'];

var nomJoueur = "";
var themeActuel = 0;

function initialiserPartie(){
    nomJoueur = prompt("Tactical officer on the bridge! Hi sir! Our captain need your name!");

    document.getElementById('officerName').innerHTML = nomJoueur;

    alert(nomJoueur);
}

function afficherRegles(){
    alert("Voici les regles du jeu:\nutilisez Q et D pour un effet surprise\nVous diposez de 60 secondes pour déturire autan d'ennemis que possible");
}