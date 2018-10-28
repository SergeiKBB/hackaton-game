import myFunction from './popup'

var model = {
    boardSize: 10,
    numShips: 10,
    shipLength: 3,
    shipsSunk: 0,

	ships: [
		{ locations: ["15", "16", "17", "18"], hits: ["", "", "", ""], shipLength: 4 },
		{ locations: ["36", "37", "38"], hits: ["", "", ""], shipLength: 3 },
		{ locations: ["74", "84", "94"], hits: ["", "", ""], shipLength: 3 },
		{ locations: ["01", "02"], hits: ["", ""], shipLength: 2 },
		{ locations: ["30", "40"], hits: ["", ""], shipLength: 2 },
		{ locations: ["78", "88"], hits: ["", ""], shipLength: 2 },
		{ locations: ["22"], hits: [""], shipLength: 1 },
		{ locations: ["59"], hits: [""], shipLength: 1 },
		{ locations: ["71"], hits: [""], shipLength: 1 },
		{ locations: ["91"], hits: [""], shipLength: 1 }
	  ],

	fire: function(guess, className) {
		// debugger;
		 for(var i = 0; i < this.numShips; i++) {
			var ship = this.ships[i];
			

			var index = ship.locations.indexOf(guess);

			if ( ship.hits[index] === "hit" ) {
				view.displayMessage("You have hit it already");
				return true;
			} else if ( index >= 0 ) {
				ship.hits[index] = "hit";
				view.displayHit(guess);
				view.displayMessage("HIT!");
				view.udpateClasses(className, 'hit');

				if ( this.isSunk(ship) ) {
					view.displayMessage("You sank my battleship!");
					this.shipsSunk++;
				}
				return true;
			}
		}
		view.displayMiss(guess);
		view.displayMessage("You Missed");
		view.udpateClasses(className, 'miss');
		return false;
	},

	isSunk: function(ship) {
		for (var i = 0; i < ship.shipLength; i++) {
			if (ship.hits[i] !== "hit") {
				return false;
			}
		}
		return true;
	},

	generateShipLocations: function() {
		var locations;
		for (var i = 0; i < this.numShips; i++) {
			do {
				locations = this.generateShip(this.ships[i].shipLength);
			} while (this.collision(locations));
				this.ships[i].locations = locations;
		}

		for (var i = 0; i < this.numShips; i++) {
			console.log(this.ships[i].locations);
		}

	},

	generateShip: function(length) {
		
		var direction = Math.floor(Math.random() * 2);
		var row, col;

		if (direction === 1) {
			row = Math.floor(Math.random() * this.boardSize);
			col = Math.floor(Math.random() * (this.boardSize - length + 1));
		} else { 
			row = Math.floor(Math.random() * (this.boardSize - length + 1));
			col = Math.floor(Math.random() * this.boardSize);
		}

		var newShipLocations = [];

		for (var i = 0; i < length; i++) {
			if (direction === 1) {
				newShipLocations.push(row + "" + (col + i));
			} else {
				newShipLocations.push((row + i) + "" + col);
			}
		}
		return newShipLocations;
	},

	collision: function(locations) {
		for (var i = 0; i < this.numShips; i++) {
			var ship = this.ships[i];
			for (var j = 0; j < locations.length; j++) {
				if (ship.locations.indexOf(locations[j]) >= 0) {
					return true;
				}
			}
		}
		return false;
	}
};

var view = {
	displayMessage: function(msg) {
		// var messageArea = document.getElementById("messageArea");
		// messageArea.innerHTML = msg;
		console.log(msg);
	},
	displayHit: function(location) {
		// var cell = document.getElementById(location);
		// cell.setAttribute("class", "hit");
		// alert('hit!');
		console.log('HITTTT@!!!');
		
	},
	displayMiss: function(location) {
		// var cell = document.getElementById(location);
		// cell.setAttribute("class", "miss");
		// alert('miss!');
		console.log('MISS!!!');
		
	},

	udpateClasses: function(className, status) {
		let box = document.getElementById(className.toLowerCase());
		
		if(status === 'hit') {
			box.classList.add('battlefield__cell_boat');
			
		} else if(status === 'miss') {
			box.classList.add('battlefield__cell_sea');

		}
	}
};

var controller = {
	guesses: 0,

	processGuess: function(guess) {
		var location = parseGuess(guess);

		if (location) {
			this.guesses++;
			document.getElementById('counter').innerText = this.guesses;
			
			var hit = model.fire(location, guess);
			if (hit && model.shipsSunk === model.numShips) {
				// view.displayMessage("You sank all my battleships, in " + this.guesses + " guesses");
				// alert("You sank all my battleships, in " + this.guesses + " guesses");
				myFunction();
			}
		}
	}
};

function parseGuess(guess) {
    var alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    var firstChar = guess.charAt(0);
    var row = alphabet.indexOf(firstChar);
    var column = guess.charAt(1);
    if (isNaN(row) || isNaN(column) || guess === "TABLE") {
        // alert("Oops, that isn't on the board.");
    } else if (row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize) {
            // alert("Oops, that's off the board!");
    } else {
        return row + column;
    }
    return null;
}

function init() {
    let table = document.getElementById("table");
    table.addEventListener('click', function (event)  {
        let guess = event.target.id.toUpperCase();
        controller.processGuess(guess);
        
    });

    // model.generateShipLocations();
}

window.onload = init;

