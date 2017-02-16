var thePlantElt = document.getElementById("thePlant");
var menuSections = ["upgradesSection", "achievementsSection", "optionsSection", "friendsSection"];

var growPoints = 0;
var stade1GP = 10;
var stade2GP = 30;
var stade3GP = 100;

var planteType = "INIT";

var m1 = 0;
var m2 = 0;

var typeA = ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10", "A11", "A12", "A13", "A14", "A15", "A16", "A17", "A18", "A19", "A20"];
var typeB = ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "B10", "B11", "B12", "B13", "B14", "B15", "B16", "B17", "B18", "B19", "B20"];
var typeC = ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "C10", "C11", "C12", "C13", "C14", "C15", "C16", "C17", "C18", "C19", "C20"];
var typeD = ["D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9", "D10", "D11", "D12", "D13", "D14", "D15", "D16", "D17", "D18", "D19", "D20"];

var typeR = ["R1", "R2", "R3", "R4", "R5", "R6", "R7", "R8", "R9", "R10"];
var step = 0;

var Achievement = {

    unlock: false,

    init: function (name) {
        this.name = name;
    },

    decrire: function () {
        var description = this.name + " (" + this.unlock + ")";
        return description;
    }
};

var achievements = [];
for (i = 0; i < typeA.length; i++) {
    achievements[2 * i] = Object.create(Achievement);
    achievements[2 * i].init("Super tu as fait pousser une plante " + typeA[i]);
    achievements[1 + 2 * i] = Object.create(Achievement);
    achievements[1 + 2 * i].init("Super tu as fait pousser dix plantes " + typeA[i]);

    achievements[40 + 2 * i] = Object.create(Achievement);
    achievements[40 + 2 * i].init("Super tu as fait pousser une plante " + typeB[i]);
    achievements[40 + 1 + 2 * i] = Object.create(Achievement);
    achievements[40 + 1 + 2 * i].init("Super tu as fait pousser dix plantes " + typeB[i]);

    achievements[80 + 2 * i] = Object.create(Achievement);
    achievements[80 + 2 * i].init("Super tu as fait pousser une plante " + typeC[i]);
    achievements[80 + 1 + 2 * i] = Object.create(Achievement);
    achievements[80 + 1 + 2 * i].init("Super tu as fait pousser dix plantes " + typeC[i]);

    achievements[120 + 2 * i] = Object.create(Achievement);
    achievements[120 + 2 * i].init("Super tu as fait pousser une plante " + typeD[i]);
    achievements[120 + 1 + 2 * i] = Object.create(Achievement);
    achievements[120 + 1 + 2 * i].init("Super tu as fait pousser dix plantes " + typeD[i]);
}

for (i = 0; i < typeR.length; i++) {
    achievements[160 + 2 * i] = Object.create(Achievement);
    achievements[160 + 2 * i].init("Super tu as fait pousser une plante " + typeA[i]);
    achievements[160 + 1 + 2 * i] = Object.create(Achievement);
    achievements[160 + 1 + 2 * i].init("Super tu as fait pousser dix plantes " + typeA[i]);
}


setInterval(addGrowPoint, 100);

function addGrowPoint() {
    growPoints++;
    document.getElementById("growPoint").textContent = "Grow Points: " + growPoints;
    if (growPoints < stade1GP) {
        thePlantElt.textContent = "Une graine";
    }
    if (growPoints == stade1GP) {
        thePlantElt.textContent = "Une mignonne petite pousse de type " + planteType;
    }
    if (growPoints == stade2GP) {
        thePlantElt.textContent = "Une belle petite plante de type " + planteType;
    }
    if (growPoints == stade3GP) {
        thePlantElt.textContent = "Une plante adulte de type " + planteType;
        addMutagen();
    }
}


function addMutagen() {

    m1 = Math.floor((Math.random() * 4) + 1);
    m2 = Math.floor((Math.random() * 4) + 1);

    while (m1 === m2) {
        m2 = Math.floor((Math.random() * 4) + 1);
    }

    document.getElementById("m1Button").textContent = "Mutagène " + m1;
    document.getElementById("m2Button").textContent = "Mutagène " + m2;
    document.getElementById("choose").style.display = "inline";



    document.getElementById("m1Button").addEventListener("click", f1);

    function f1(e) {
        document.getElementById("choose").style.display = "none";

        changeType(m1);
        growPoints = 0;
        e.stopPropagation(); // Arrêt de la propagation de l'événement
        document.getElementById("m1Button").removeEventListener("click", f1);

        document.getElementById("m2Button").removeEventListener("click", f2);
    };

    document.getElementById("m2Button").addEventListener("click", f2);

    function f2(e) {
        document.getElementById("choose").style.display = "none";
        changeType(m2);
        growPoints = 0;
        e.stopPropagation(); // Arrêt de la propagation de l'événement
        document.getElementById("m1Button").removeEventListener("click", f1);

        document.getElementById("m2Button").removeEventListener("click", f2);
    };



}

