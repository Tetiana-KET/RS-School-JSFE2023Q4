import {gameTemplates} from './gameTemplates';
import getRandomNumber from './getRandomNumber';

let currentPuzzle = null;
let currentPuzzleName = null;
let random = getRandomNumber();
let previousRandom = null;
let filledCells = null;
let gridSize = null;
const lineClues = [];
const columnClues = [];

function getRandomPuzzle () {
  
  const puzzles = [];
  const puzzleNames = [];

  gameTemplates.forEach(level => {
    Object.entries(level).forEach((entry) => {
      puzzles.push(entry[1]);
      puzzleNames.push(entry[0]);
    })
  })

  currentPuzzle = puzzles[random];
  currentPuzzleName = puzzleNames[random];
  gridSize = puzzles[random].length;
}

getRandomPuzzle();

function calculateClues () {

	currentPuzzle.forEach((line, i) => {
		let currentLineClues = [];
		let count = 0;

		//clues for line
		line.forEach((cell, j) => {
			if (cell) {
				count += 1;
			} else {
				if (count > 0) {
					currentLineClues.push(count);
					count = 0;
				}
			}
		});

		//last iteration
		if (count > 0) {
			currentLineClues.push(count);
			count = 0;
		}
		lineClues.push(currentLineClues);
	});

	//clues for columns
	let currentColClues = [];

	for (let col = 0; col < gridSize; col += 1) {
		let count = 0;

		for (let row = 0; row < gridSize; row += 1) {

			if (currentPuzzle[row][col]) {

				count += 1;

			} else {

				if (count > 0) {
          
					currentColClues.push(count);
					count = 0;
				}
			}
		}

    //last iteration
		if (count > 0) {
			currentColClues.push(count);
		}

		columnClues.push(currentColClues);
		// Clear the array for the next column
		currentColClues = [];
	}

	console.log(lineClues);
	console.log(columnClues);
}
calculateClues();

export default function createGameGrid() {
	const gameContent = document.querySelector('.game__content');
	const gameGrid = new Array(gridSize).fill(new Array(gridSize).fill(0));
  const gameContentWidth = document.querySelector('.game__content').clientWidth;
  const cellWidth = gameContentWidth / gridSize;

	gameGrid.forEach((line, i) => {
		const gridLine = document.createElement('div');
		gridLine.classList.add('game__line');
		gameContent.append(gridLine);

		line.forEach((cell, j) => {
			const gridCell = document.createElement('div');
			gridCell.classList.add('game__cell');
      gridCell.style.width = cellWidth + 'px';
      gridCell.style.height = cellWidth + 'px';
			gridLine.append(gridCell);
      if (currentPuzzle[i][j]) {
        gridCell.classList.add('filled');
			}

		});
		gameContent.append(gridLine);
	});

	const gameClueTop = document.createElement('div');
	gameClueTop.classList.add('game__clues', 'clues-columns-wrap');
	document.querySelector('.game__wrap').prepend(gameClueTop);
	// gameClueTop.style.width =
	// 	// @ts-ignore
	// 	document.querySelector('.game__content').offsetWidth + 'px';
	// gameClueTop.style.height = 100 + 'px';

	columnClues.forEach((column, j) => {
		const cluesItemsWrap = document.createElement('div');
		cluesItemsWrap.classList.add('clues__items-wrap');
		cluesItemsWrap.style.width = cellWidth + 'px';
		gameClueTop.append(cluesItemsWrap);

		column.forEach((cell, i) => {
			const cluesItem = document.createElement('div');
			cluesItem.classList.add('clues__item');
			cluesItem.style.width = cellWidth - 5 + 'px';
			cluesItem.style.height = cellWidth - 5 + 'px';
			cluesItemsWrap.append(cluesItem);
			cluesItem.textContent = columnClues[j][i];
		});

	})


}
