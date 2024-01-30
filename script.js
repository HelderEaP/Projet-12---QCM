class QCM{
    constructor(theme) {
        this.theme = theme;
        this.score = 0;
        this.idQuestion = 0;
        this.questionnary = [];
        this.answered = false;
        this.correction = [];
        this.correctionDisplaying = 0;
        this.correctionChecked = 0;
    }
    setTheme() {
        if(this.theme == "anime") {
            this.questionnary = anime;
        }
        if(this.theme == "games") {
            this.questionnary = games;
        }
    }
    setListerner(){
        console.log('ok')
        console.log(checkbox)
        for(let element of checkbox) {
            element.addEventListener('click', () => {
                let i = 0
                for(let check of checkbox){
                    if(check.checked) {
                        i++;
                    }
                }
                console.log(i)
                if(i > 0) {
                    next.disabled = false;
                } else {
                    next.disabled = true;
                }
            })
        }
    }
    createQuestion() {
        if(sessionStorage.getItem('id-question')) {
            this.idQuestion = sessionStorage.getItem('id-question');
        }
        qcm.style.display = "block";
        resultat.display = "none";
        question.innerText = this.questionnary[this.idQuestion].question;
        for(let i = 0; i < this.questionnary[this.idQuestion].reponses.length; i++) {
            reponses[i].innerText = this.questionnary[this.idQuestion].reponses[i];
        }
        for(let element of checkbox) {
            element.checked = false;
            next.disabled = true;
        }
    }
    setUserAnswer() {
        for(let userSelection of checkbox) {
            if(userSelection.checked) {
                this.questionnary[this.idQuestion].user.push(userSelection.value);
            }
        }
    }
    displayResult() {
        qcm.style.display = "none";
        resultat.style.display = "block";
        for(let i = 0; i < this.questionnary.length; i++) {
            if(this.questionnary[i].answer.length == this.questionnary[i].user.length) {
                let a = 0;
                for(let answer of this.questionnary[i].answer) {
                    if(this.questionnary[i].user.includes(answer)) {
                        a++;
                    }
                }
                if(a == this.questionnary[i].answer.length) {
                    this.score++;
                } else {
                    this.correction.push(i)
                }
            } else  {
                this.correction.push(i);
            }
        }
        score.innerText = this.score;
        if(this.score == 10) {
            commentaire.innerText = "Bravo!"
            correction.style.display = "none";
        } else {
            correction.style.display = "block";
            this.displayCorrection();
        }
    }
    displayCorrection() {
        let corrQuest = document.getElementById('corr-question');
        let questionToCorrection = this.questionnary[this.correction[this.correctionDisplaying]];
        corrQuest.innerText = questionToCorrection.question;
        for(let i = 0; i < questionToCorrection.reponses.length; i++) {
            if(questionToCorrection.answer.includes(`${i}`) && questionToCorrection.user.includes(`${i}`)) {
                corrReponses[i].innerText = questionToCorrection.reponses[i];
                corrReponses[i].classList.add('green');
                corrReponses[i].classList.remove('blue');
                corrReponses[i].classList.remove('red');
            } else if(questionToCorrection.answer.includes(`${i}`) && !questionToCorrection.user.includes(`${i}`)) {
                corrReponses[i].innerText = questionToCorrection.reponses[i];
                corrReponses[i].classList.remove('green');
                corrReponses[i].classList.add('blue');
                corrReponses[i].classList.remove('red');
            } else if(!questionToCorrection.answer.includes(`${i}`) && questionToCorrection.user.includes(`${i}`)) {
                corrReponses[i].innerText = questionToCorrection.reponses[i];
                corrReponses[i].classList.remove('green');
                corrReponses[i].classList.remove('blue');
                corrReponses[i].classList.add('red');
            } else {
                corrReponses[i].innerText = questionToCorrection.reponses[i];
                corrReponses[i].classList.remove('green');
                corrReponses[i].classList.remove('blue');
                corrReponses[i].classList.remove('red');
            }
        }
        commentaire.innerText = questionToCorrection.commentaire;
        this.correctionChecked++;
        if(this.correctionChecked == this.correction.length) {
            nextCorr.disabled = true;
        } else {
            nextCorr.disabled = false;
        }
    }
}