function changeType(chosenM) {
    step++;
    document.getElementById("step").textContent = "Step: " + step;

    if (step === 1) {
        switch (chosenM) {
        case 1:
            planteType = typeA[Math.floor((Math.random() * 5))];
            break;
        case 2:
            planteType = typeB[Math.floor((Math.random() * 5))];
            break;
        case 3:
            planteType = typeC[Math.floor((Math.random() * 5))];
            break;
        case 4:
            planteType = typeD[Math.floor((Math.random() * 5))];
            break;
        default:
            console.error("Cannot chose a Plant type.");
        }
    } else {
        if (step < 16) {
            var poolSize = step + 4;
        } else {
            var poolSize = 20;
        }
        if (chosenM === 4) {
            switch (Math.floor((Math.random() * 4) + 1)) {
            case 1:
                planteType = typeA[Math.floor((Math.random() * poolSize))];
                break;
            case 2:
                planteType = typeB[Math.floor((Math.random() * poolSize))];
                break;
            case 3:
                planteType = typeC[Math.floor((Math.random() * poolSize))];
                break;
            case 4:
                planteType = typeD[Math.floor((Math.random() * poolSize))];
                break;
            default:
                console.error("Cannot chose a Plant type.");
            }
        } else {
            switch (planteType[0]) {
            case "A":
                if (chosenM === 5) {
                    if (Math.floor((Math.random() * 2) + 1) == 1) {
                        planteType = typeR[(Math.random() * floor(poolSize / 2)) + 1];
                    }
                } else {
                    planteType = typeA[Math.floor((Math.random() * poolSize))];
                }
                break;
            case "B":
                if (chosenM === 5) {
                    if (Math.floor((Math.random() * 2) + 1) == 1) {
                        planteType = typeR[(Math.random() * floor(poolSize / 2)) + 1];
                    }
                } else {
                    planteType = typeB[Math.floor((Math.random() * poolSize))];
                }
                break;
            case "C":
                if (chosenM === 5) {
                    if (Math.floor((Math.random() * 2) + 1) == 1) {
                        planteType = typeR[(Math.random() * floor(poolSize / 2)) + 1];
                    }
                } else {
                    planteType = typeC[Math.floor((Math.random() * poolSize))];
                }
                break;
            case "D":
                if (chosenM === 5) {
                    if (Math.floor((Math.random() * 2) + 1) == 1) {
                        planteType = typeR[(Math.random() * floor(poolSize / 2)) + 1];
                    }
                } else {
                    planteType = typeD[Math.floor((Math.random() * poolSize))];
                }
                break;
            default:
                console.error("Cannot chose a Plant type.");
            }
        }

    }

}


//-----------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------- STATS --------------------------------------------------------//
//-----------------------------------------------------------------------------------------------------------------------//



//-----------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------- MENUS --------------------------------------------------------//
//-----------------------------------------------------------------------------------------------------------------------//

document.getElementById("upgradesButton").addEventListener("click", function (e) {
    afficherMenu("upgradesSection");
    e.stopPropagation(); // Arrêt de la propagation de l'événement
});

document.getElementById("achievementsButton").addEventListener("click", function (e) {
    afficherMenu("achievementsSection");
    e.stopPropagation(); // Arrêt de la propagation de l'événement
});

document.getElementById("optionsButton").addEventListener("click", function (e) {
    afficherMenu("optionsSection");
    e.stopPropagation(); // Arrêt de la propagation de l'événement
});

document.getElementById("friendsButton").addEventListener("click", function (e) {
    afficherMenu("friendsSection");
    e.stopPropagation(); // Arrêt de la propagation de l'événement
});


function afficherMenu(menu) {

    for (var i = 0; i < menuSections.length; i++) {
        if (menu != menuSections[i]) {
            console.log("dans le IF");
            document.getElementById(menuSections[i]).style.display = "none";

        } else {
            document.getElementById(menuSections[i]).style.display = "inline";
        }

    }

}

