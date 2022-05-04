let pacman = document.getElementById("pacman");
let ghost = document.getElementById("ghost");
console.log(ghost);
let playarea = document.getElementById("playarea");
let score = document.getElementById("score");
let scoreHeader = document.getElementById("score-header");
let gameFinished = false;
let gameWin = false;
const widthOfPlayArea = 600;
const heightOfPlayArea = 240;
const step = 30;

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
      gameWin = true;
      gameFinished = true;
      this.letItWin();
    }
  }

  letItWin() {
    scoreHeader.innerHTML = "You won!!!";
    scoreHeader.style.animation = "win 1.5s infinite linear";
  }

  letItLose() {
    scoreHeader.innerHTML = "You lose :(";
    ghost.style.animation = "lose 1.5s infinite linear";
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

class Ghost {
  constructor(positionMarginLeft, positionMarginTop) {
    this.positionMarginLeft = positionMarginLeft;
    this.positionMarginTop = positionMarginTop;
    this.numberOfSteps = this.getRandom(1, 21);
    this.numberOfStepsDone = 0;
    this.currentDirection = 'right';
  }

  moveGhost() {
    if (gameFinished === false) {
      setTimeout(() => this.moveGhost(), 200);
      if (this.numberOfStepsReached()) {
        //console.log("reached");
        this.numberOfStepsDone = 0;
        this.numberOfSteps = this.getRandom(1, 21);
        this.defineCurrentDirection();
        /*console.log("new numbers set");
        console.log("new Direction is " + this.currentDirection);*/
      } else {
        if (this.currentDirection === 'right') {
          if (this.positionMarginLeft + step < widthOfPlayArea) {
            this.positionMarginLeft += step;
          } else {
            this.currentDirection = 'left';
            this.positionMarginLeft -= step;
          }
          ghost.style.marginLeft = this.positionMarginLeft + 'px';
        }

        if (this.currentDirection === 'left') {
          if (this.positionMarginLeft > 0) {
            this.positionMarginLeft -= step;
          } else {
            this.currentDirection = 'right';
            this.positionMarginLeft += step;
          }
          ghost.style.marginLeft = this.positionMarginLeft + 'px';
        }

        if (this.currentDirection === 'down') {
          if (this.positionMarginTop + step < heightOfPlayArea) {
            this.positionMarginTop += step;
          } else {
            this.currentDirection = 'top';
            this.positionMarginLeft -= step;
          }
          ghost.style.marginTop = this.positionMarginTop + 'px';
        }

        if (this.currentDirection === 'top') {
          if (this.positionMarginTop > 0) {
            this.positionMarginTop -= step;
          } else {
            this.currentDirection = 'down';
            this.positionMarginLeft += step;
          }
          ghost.style.marginTop = this.positionMarginTop + 'px';
        }
        checkIfEated();
        this.numberOfStepsDone += 1;
      }
    }
  }

  getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  numberOfStepsReached() {
    //console.log("number of steps " + this.numberOfSteps);
    //console.log("unmber of steps done " + this.numberOfStepsDone);
    return this.numberOfStepsDone < this.numberOfSteps ? false : true;
  }

  defineCurrentDirection() {
    const number = this.getRandom(1, 5);
    if (number === 1)
      if (this.currentDirection === "left") this.defineCurrentDirection()
      else this.currentDirection = "left";

    if (number === 2)
      if (this.currentDirection === "right") this.defineCurrentDirection()
    this.currentDirection = "right";

    if (number === 3)
      if (this.currentDirection === "down") this.defineCurrentDirection()
      else this.currentDirection = "down";

    if (number === 4)
      if (this.currentDirection === "top") this.defineCurrentDirection()
      else this.currentDirection = "top";
  }
}

const firstGhost = new Ghost(300, 120);
setTimeout(() => firstGhost.moveGhost(), 1000);

class Pacman {
  constructor(positionMarginLeft, positionMarginTop) {
    this.positionMarginLeft = positionMarginLeft;
    this.positionMarginTop = positionMarginTop;
  }

  moveRight() {
    checkIfEated();
    if (this.positionMarginLeft + step < widthOfPlayArea) {
      this.positionMarginLeft += step;
      pacman.style.marginLeft = this.positionMarginLeft + 'px';
      pacman.style.animation = "eatRight 0.4s infinite linear";
      pacman.style.background = "conic-gradient(yellow 55deg, transparent 55deg 125deg, yellow 0)";
      if (this.positionMarginLeft % step === 0 && this.positionMarginTop % step === 0) myPlayArea.eatDot(this.positionMarginLeft / step, this.positionMarginTop / step);
      checkIfEated();
    }
  }

  moveLeft() {
    checkIfEated();
    if (this.positionMarginLeft > 0) {
      this.positionMarginLeft -= step;
      pacman.style.marginLeft = this.positionMarginLeft + 'px';
      pacman.style.background = "conic-gradient(yellow 235deg, transparent 0 310deg, yellow 0)";
      pacman.style.animation = "eatLeft 0.4s infinite linear";
      if (this.positionMarginLeft % step === 0 && this.positionMarginTop % step === 0) myPlayArea.eatDot(this.positionMarginLeft / step, this.positionMarginTop / step);
      checkIfEated();
    }
  }

  moveUp() {
    checkIfEated();
    if (this.positionMarginTop > 0) {
      this.positionMarginTop -= step;
      pacman.style.marginTop = this.positionMarginTop + 'px';
      pacman.style.background = "conic-gradient(transparent 0 45deg, yellow 45deg 320deg, transparent 0 0)";
      pacman.style.animation = "eatUp 0.4s infinite linear";
      if (this.positionMarginLeft % step === 0 && this.positionMarginTop % step === 0) myPlayArea.eatDot(this.positionMarginLeft / step, this.positionMarginTop / step);
      checkIfEated();
    }
  }

  moveDown() {
    checkIfEated();
    if (this.positionMarginTop + step < heightOfPlayArea) {
      this.positionMarginTop += step;
      pacman.style.marginTop = this.positionMarginTop + 'px';
      pacman.style.background = "conic-gradient(yellow 140deg, transparent 0 215deg, yellow 0)";
      pacman.style.animation = "eatDown 0.4s infinite linear";
      if (this.positionMarginLeft % step === 0 && this.positionMarginTop % step === 0) myPlayArea.eatDot(this.positionMarginLeft / step, this.positionMarginTop / step);
      checkIfEated();
    }
  }
}

const myPacman = new Pacman(0, 0);
const keyArrowEvents = ['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown'];

const checkIfEated = () => {
  if (myPacman.positionMarginLeft === firstGhost.positionMarginLeft && myPacman.positionMarginTop === firstGhost.positionMarginTop) {
    console.log("pacman left: " + myPacman.positionMarginLeft);
    console.log("ghost left: " + firstGhost.positionMarginLeft);
    console.log("pacman top: " + myPacman.positionMarginTop);
    console.log("ghost top: " + firstGhost.positionMarginTop);
    console.log("eaten");
    gameFinished = true;
    myPlayArea.letItLose();
  }
}

document.addEventListener('keydown', (e) => {
  if (gameFinished === false) {
    if (e.code === 'ArrowRight') myPacman.moveRight();
    if (e.code === 'ArrowLeft') myPacman.moveLeft();
    if (e.code === 'ArrowUp') myPacman.moveUp();
    if (e.code === 'ArrowDown') myPacman.moveDown();
  }
})

document.addEventListener('keyup', (e) => {
  if (keyArrowEvents.includes(e.code)) pacman.style.removeProperty('animation');
})

