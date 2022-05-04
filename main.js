let pacman = document.getElementById("pacman");
let ghosts = document.getElementsByClassName("ghost");
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

  letItLose(index) {
    scoreHeader.innerHTML = "Game over :(";
    ghosts[index].style.animation = "lose 1.5s infinite linear";
  }
}

const myPlayArea = new Playarea(widthOfPlayArea, heightOfPlayArea);

class Ghost {
  constructor(positionMarginLeft, positionMarginTop, index) {
    this.positionMarginLeft = positionMarginLeft;
    this.positionMarginTop = positionMarginTop;
    this.index = index;
    this.numberOfSteps = this.getRandom(1, 21);
    this.numberOfStepsDone = 0;
    this.currentDirection = this.defineCurrentDirection();
    this.ghost = ghosts[index];
  }

  moveGhost() {
    if (gameFinished === false) {
      setTimeout(() => this.moveGhost(), 200);
      if (this.numberOfStepsReached()) {
        this.numberOfStepsDone = 0;
        this.numberOfSteps = this.getRandom(1, 21);
        this.defineCurrentDirection();
      } else {
        if (this.currentDirection === 'right') {
          if (this.positionMarginLeft + step < widthOfPlayArea) {
            this.positionMarginLeft += step;
          } else {
            this.currentDirection = 'left';
            this.positionMarginLeft -= step;
          }
          this.ghost.style.marginLeft = this.positionMarginLeft + 'px';
        }

        if (this.currentDirection === 'left') {
          if (this.positionMarginLeft > 0) {
            this.positionMarginLeft -= step;
          } else {
            this.currentDirection = 'right';
            this.positionMarginLeft += step;
          }
          this.ghost.style.marginLeft = this.positionMarginLeft + 'px';
        }

        if (this.currentDirection === 'down') {
          if (this.positionMarginTop + step < heightOfPlayArea) {
            this.positionMarginTop += step;
          } else {
            this.currentDirection = 'top';
            this.positionMarginLeft -= step;
          }
          this.ghost.style.marginTop = this.positionMarginTop + 'px';
        }

        if (this.currentDirection === 'top') {
          if (this.positionMarginTop > 0) {
            this.positionMarginTop -= step;
          } else {
            this.currentDirection = 'down';
            this.positionMarginLeft += step;
          }
          this.ghost.style.marginTop = this.positionMarginTop + 'px';
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
    return this.numberOfStepsDone < this.numberOfSteps ? false : true;
  }

  defineCurrentDirection() {
    const number = this.getRandom(1, 5);
    if (number === 1)
      if (this.currentDirection && this.currentDirection === "left") this.defineCurrentDirection()
      else this.currentDirection = "left";

    if (number === 2)
      if (this.currentDirection && this.currentDirection === "right") this.defineCurrentDirection()
    this.currentDirection = "right";

    if (number === 3)
      if (this.currentDirection && this.currentDirection === "down") this.defineCurrentDirection()
      else this.currentDirection = "down";

    if (number === 4)
      if (this.currentDirection && this.currentDirection === "top") this.defineCurrentDirection()
      else this.currentDirection = "top";
  }
}

const firstGhost = new Ghost(270, 120, 0);
const secondGhost = new Ghost(270, 120, 1);
const thirdGhost = new Ghost(270, 120, 2);
const fourthGhost = new Ghost(270, 120, 3);
const ghostes = [firstGhost, secondGhost, thirdGhost, fourthGhost];

ghostes.forEach(element => {
  setTimeout(() => element.moveGhost(), 1000);
})

class Pacman {
  constructor(positionMarginLeft, positionMarginTop) {
    this.positionMarginLeft = positionMarginLeft;
    this.positionMarginTop = positionMarginTop;
  } h

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
  ghostes.forEach((element, index) => {
    if (element.positionMarginLeft === myPacman.positionMarginLeft && element.positionMarginTop === myPacman.positionMarginTop) {
      gameFinished = true;
      myPlayArea.letItLose(index);
    }
  });
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
