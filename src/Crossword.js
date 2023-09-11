class Crossword {
    constructor() {
      this.crosswordWords = words;
      this.inCrossword = new Array(crosswordWordsSize).fill(true);
      this._Crossword = Array.from({ length: gridSize }, () => new Array(gridSize).fill('-'));
      this.maxWordLength = this.crosswordWords.reduce((max, word) => Math.max(max, word.length), 0);
  
      if (this.maxWordLength > gridSize) {
        console.log("Invalid params");
        process.exit(0);
      }
    }
  
    createCrossword() {
      let index = crosswordWordsSize;
  
      while (index != 0) {
        let isPlaced = false;
        let count = 0;
  
        while (!isPlaced) {
          if (count > 200) {
            console.log("Not Possible");
            process.exit(0);
          }
  
          const x = Math.floor(Math.random() * gridSize);
          const y = Math.floor(Math.random() * gridSize);
  
          if (this.isPossibleDiagonal(x, y, index - 1)) {
            this.wordPlace(x, y, index - 1, oriented.Z);
            isPlaced = true;
            this.inCrossword[index - 1] = true;
          } else if (this.isPossibleVertical(x, y, index - 1)) {
            this.wordPlace(x, y, index - 1, oriented.Y);
            isPlaced = true;
            this.inCrossword[index - 1] = true;
          } else if (this.isPossibleHorizontal(x, y, index - 1)) {
            this.wordPlace(x, y, index - 1, oriented.X);
            isPlaced = true;
            this.inCrossword[index - 1] = true;
          }
  
          count++;
        }
  
        index--;
      }
  
      for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
          if (this._Crossword[i][j] === '-') {
            this._Crossword[i][j] = this.randomChar();
          }
        }
      }
    }
  
    printCrossword() {
      for (let i = 0; i < gridSize; i++) {
        console.log(this._Crossword[i].join('  '));
        console.log('\n');
      }
    }
  
    randomChar() {
      return String.fromCharCode(97 + Math.floor(Math.random() * 26));
    }
  
    wordPlace(x, y, index, val) {
      switch (val) {
        case oriented.X:
          for (let i = 0; i < this.crosswordWords[index].length; i++) {
            this._Crossword[i + x][y] = this.crosswordWords[index][i];
          }
          break;
        case oriented.Y:
          for (let i = 0; i < this.crosswordWords[index].length; i++) {
            this._Crossword[x][i + y] = this.crosswordWords[index][i];
          }
          break;
        case oriented.Z:
          for (let i = 0; i < this.crosswordWords[index].length; i++) {
            this._Crossword[x + i][y + i] = this.crosswordWords[index][i];
          }
          break;
        default: return;
      }
    }
  
    isPossibleHorizontal(x, y, index) {
      let i;
      for (i = x; i - x < this.crosswordWords[index].length && i < gridSize; i++) {
        if (this._Crossword[i][y] !== '-') {
          return false;
        }
      }
      return i < gridSize;
    }
  
    isPossibleVertical(x, y, index) {
      let i;
      for (i = y; i - y < this.crosswordWords[index].length && i < gridSize; i++) {
        if (this._Crossword[x][i] !== '-') {
          return false;
        }
      }
      return i < gridSize;
    }
  
    isPossibleDiagonal(x, y, index) {
      let i;
      for (i = 0; i < this.crosswordWords[index].length && i + x < gridSize && i + y < gridSize; i++) {
        if (this._Crossword[x + i][y + i] !== '-') {
          return false;
        }
      }
      return i + x < gridSize && i + y < gridSize;
    }
  }