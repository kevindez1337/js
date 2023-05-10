# js
// Создание массива для поля сапера
let field = [];

// Задание размера поля
let fieldSize = 10;

// Задание количества мин
let mineCount = 10;

// Создание массива для мин
let mines = [];

// Заполнение массива для поля сапера
for (let i = 0; i < fieldSize; i++) {
  let row = [];
  for (let j = 0; j < fieldSize; j++) {
    row.push({
      x: i,
      y: j,
      isMine: false,
      isRevealed: false,
      isFlagged: false,
      neighbourCount: 0,
    });
  }
  field.push(row);
}

// Размещение мин на поле
while (mines.length < mineCount) {
  let randomX = Math.floor(Math.random() * fieldSize);
  let randomY = Math.floor(Math.random() * fieldSize);
  if (!field[randomX][randomY].isMine) {
    field[randomX][randomY].isMine = true;
    mines.push([randomX, randomY]);
  }
}

// Функция для подсчета количества соседних мин
let countNeighbourMines = (cell) => {
  let neighbourMines = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      let neighbourX = cell.x + i;
      let neighbourY = cell.y + j;
      if (
        neighbourX >= 0 &&
        neighbourX < fieldSize &&
        neighbourY >= 0 &&
        neighbourY < fieldSize &&
        field[neighbourX][neighbourY].isMine
      ) {
        neighbourMines++;
      }
    }
  }
  return neighbourMines;
};

// Подсчет количества мин в соседних клетках для каждой клетки поля
for (let i = 0; i < fieldSize; i++) {
  for (let j = 0; j < fieldSize; j++) {
    let currentCell = field[i][j];
    if (!currentCell.isMine) {
      currentCell.neighbourCount = countNeighbourMines(currentCell);
    }
  }
}

// Обработчик клика на клетку поля
let handleClick = (cell) => {
  if (cell.isFlagged) {
    return;
  }
  if (cell.isMine) {
    alert('Вы проиграли!');
  } else {
    cell.isRevealed = true;
    if (cell.neighbourCount === 0) {
      let neighbours = getNeighbours(cell);
      neighbours.forEach((neighbour) => {
        if (!neighbour.isRevealed) {
          handleClick(neighbour);
        }
      });
    }
  }
  checkForWin();
};

// Получение соседей клетки поля
let getNeighbours = (cell) => {
  let neighbours = [];
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      let neighbourX = cell.x + i;
      let neighbourY = cell.y + j;
      if (
        neighbourX >= 0 &&
        neighbourX < fieldSize &&
        neighbourY >= 0
