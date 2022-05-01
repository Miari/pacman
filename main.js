let pacman = document.getElementById("pacman");
let playarea = document.getElementById("playarea");
//const widthOfPlayArea = document.getElementById("playarea").style.width;
const widthOfPlayArea = 640;
const heightOfPlayAre = 220;
//console.log("!" + document.getElementById("playarea").style.width);

let test = document.getElementById("test");

class Playarea {
  constructor(areaWidth, areaHeight) {
    this.areaWidth = areaWidth;
    this.areaHeight = areaHeight;
  }


}

class Pacman {
  constructor(positionMarginLeft, positionMarginTop) {
    this.positionMarginLeft = positionMarginLeft;
    this.positionMarginTop = positionMarginTop;
  }

  moveRight() {
    if (this.positionMarginLeft + 30 < 640) {
      this.positionMarginLeft += 5;
      pacman.style.marginLeft = this.positionMarginLeft + 'px';
      pacman.style.animation = "eatRight 0.4s infinite linear";
      pacman.style.background = "conic-gradient(yellow 55deg, transparent 55deg 125deg, yellow 0)";
      playarea.style.backgroundImage = "linear-gradient(red,  red), radial-gradient(white 10%, transparent 0)";
      playarea.style.backgroundSize = "2em 2em, 2em 2em";
      playarea.style.backgroundRepeat = "no-repeat, repeat";
      playarea.style.backgroundPosition = "0 0, 0 0"; 
    }
  }

  moveLeft() {
    if (this.positionMarginLeft > 0) {
      this.positionMarginLeft -= 5;
      pacman.style.marginLeft = this.positionMarginLeft + 'px';
      pacman.style.background = "conic-gradient(yellow 235deg, transparent 0 310deg, yellow 0)";
      pacman.style.animation = "eatLeft 0.4s infinite linear";
    }
  }

  moveUp() {
    if (this.positionMarginTop > 0) {
      this.positionMarginTop -= 5;
      pacman.style.marginTop = this.positionMarginTop + 'px';
      pacman.style.background = "conic-gradient(transparent 0 45deg, yellow 45deg 320deg, transparent 0 0)";
      pacman.style.animation = "eatUp 0.4s infinite linear";
    }
  }

  moveDown() {
    if (this.positionMarginTop + 30 < 220) {
      this.positionMarginTop += 5;
      pacman.style.marginTop = this.positionMarginTop + 'px';
      pacman.style.background = "conic-gradient(yellow 140deg, transparent 0 215deg, yellow 0)";
      pacman.style.animation = "eatDown 0.4s infinite linear";
    }
  }
}

const myPacman = new Pacman(0, 0);
const myPlayArea = new Playarea(0, 0);
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