/*
// Renvoie le nom du bouton souris à partir de son code
function getBoutonSouris(code) {
    var bouton = "inconnu";
    switch (code) {
    case 0: // 0 est le code du bouton gauche
        bouton = "gauche";
        break;
    case 1: // 1 est le code du bouton du milieu
        bouton = "milieu";
        break;
    case 2: // 2 est le code du bouton droit
        bouton = "droit";
        break;
    }
    return bouton;
}

// Affiche des informations sur un événement souris
function infosSouris(e) {
    console.log("Evènement souris : " + e.type + ", bouton " +
        getBoutonSouris(e.button) + ", X : " + e.clientX + ", Y : " + e.clientY);
}

// Gestion du clic souris
document.addEventListener("click", infosSouris);

*/
/*
document.querySelectorAll(".mid li")[1].textContent += ' LOL';
/*

/*
var Elts = document.querySelectorAll(".left h1");
for (var i = 0; i < Elts.length; i++) {
    console.log(Elts[i]);
}
*/
/*
var titresElts = document.getElementsByTagName("h2"); // Tous les titres h2
console.log(titresElts[0]); // Affiche le premier titre h2
console.log(titresElts.length); // Affiche 

function afficherEnfant(noeud, indice)
{
    if(noeud.nodeType != document.ELEMENT_NODE)
    {
        console.error("Type de noeud incorrect");
    }
    else
    {
        if (indice >= noeud.childNodes.length || indice < 0)
        {
            console.error("Indice incorrect");
    
        } 
        else 
        {
            var enfant = noeud.childNodes[indice]; 
            console.log(enfant);

        }
        
        
    }
}

// Doit afficher le noeud h1
afficherEnfant(document.body, 1);

// Doit afficher l'erreur "Indice incorrect"
// L'indice demandé est négatif
afficherEnfant(document.body, -1);

// Doit afficher l'erreur "Indice incorrect"
// Le noeud body a moins de 9 noeuds enfants
afficherEnfant(document.body, 8);

// Doit afficher l'erreur "Type de noeud incorrect"
// Le premier noeud enfant de body est textuel et n'a donc pas d'enfants
afficherEnfant(document.body.childNodes[0], 0);
*/
/*
var h = document.head; // La variable h contient l'objet head du DOM
console.log(h);

var b = document.body; // La variable b contient l'objet body du DOM
console.log(b);

if (document.body.nodeType === document.ELEMENT_NODE) {
    console.log("Body est un noeud élément");
} else {
    console.log("Body est un noeud textuel");
}

*/
//EXEMPLE TABLEAUX
/*
var Film = {
    // Initialise le film
    init: function (titre, annee) {
        this.titre = titre;
        this.annee = annee;
    },
    // Renvoie la description du film
    decrire: function () {
        var description = this.titre + " (" + this.annee + ")";
        return description;
    }
};

var film1 = Object.create(Film);
film1.init("Le loup de Wall Street", 2013);

var film2 = Object.create(Film);
film2.init("Vice-Versa", 2015);

var film3 = Object.create(Film);
film3.init("Babysitting", 2013);

var films = [];
films.push(film1);
films.push(film2);
films.push(film3);

films.forEach(function (film) {
    console.log(film.decrire());
});
*/

