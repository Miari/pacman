let pacman = document.getElementById("pacman");
let playarea = document.getElementById("playarea");
let score = document.getElementById("score");
let scoreHeader = document.getElementById("score-header");
//const widthOfPlayArea = document.getElementById("playarea").style.width;
const widthOfPlayArea = 600;
const heightOfPlayArea = 240;
const step = 30;
//console.log("!" + document.getElementById("playarea").style.width);



let test = document.getElementById("test");

const numberOfHorizontalDots = widthOfPlayArea / step;
const numberOfVerticalDots = heightOfPlayArea / step;
const arrayHorizontal = new Array(numberOfHorizontalDots);

class Playarea {
  constructor(areaWidth, areaHeight) {
    this.areaWidth = areaWidth;
    this.areaHeight = areaHeight;
    this.currentScore = 0;
    this.createDotStorage();
  }

  createDotStorage() {
    for (let i = 0; i < arrayHorizontal.length; i++) {
      arrayHorizontal[i] = new Array(numberOfVerticalDots);
    }

    for (let i = 0; i < numberOfHorizontalDots; i++) {
      for (let j = 0; j < numberOfVerticalDots; j++) {
        arrayHorizontal[i][j] = true;
      }
    }
  }

  eatDot(firstIndex, secondIndex) {
    if (arrayHorizontal[firstIndex][secondIndex]) {
      arrayHorizontal[firstIndex][secondIndex] = false;
      this.currentScore++;
      score.innerHTML = this.currentScore;
      let div = document.createElement('div');
      div.className = "eaten";
      div.style.marginLeft = firstIndex * step + 'px';
      div.style.marginTop = secondIndex * step + 'px';
      playarea.append(div);
    }
    if (this.currentScore === 160) {
      scoreHeader.innerHTML = "You won!!!";
      scoreHeader.style.color = "red";
      scoreHeader.style.animation = "win 1.5s infinite linear";
    }
  }

  /*printArray() { //temporaryFunction
    /*for (let i = 0; i < numberOfHorizontalDots; i++) {
      for (let j = 0; j < numberOfVerticalDots; j++) {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        console.log(("i = " + i + " j = " + j + " value = " + arrayHorizontal[i][j] + " "));
      }
    }
  }*/
}

const myPlayArea = new Playarea(widthOfPlayArea, heightOfPlayArea);

class Pacman {
  constructor(positionMarginLeft, positionMarginTop) {
    this.positionMarginLeft = positionMarginLeft;
    this.positionMarginTop = positionMarginTop;
  }

  moveRight() {
    if (this.positionMarginLeft + step < widthOfPlayArea) {
      this.positionMarginLeft += step;
      pacman.style.marginLeft = this.positionMarginLeft + 'px';
      pacman.style.animation = "eatRight 0.4s infinite linear";
      pacman.style.background = "conic-gradient(yellow 55deg, transparent 55deg 125deg, yellow 0)";
      if (this.positionMarginLeft % step === 0 && this.positionMarginTop % step === 0) myPlayArea.eatDot(this.positionMarginLeft / step, this.positionMarginTop / step);
    }
  }

  moveLeft() {
    if (this.positionMarginLeft > 0) {
      this.positionMarginLeft -= step;
      pacman.style.marginLeft = this.positionMarginLeft + 'px';
      pacman.style.background = "conic-gradient(yellow 235deg, transparent 0 310deg, yellow 0)";
      pacman.style.animation = "eatLeft 0.4s infinite linear";
      if (this.positionMarginLeft % step === 0 && this.positionMarginTop % step === 0) myPlayArea.eatDot(this.positionMarginLeft / step, this.positionMarginTop / step);
    }
  }

  moveUp() {
    if (this.positionMarginTop > 0) {
      this.positionMarginTop -= step;
      pacman.style.marginTop = this.positionMarginTop + 'px';
      pacman.style.background = "conic-gradient(transparent 0 45deg, yellow 45deg 320deg, transparent 0 0)";
      pacman.style.animation = "eatUp 0.4s infinite linear";
      if (this.positionMarginLeft % step === 0 && this.positionMarginTop % step === 0) myPlayArea.eatDot(this.positionMarginLeft / step, this.positionMarginTop / step);
    }
  }

  moveDown() {
    if (this.positionMarginTop + step < heightOfPlayArea) {
      this.positionMarginTop += step;
      pacman.style.marginTop = this.positionMarginTop + 'px';
      pacman.style.background = "conic-gradient(yellow 140deg, transparent 0 215deg, yellow 0)";
      pacman.style.animation = "eatDown 0.4s infinite linear";
      if (this.positionMarginLeft % step === 0 && this.positionMarginTop % step === 0) myPlayArea.eatDot(this.positionMarginLeft / step, this.positionMarginTop / step);
    }
  }
}


const myPacman = new Pacman(0, 0);
const keyArrowEvents = ['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown'];

document.addEventListener('keydown', (e) => {
  if (e.code === 'ArrowRight') myPacman.moveRight();
  if (e.code === 'ArrowLeft') myPacman.moveLeft();
  if (e.code === 'ArrowUp') myPacman.moveUp();
  if (e.code === 'ArrowDown') myPacman.moveDown();
})

document.addEventListener('keyup', (e) => {
  if (keyArrowEvents.includes(e.code)) pacman.style.removeProperty('animation');
})

