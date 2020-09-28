/**
 * general.js
 * 
 * Créé par Christophe FERRU
 * 
 * TP Interfaces du Web avancées
 * finalisé le 28-09-2020
 **/

var page = document.getElementsByTagName("BODY")[0];

var fondsPossibles = ['Spacebattle.jpg', 'stargate.jpg', 'stvssw.jpg'];

var nomJoueur = "";
var themeActuel = 0;
var compteur = 0;
var boitePoints = "";
var monXWing = "";
var spriteSheet = new Image();
var statutPartie = 0;
var monAudio;

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
        document.getElementById("leXWingDuGagnant").remove();
        monAudio.src = "none";
    }

    // On demande le nom du joueur que l'on place dans la variable
    if(nomJoueur == ""){
        while(nomJoueur == ""){
            nomJoueur = prompt("Tactical officer on the bridge! Hi sir! Our captain need your name!");
        }
    }

    // On affiche le nom du joueur dans la partie prévue à cet effet
    document.getElementById('officerName').innerHTML = nomJoueur;

    // On initialise les compteurs et le statut de la partie
    compteur = 0;
    statutPartie = 0;

    // On crée la boite pour afficher le compteur
    miseEnPlacePoints();

    // On met ensuite en place le fond d'écran par défaut
    changerEnvironnement(1);

    // On met en  place l'image du X-wing
    spriteSheet.src = "images/personnages/xwing.png";
    ajouterXwing();

    document.getElementById('leXWingDuGagnant').addEventListener('click', function(){
        // On met à jour le compteur
        mettreAJourCompteur(2);
    });

    document.addEventListener('keydown', function(event){
        var keypress = String.fromCharCode(event.keyCode);

        if(keypress == "A"){
            // Le joueur a appuyé sur A, on lance donc la partie
            statutPartie = 1;
            mettreEnPlaceMusique();

            //On met en place l'animation en fonction du fond choisi
            switch(themeActuel){
                default:
                    monXWing.style.animation = "mvtCoruscant linear 20s infinite, Xwing 1s steps(8) infinite";
                    break;
                case 0:
                    monXWing.style.animation = "mvtCoruscant linear 20s infinite, Xwing 1s steps(8) infinite";
                    break;
                case 1:
                    monXWing.style.animation = "fightWraiths linear 15s infinite, Xwing 1s steps(8) infinite";
                    break;
                case 2:
                    monXWing.style.animation = "UssEnterpriseVSMilleniumFalcon linear 10s infinite, Xwing 1s steps(8) infinite";
                    break;
            }
        }
    });

    document.addEventListener('mousedown', function(event){
        monXWing.style.background = "url(images/personnages/explosion.png)";
    });

    document.addEventListener('mouseup', function(event){
        monXWing.style.background = "url("+spriteSheet.src+")";
    });
}

/**
 * Permet de gérer le chrono (si la aprtie a été lancée) et donc la fin de partie
 */
function gererChrono(){
    if(dureePartie > 0){
        dureePartie = (statutPartie == 1) ? dureePartie - 1 : dureePartie;
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

function mettreEnPlaceMusique(){
    monAudio = document.createElement("audio");
    monAudio.id = "audioJeu";
    monAudio.autoplay = "autoplay";

    switch(themeActuel){
        default:
            monAudio.src = "sons/06-Caroline.mp3";
            break;
        case 0:
            monAudio.src = "sons/06-Caroline.mp3";
            break;
        case 1:
            monAudio.src = "sons/06-Caroline.mp3";
            break;
        case 2:
            monAudio.src = "sons/06-Caroline.mp3";
            break;
    }
}

/**
 * Ajouter le xwing sur la page
 */
function ajouterXwing(){
    monXWing = document.createElement("canvas");
    monXWing.id = "leXWingDuGagnant";
    monXWing.style.position = "relative";
    monXWing.style.width = "69px";
    monXWing.style.height = "76px";
    monXWing.style.background = "url("+spriteSheet.src+")";

    document.getElementById("zoneDeJeu").appendChild(monXWing);
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
    alert("Voici les regles du jeu:\nUtilisez A pour lancer la partie.\nIl s'agit d'un jeu de type clicker. C'est à dire que vous devez cliquer autan de fois que possible sur le X-Wing dans le temps imparti.\nAttention! Vous ne connaissez pas le chrono et la vitesse du S-wing varie en fonction du milieu, c'est la Surprise Party du jeu! <(^-^)> Have Fun ¡!");
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
 * Permet de mettre à jour le compteur (uniquement si la partie est lancée) ainsi que son affichage
 * @param {integer} hausse 
 */
function mettreAJourCompteur(hausse){
    compteur = (statutPartie == 1) ? compteur + hausse : compteur;

    document.getElementById('zonePoints').innerHTML = compteur;
}

/**
 * Permet de modifier la tialle du texte
 * @param {integer} typeTaille 
 */
function changerTaille(typeTaille){
    let tailleFinale = "";

    switch(typeTaille){
        default:
            tailleFinale = "8px";
            break;
        case 1:
            tailleFinale = "8px";
            break;
        case 2:
            tailleFinale = "16px";
            break;
        case 3:
            tailleFinale = "25px";
            break;
    }

    document.getElementById("menuJeu").parentElement.style.fontSize = tailleFinale;
}