//EXEMPLE POO
/*
//Objet Personnage
var Personnage = {
    nom: "Nom",
    sante: 0,
    force: 0,
    
    // Initialise le personnage
    initPerso: function (nom, sante, force) {
        this.nom = nom;
        this.sante = sante;
        this.force = force;
    },
    // Attaque un personnage cible
    attaquer: function (cible) {
        if (this.sante > 0) {
            var degats = this.force;
            console.log(this.nom + " attaque " + cible.nom + " et lui fait " + degats + " points de dégâts");
            cible.sante = cible.sante - degats;
            if (cible.sante > 0) {
                console.log(cible.nom + " a encore " + cible.sante + " points de vie");
            } else {
                cible.sante = 0;
                console.log(cible.nom + " est mort !");
            }
        } else {
            console.log(this.nom + " ne peut pas attaquer : il est mort...");
        }
    }
};

//Objet Joueur (avec Peronnage comme prototype)
var Joueur = Object.create(Personnage);
{
// Initialise le joueur
Joueur.initJoueur = function (nom, sante, force) {
    this.initPerso(nom, sante, force);
    this.xp = 0;
};
// Renvoie la description du joueur
Joueur.decrire = function () {
    var description = this.nom + " a " + this.sante + " points de vie, " +
        this.force + " en force et " + this.xp + " points d'expérience";
    return description;
};
// Combat un adversaire
Joueur.combattre = function (adversaire) {
    this.attaquer(adversaire);
    if (adversaire.sante === 0) {
        console.log(this.nom + " a tué " + adversaire.nom + " et gagne " +
            adversaire.valeur + " points d'expérience");
        this.xp += adversaire.valeur;
    }
};
}

//Object Adversaire (avec Personnage comme prototype)
var Adversaire = Object.create(Personnage);
{
// Initialise l'adversaire
Adversaire.initAdversaire = function (nom, sante, force, race, valeur) {
    this.initPerso(nom, sante, force);
    this.race = race;
    this.valeur = valeur;
};
}

//MAIN
var joueur1 = Object.create(Joueur);
joueur1.initJoueur("Aurora", 150, 25);

var joueur2 = Object.create(Joueur);
joueur2.initJoueur("Glacius", 130, 30);

console.log("Bienvenue dans ce jeu d'aventure ! Voici nos courageux héros :");
console.log(joueur1.decrire());
console.log(joueur2.decrire());

var monstre = Object.create(Adversaire);
monstre.initAdversaire("ZogZog", 40, 20, "orc", 10);

console.log("Un affreux monstre arrive : c'est un " + monstre.race + " nommé " + monstre.nom);

monstre.attaquer(joueur1);
monstre.attaquer(joueur2);

joueur1.combattre(monstre);
joueur2.combattre(monstre);

console.log(joueur1.decrire());
console.log(joueur2.decrire());
*/

//EXEMPLE POO SIMPLE
/*
var perso = {
    nom: "Aurora",
    sante: 150,
    force: 25,

    // Renvoie la description du personnage
    decrire: function () {
        var description = this.nom + " a " + this.sante + " points de vie et " +
            this.force + " en force";
        return description;
    }
};

alert(perso.decrire());

// Aurora est blessée par une flèche
perso.sante = perso.sante - 20;

// Aurora trouve un bracelet de force
perso.force = perso.force + 10;

alert(perso.decrire());
*/
//JOUER AVEC CHAINE DE CHARACTERES
/*
var mot = prompt("Choisis un mot.");

alert("Il s'écrit en minuscules " + mot.toLowerCase());

alert("Il s'écrit en majuscules " + mot.toUpperCase());

motMinuscule = mot.toLowerCase();
var compteur =0;

for(var i=0; i < mot.length; i++)
{
    

    if (motMinuscule[i] === "a" || motMinuscule[i] === "e"|| motMinuscule[i] === "i"|| motMinuscule[i] === "o"|| motMinuscule[i] === "u"|| motMinuscule[i] === "y")
    {
        compteur++;
        
    }
    var nbVoyelles = compteur;
    var nbConsonnes = motMinuscule.length - compteur;
                
}

alert("Il contient "+nbVoyelles+" voyelle(s) et "+nbConsonnes+" consonne(s).");

var envers = "";

for(var i=mot.length; i > 0; i--)
{
    envers = envers + mot[i-1];
}

alert("Il s'écrit à l'envers "+ envers +".");

if(envers == mot)
{
    alert("C'est un palindrome.");
}
else
{
    alert("Ce n'est pas un palindrome.")
}

*/

//EXEMPLE DE SWITCH
/*
function calculer(nb1, operateur, nb2) {

    
    switch (operateur) {
        case ("+"):
            return nb1 + nb2;
        case ("-"):
            return nb1 - nb2;
        case ("*"):
            return nb1 * nb2;
        case ("/"):
            return nb1 / nb2;
        default:
            return "Je ne comprends pas."

    }
    



}

// TODO : écrire la fonction calculer()

console.log(calculer(4, "+", 6)); // Doit afficher 10
console.log(calculer(4, "-", 6)); // Doit afficher -2
console.log(calculer(2, "*", 0)); // Doit afficher 0
console.log(calculer(12, "/", 0)); // Doit afficher Infinity

*/

//EXEMPLE DE FONCTION
/*
// Renvoie un message de bienvenue
function direBonjour(prenom, nom) {
    var message = "Bonjour, " + prenom + " " + nom + " !";
    return message;
}

var prenom = prompt("Quel est ton prénom ?");
var nom = prompt("Quel est ton nom ?");

var reponse = direBonjour(prenom, nom);
alert(reponse);

*/