let anime = [{
    question : "Quel est le nom du personnage principal de Dragon Ball Z ?",
    reponses : ["Végéta", "Krilin", "Goku", "Bulma"],
    answer : ["2"],
    user: [],
    commentaire : "Goku est le personnage central de la saga Dragon Ball."
},
{
    question : "Quel est l'animé comportant le plus de personnage ?",
    reponses : ["Dragon Ball", "Fairy Tail", "Dr Slump", "Albator"],
    answer : ["1"],
    user: [],
    commentaire : "Fairy Tail compte plus d'une centaine de personnage développés."
},
{
    question : "Comment s'appelle le héros de One Piece ?",
    reponses : ["Monkey D. Dragon", "Monkey D. Luffy", "Monkey Man", "Saitama"],
    answer : ["1"],
    user: [],
    commentaire : "Monkey D. Luffy, ou Luffy au châpeau de paille."
},
{
    question : "Parmi ces personnages, lesquels sont des chevaliers ?",
    reponses : ["Seiya", "Gilthunder", "Tanjiro", "Roronoa Zoro"],
    answer : ["0", "1"],
    user: [],
    commentaire : "Seiya, chevalier de pégase dans Saint Seiya, et Gilthunder, chevalier sacré dans Seven Deadly Sins."
},
{
    question : "Quel est l'élément de prédilection de Sasuke Uchiha ?",
    reponses : ["Feu", "Vent", "Eau", "Foudre"],
    answer : ["0", "3"],
    user: [],
    commentaire : "Sasuke a la rare particularité d'avoir une double affinité avec le feu et la foudre."
},
{
    question : "Lorsque Naruto deviens enfin Hokage, quel numéro porte t-il ?",
    reponses : ["5", "6", "7", "8"],
    answer : ["2"],
    user: [],
    commentaire : "Après Minato le 4e, Tsunade la 5e et Kakashi le 6e, Naruto est le 7e Hokage."
},
{
    question : "Meliodas est le capitaine d'un ordre préstigieux de chevaliers sacrés, mais combien sont-ils ?",
    reponses : ["5", "7", "9", "12"],
    answer : ["1"],
    user: [],
    commentaire : "L'ordre des Seven Deadly Sins, les 7 péchés capitaux, compte 7 membres, chacun incarnant l'un des péchés."
},
{
    question : "Le prince Tristan, fils de Meliodas et Elizabeth, est issu de quel clan ?",
    reponses : ["Démons", "Fées", "Géants", "Déesses"],
    answer : ["0", "3"],
    user: [],
    commentaire : "Meliodas, issu du clan des Démons et Elizabeth, issu du clan des Déesses, leur fils est donc issu de ces 2 clans."
},
{
    question : "Comment s'appelle le souffle de Tanjiro ?",
    reponses : ["souffle du feu", "soufle de l'eau", "souffle du soleil", "souffle fort"],
    answer : ["1", "2"],
    user: [],
    commentaire : "Tanjiro a été formé au souffle de l'eau, par le biais de son père, il maitrise aussi le souffle du soleil."
},
{
    question : "Jusqu'à présent, Luffy a vaincu tout ses ennemis, sauf 1, lequel ?",
    reponses : ["Big Mom", "Kaido", "Shanks", "Barbe Noire"],
    answer : ["0"],
    user: [],
    commentaire : "Big Mom est la seule à l'heure actuelle qui a affrontés Luffy et qui n'a pas été vaincu."
}]
let games = [{
    question : "Parmi les choix suivant lesquelq sont des licences de combat ?",
    reponses : ["Fifa", "Kirby", "Uncharted", "Tekken"],
    answer : ["3"],
    user: [],
    commentaire : "Fifa est une licence de foot, Kirby de plateforme, Uncharted d'aventure, et Tekken de combat."
},
{
    question : "Dans quel extension de World Of Warcraft affronte t-on Illidan Hurlorage ?",
    reponses : ["Wrath of the Lich King", "Legion", "Burning Crusade", "Mist of Pandaria"],
    answer : ["2"],
    user: [],
    commentaire : "Illidan est le boss final de la 1ere extension de World of Warcraft, Burning Crusade."
},
{
    question : "Dans Hogwart Legacy, quel est le premier sort que nous maitrisons à Poudlard ?",
    reponses : ["Lancer basic", "Revelio", "Accio", "Levioso"],
    answer : ["2", "3"],
    user: [],
    commentaire : "Accio et Levioso sont les 2 premiers sort que nous apprenons à Poudlard, les autres sont appris avant notre arrivée dans l'école de magie."
},
{
    question : "Dans Monster Hunter World, quel est le premier gros monstres que nous croisons ?",
    reponses : ["Grans Jagras", "Anjanath", "Zorah Magdaros", "Kulu Yaku"],
    answer : ["2"],
    user: [],
    commentaire : "Le Zorah Magdaros est le premier grand monstre que nous croisons dans le jeu, notre navire s'échoue dessus et le tutoriel se déroule sur son dos."
},
{
    question : "Combien de princesse existe t-il dans l'univers de Mario ?",
    reponses : ["1", "2", "3", "4"],
    answer : ["2"],
    user: [],
    commentaire : "Princesse Peach, Princesse Daisy et Princesse Hamony, donc 3."
},
{
    question : "Quel a été le premier ennemi de Mario ?",
    reponses : ["Donkey Kong", "Bowser", "bébé Bowser", "Luigi"],
    answer : ["0"],
    user: [],
    commentaire : "Donkey Kong a été le premier ennemi de Mario, alors qu'il ne s'appeler encore que JumpMan."
},
{
    question : "La Licence Final Fantasy est une licence de RPG, un seul opus fit exception, lequel ?",
    reponses : ["Dirge of Cerberus", "Lightning's Return", "Advent Children", "Crisis Core"],
    answer : ["0"],
    user: [],
    commentaire : "Advent Children est un film,mais Dirge Of Cerberus est un FPS et non un RPG."
},
{
    question : "Avant l'ère de la dématérialisation, les consoles de jeu avait besoin d'un support physique pour lancer un jeu, sauf une console, laquelle ?",
    reponses : ["Atari 2600", "Commodore 64", "Sega Master System", "Nintendo 64"],
    answer : ["2"],
    user: [],
    commentaire : "La Sega Master System permettait de lancer le jeu Alex Kidd in Miracle World si on en mettait pas de cartouche de jeu."
},
{
    question : "Quelle Licence de jeu de combat est dérive d'une célèbre licence de RPG ?",
    reponses : ["Super Smash Bros", "Dissidia", "Tekken", "Street Fighter"],
    answer : ["1"],
    user: [],
    commentaire : "Super Smash Bros rassemble de nombreuse licence différentes, Dissidia rassemble uniquement des personnages de la licence Final Fantasy."
},
{
    question : "Quel était le premier jeu sur mobile ?",
    reponses : ["Solitaire", "Oacman", "Pong", "Snake"],
    answer : ["3"],
    user: [],
    commentaire : "Snake est le premier jeu a avoir été intégré dans des téléphones nobiles."
}]
let question = document.getElementById('question');
let reponses = document.getElementsByClassName('reponses');
let next = document.getElementById('next');
let score = document.getElementById('score');
let correction = document.getElementById('correction');
let qcm = document.getElementById('QCM');
let resultat = document.getElementById('resultat');
let theme = document.getElementById('theme');
let themeChoice = document.getElementById('theme-choice');
let corrQuestion = document.getElementById('corr-question');
let corrReponses = document.getElementsByClassName('corr-reponses')
let commentaire = document.getElementById('commentaire');
let checkbox = document.getElementsByClassName('checkbox');
let nextCorr = document.getElementById('next-corr');
let party;

if(sessionStorage.getItem('theme-selected')) {
    party = new QCM(sessionStorage.getItem('theme-selected'));
    qcm.style.display = "flex"
    party.setTheme();
    party.setListerner();
    party.createQuestion();
}

themeChoice.addEventListener('click', () => {
    sessionStorage.setItem('theme-selected', theme.value);
    location.reload();
})

next.addEventListener('click', () => {
    if(party.idQuestion < 9) {
        party.setUserAnswer();
        party.idQuestion++;
        party.createQuestion();
    } else {
        party.setUserAnswer();
        party.displayResult();
    }
})
nextCorr.addEventListener('click', () => {
    party.correctionDisplaying++;
    party.displayCorrection();
})