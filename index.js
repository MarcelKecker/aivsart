let score = 0
let idIndex = 0
class Art {
    position
    constructor(id) {
        this.id = id;
    }
}

class ArtAI extends Art{
    constructor(id) {
        super(id);
        this.id = "aiArt/" + this.id + ".png"
    }
}
class ArtHuman extends Art{
    constructor(id) {
        super(id);
        this.id = "humanArt/" + this.id + ".png"
    }
}

let ids = [
    "astronaut",
    "berlinBalls",
]

function getPosition(art) {
    if (isInString(art.id, "Left")) {
        return "Left"
    } else if (isInString(art.id, "Right")) {
        return "Right"
    }
}
createLvl()
function createLvl() {
    document.getElementById("correctLeft").hidden = true;
    document.getElementById("correctRight").hidden = true;
    document.getElementById("wrongLeft").hidden = true;
    document.getElementById("wrongRight").hidden = true;
    document.getElementById("humanArtInfosLeft").hidden = true;
    document.getElementById("humanArtInfosRight").hidden = true;
    idIndex = Math.floor(Math.random()*artworks.length)
    let aiArt = new ArtAI(artworks[idIndex].id)
    let humanArt = new ArtHuman(artworks[idIndex].id)
    let aiIsLeft = Math.floor(Math.random() * 2)
    if (aiIsLeft == 1) {
        document.getElementById("imgLeft").src=aiArt.id
        document.getElementById("imgRight").src=humanArt.id
    } else if (aiIsLeft == 0) {
        document.getElementById("imgLeft").src=humanArt.id
        document.getElementById("imgRight").src=aiArt.id
    } else {
    }
    document.getElementById("nextRound").disabled = true;
}

function isInString (string1, string2) {
    if (string2.length > string1.length) {
        let helpString = string1
        string1 = string2
        string2 = helpString
    }
    for (let i = 0; i < string1.length; i++) {
            for (let j = 0; j < string2.length; j++) {
                if (string1.charAt(i+j) !== string2.charAt(j)) {
                    break
                }
                if (j+1 === string2.length) {
                    return true;
                }
            }
    }
    return false;
}

function getArtwork(id) {
    for (let i = 0; i < artworks.length; i++) {
        if (isInString(id, artworks[i].id)) {
            return artworks[i];
        }
    }
    return null;
}

function passeScoreAn(roundWon) {
    if (roundWon) {
        score++;
    } else {
        score = 0;
    }
    let scoreString = document.getElementById("score").innerHTML
    document.getElementById("score").innerHTML = scoreString.replace(scoreString.charAt(7), score)
}

function roundLost(art) {
    showArtistInfos(false, art);
    animateWrongSreen(getPosition(art))
    passeScoreAn(false)
}

function roundWon(art) {
    showArtistInfos(true, art);
    animateCorrectSreen(getPosition(art));
    passeScoreAn(true)
}

function animateCorrectSreen(position) {
    let elementCorrectScreen = document.getElementById("correct" + position)
    elementCorrectScreen.hidden = false;
    gsap.fromTo(elementCorrectScreen, {y: 0}, {y: 128, duration: 0.5})
}

function animateWrongSreen(position) {
    let elementWrongScreen = document.getElementById("wrong" + position)
    elementWrongScreen.hidden = false;
    console.log(elementWrongScreen.hidden)
    gsap.fromTo(elementWrongScreen, {y: 0}, {y: 128, duration: 0.5})
}

function animateArtistInfo(position) {
    let elementArtistInfo = document.getElementById("humanArtInfos" + position)
    gsap.fromTo(elementArtistInfo, {opacity: 0}, {opacity: 1, duration: 1})
}

function showArtistInfos(roundWon, art) {
    let position
    if ((getPosition(art) === "Left" && roundWon) || (getPosition(art) === "Right"&& !roundWon)) {
        position = "Left"
    } else {
        position = "Right"
    }
    document.getElementById("humanArtInfos" + position).hidden = false;
    document.getElementById("artistInfo" + position + "Name").innerHTML = "Name: " + artworks[idIndex].name
    document.getElementById("artistInfo" + position + "Artist").innerHTML = "Artist: " + artworks[idIndex].artist
    document.getElementById("artistInfo" + position + "PriceSold").innerHTML = "Price Sold: " + artworks[idIndex].priceSold
    animateArtistInfo(position)
}

function artKlicked(art) {
    if (!document.getElementById("humanArtInfosRight").hidden || !document.getElementById("humanArtInfosLeft").hidden) {
        return
    }
    document.getElementById("nextRound").disabled = false;
    if (isInString(art.src, "humanArt")) {
        roundWon(art)

    } else {
        roundLost(art)
    }
}