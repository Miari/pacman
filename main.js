//let pacman = document.getElementById("pacman"); 
let test = document.getElementById("test");

class Pacman {
  constructor(positionMarginLeft, positionMarginTop) {
    this.positionMarginLeft = positionMarginLeft;
    this.positionMarginTop = positionMarginTop;
  }

  moveRight() {
    this.positionMarginLeft += 5;
    document.getElementById("pacman").style.marginLeft = this.positionMarginLeft + 'px';
  }

  moveLeft() {
    if (this.positionMarginLeft - 3 > 0) {
      this.positionMarginLeft -= 5;
      document.getElementById("pacman").style.marginLeft = this.positionMarginLeft + 'px';
    }
  }

  moveUp() {
    if (this.positionMarginTop - 3 > 0) {
      this.positionMarginTop -= 5;
      document.getElementById("pacman").style.marginTop = this.positionMarginTop + 'px';
    }
  }

  moveDown() {
    this.positionMarginTop += 5;
    document.getElementById("pacman").style.marginTop = this.positionMarginTop + 'px';
  }

}

const myPacman = new Pacman(0, 0);

document.addEventListener('keydown', (e) => {
  //console.log(e.code);
  if (e.code === 'ArrowRight') myPacman.moveRight();
  if (e.code === 'ArrowLeft') myPacman.moveLeft();
  if (e.code === 'ArrowUp') myPacman.moveUp();
  if (e.code === 'ArrowDown') myPacman.moveDown();
})

