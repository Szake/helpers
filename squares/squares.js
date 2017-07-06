// Function:
let createGame = (function() {

	// Cell constructor:
	class Cell {
		constructor(order, board) {
			this.board = board;
			this.order = order;
			this.state = 1;
			this.active = false;
			this.element = this.createElement();
			this.related = this.countRelated();
		}

		createElement() {
			let element = document.createElement('div');
				element.className = `square-cell state-${this.state}`;

			let offset_top = 100 * (Math.ceil(this.order / this.board.cols) - 1) / this.board.rows,
				offset_left = 100 * ((this.order - 1) % this.board.cols) / this.board.cols;

				element.style.position = 'absolute';
				element.style.top  = offset_top + '%';
				element.style.left = offset_left + '%';
				element.style.width  = 100 / this.board.cols + '%';
				element.style.height = 100 / this.board.rows + '%';

				element.cgBoard = this.board;
				element.cgCell = this;

			// Add to the board:
			this.board.holder.appendChild(element);

			return element;
		}

		countRelated() {
			let values = [this.order - this.board.cols, this.order + 1, this.order + this.board.cols, this.order - 1];

			let inRange = (n) => {
				let c_1 = n > 0;
				let c_2 = n <= this.board.size;
				let c_3 = ((n - 1 === this.order) || (n + 1 === this.order)) && (Math.ceil(n / this.board.cols) === Math.ceil(this.order / this.board.cols));
				let c_4 = ((n - this.board.cols === this.order) || (n + this.board.cols === this.order)) && (n % this.board.cols === this.order % this.board.cols);

				return c_1 && c_2 && (c_3 || c_4);
			};

			let filtered = values.filter((value) => {
				return inRange(value);
			});

			return filtered;
		}

		changeState() {
			let change = (cell) => {
				let state_prev = cell.state,
					state_next = state_prev + 1 <= this.board.states ? state_prev + 1 : 1;

				cell.state = state_next;

				let element = cell.element,
					element_class = element.className;

				element.className = element_class.replace(/\s?state\-[0-9]+/, ` state-${state_next}`);
			};
			
			// For current:
			change(this);

			// For related:
			this.board.cells.forEach((cell) => {
				if (this.related.indexOf(cell.order) !== -1) {
					change(cell);
				}
			});
		}

		resetState(state = 1) {
			this.state = state;
			this.element.className = this.element.className.replace(/\s?state\-[0-9]+/, ` state-${state}`);
		}
	}

	// Board contsructor:
	class Board {

		constructor(holder, rows = 3, cols = 3, states = 4) {
			this.init = false;
			this.holder = holder;

			this.size = rows * cols;
			this.rows = rows;
			this.cols = cols;

			this.states = states;

			this.cells = [];

			// Initialize:
			this.build();
		}

		// Events:
		change(event) {
			try {
				if (!event) { throw 'The function accepts event as an argument.'; }

				let element = event.target;

				if (!element.classList.contains('square-cell')) { return; }

				element.cgCell.changeState();
			}
			catch(error) {
				console.error(error);
			}
		}

		build() {
			try {
				if (this.init) { throw 'The board is already built.'; }

				console.log('Build...');
				this.init = true;

				// Board:
				this.holder.style.position = 'relative';
				this.holder.addEventListener('click', this.change);

				// Cells:
				for (let i = 1; i <= this.size; i++) {
					this.cells.push(new Cell(i, this));
				}
			}
			catch(error) {
				console.error(error);
			}
		}

		reset(state = 1) {
			try {
				if (!this.init) { throw 'The board must be built to use \"reset\" event.'; }

				// Check the argument to be between 1 and allowed number of states:
				state = state <= 0 ? 1 : state >= this.states ? this.states : state;

				console.log('Reset...');
				this.cells.forEach((cell) => {
					cell.resetState(state);
				});
			}
			catch(error) {
				console.error(error);
			}
		}

		destroy() {
			try {
				if (!this.init) { throw 'The board must be built to use \"destroy\" event.'; }

				console.log('Destroy...');
				this.init = false;
				this.holder.removeEventListener('click', this.change);
				this.holder.innerHTML = '';
				this.cells = [];
			}
			catch(error) {
				console.error(error);
			}
		}
	}

	// Return a new instance:
	return function(holder) {
		return new Board(holder);
	};
})();

// Create:
let game = createGame(document.querySelector('.js-square'));