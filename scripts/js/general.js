var page = document.getElementsByTagName("BODY")[0];

var fondsPossibles = ['Spacebattle.jpg', 'stargate.jpg', 'stvssw.jpg'];

var nomJoueur = "";
var themeActuel = 0;
var compteur = 0;
var boitePoints = "";

// Durée de la partie random entre 15 et 120 secondes
var dureePartie = 0;

definirChrono();
console.log(dureePartie);

setInterval(gererChrono, 1000);

/**
 * Remet la partie à 0
 */
function initialiserPartie(){
    // Si l'affichage des points existe déjà, on le supprime car il provient d'une partie précédente
    if(document.getElementById('zonePoints')){
        document.getElementById("zonePoints").remove();
    }

    // On demande le nom du joueur que l'on place dans la variable
    if(nomJoueur == ""){
        nomJoueur = prompt("Tactical officer on the bridge! Hi sir! Our captain need your name!");
    }

    // On affiche le nom du joueur dans la partie prévue à cet effet
    document.getElementById('officerName').innerHTML = nomJoueur;

    // On initialise les compteurs
    compteur = 0;

    // On crée la boite pour afficher le compteur
    miseEnPlacePoints();

    // On met ensuite en place le fond d'écran par défaut
    changerEnvironnement(1)
}

/**
 * Permet de gérer le chrono et donc la fin de partie
 */
function gererChrono(){
    if(dureePartie > 0){
        dureePartie = dureePartie - 1;
        console.log("Nouveau compte: "+dureePartie);
    }else if(dureePartie <= 0){
        if(confirm("FIN DE PARTIE\nVous avez atteint "+compteur+"pts.\nVoulez-vous recommencer?")){
            definirChrono();

            initialiserPartie();
        }else{
            close();
        }
    }
}

/**
 * Determine le chrono
 */
function definirChrono(){
    dureePartie = Math.floor(Math.random() * (120 - 15)) + 15;
}

/**
 * Affiche les regles du jeu
 */
function afficherRegles(){
    alert("Voici les regles du jeu:\nUtilisez Q et D pour un effet surprise\nVous diposez de 60 secondes pour détruire autan d'ennemis que possible");
}

/**
 * Permet de mettre en place la boite de compteur de points
 */
function miseEnPlacePoints(){
    boitePoints = document.createElement("div");
    boitePoints.id = "zonePoints";
    boitePoints.style.width = "10%";
    boitePoints.style.padding = "20px";
    boitePoints.style.color = "#6D071A";
    boitePoints.style.background = "grey";
    boitePoints.style.margin = "auto";
    boitePoints.style.textAlign = "center";

    document.getElementById("menuJeu").appendChild(boitePoints);
    document.getElementById('zonePoints').innerHTML = compteur;
}

/**
 * Permet de changer le fond d'écran de la partie
 * @param {integer} typeEnvironnement 
 */
function changerEnvironnement(typeEnvironnement){
    themeActuel = (Number.isNaN(typeEnvironnement)) ? 0 : typeEnvironnement - 1;

    // Si le thème est supérieur à 2, on met alors le thème par défaut que est donc 0
    if(themeActuel > 2){
        themeActuel = 0;
    }

    document.getElementsByTagName("body")[0].style.background = "url('images/fonds/"+fondsPossibles[themeActuel]+"') no-repeat";
}

/**
 * Permet de mettre à jour le compteur ainsi que son affichage
 * @param {integer} hausse 
 */
function mettreAJourCompteur(hausse){
    compteur = compteur + hausse;

    document.getElementById('zonePoints').innerHTML = compteur;
}