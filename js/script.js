const container = document.querySelector('.container');

function createGrid(numOfSquares = 75) {
	let divHeight = 16;
	let divWidth = 16;
	let containerWidth = 1280;
	let totalSquares = numOfSquares * numOfSquares;

	if (numOfSquares !== 75) {
		divHeight = (containerWidth / numOfSquares) - 1;
		divWidth = divHeight;
	}

	for (i = 1; i < totalSquares; i++ ) {
		const div = document.createElement('div');
		div.setAttribute('class', 'newDiv');
		div.style.width = divWidth + 'px';
		div.style.height = divHeight + 'px';
		container.appendChild(div);
	}
}

const toggleMarker = function(event) {
    event.target.classList.add('active');
}
let markerPosition = 'Inactive';
container.addEventListener('click', event => {
	document.querySelectorAll('.newDiv').forEach(div => {
		if (div.className.includes('markerActive')) {
			div.classList.remove('markerActive');
			markerPosition = 'Inactive';
			displayMarkerPosition();
			div.removeEventListener('mouseover', toggleMarker, true);
		} else {
			div.classList.add('markerActive');
			markerPosition = 'Active';
			displayMarkerPosition();
			div.addEventListener('mouseover', toggleMarker, true);
		}
	})
})

// The clear button clears marker, then calls back the black marker.
const clearBtn = document.querySelector('button[name=clear]');
clearBtn.addEventListener('click', event => {
	document.querySelectorAll('.newDiv').forEach(div => {
		div.classList.remove('active');
		div.style.backgroundColor = 'white';
	})
	addBlack();
})

// Each new square colored in will be a random color chosen from array.
const colors = ['#FF3855','#FB4D46','#FFAA1D','#FFF700','#299617',
'#A7F432','#2243B6','#5DADEC','#5946B2','#9C51B6','#FFDB00',
'#FF7A00','#FDFF00','#87FF2A','#0048BA','#FF007C','#E936A7']

const addRandom = function(event) {
	let color;
	event.target.classList.add('random');
	if (event.target.className.includes('black')) {
		event.target.classList.remove('black');
	}

	if (event.target.className.includes('markerActive')) {
		color = colors[Math.floor(Math.random() * colors.length)];
		event.target.style.backgroundColor = color;
	}
}

const random = document.querySelector('button[name=random]');
random.addEventListener('click', event => {
	document.querySelectorAll('.newDiv').forEach(div => {
		div.addEventListener('mouseover', addRandom);
	})
})

addBlack = function() {
	document.querySelectorAll('.newDiv').forEach(div => {
		div.classList.remove('random');
		div.removeEventListener('mouseover', addRandom);
		div.addEventListener('mouseover', event => {
			div.classList.add('black');
			if (div.className.includes('markerActive')) {
				div.style.backgroundColor = 'black';
			}
		})
	})
}


const black = document.querySelector('button[name=black]');
black.addEventListener('click', addBlack, true);


// Removes old divs to make room for new ones when the grid size is changed.
function removeGrid() {
	document.querySelectorAll('.newDiv').forEach(div => {
		container.removeChild(div);
	})
}

// The gridSize button allows the user to specify the parameters of the grid.
const grid = document.querySelector('button[name=gridSize]');
let size = 75;
grid.addEventListener('click', event => {
	size = prompt('How many squares should the sides contain? (Maximum is 200) Warning: changing the grid size will clear the grid.');
	if (size > 200) {
		size = prompt('Sorry, I can\'t handle numbers greater than 200.');
	} 
	if (size) {
		removeGrid();
		createGrid(size);
		displaySize();
	} 
})

// display current grid size
function displaySize() {
	const sizePara = document.querySelector('.p-b');
	sizePara.textContent = 'Grid Size: ' + size + ' x ' + size;
}

// displays whether marker is currently active or inactive.
function displayMarkerPosition() {
	const markerPara = document.querySelector('.p-a');
	markerPara.textContent = 'Marker: ' + markerPosition;
}


createGrid();
displaySize();