var database = firebase.database();
// var inPlay = database.ref('/inPlay');
var players = database.ref('/players');
// var p1 = database.ref('/players/p1');
// var p2 = database.ref('/players/p2');
var hasPlayer1 = false;
var hasPlayer2 = false;
var isPlayer1 = false;
var isPlayer2 = false;
// var numPlayers = 0;
var submitEle = document.getElementById('submit');
var input = document.getElementById('input');
var name;
var loading = true;
var numPlayers = 0;
// var p1Ele = document.getElementById('#p1');
// var p2Ele = document.getElementById('#p2');

players.on('value', snapshot => {
	numPlayers = snapshot.numChildren();
	hasPlayer1 = snapshot.child('1').exists();
	hasPlayer2 = snapshot.child('2').exists();
	render(snapshot.val());
});

function addPlayer(name) {
	let playerNum;
	if (hasPlayer1) {
		playerNum = 2;
	} else {
		playerNum = 1;
	}

	var playerRef = database.ref(`/players/${playerNum}`);
	playerRef.set({
		name,
		wins: 0,
		losses: 0
	});
	playerRef.onDisconnect().remove();
}

submitEle.addEventListener('click', () => {
	if (numPlayers === 2) {
		window.alert('Already 2 players');
		return;
	}
	const name = input.value;
	addPlayer(name);
});

function render(data) {
	document.getElementById('p1').innerText = '';
	document.getElementById('p2').innerText = '';
	if (!data) {
		console.log('Waiting for players');
		return;
	}
	if (data['1']) {
		console.log(`has player 1: ${data['1'].name}`);
		document.getElementById('p1').innerText = data['1'].name;
	}
	if (data['2']) {
		console.log(`has player 2: ${data['2'].name}`);
		document.getElementById('p2').innerText = data['2'].name;
	}
}

// // players.on('value', snapshot => {
// // 	console.log('players changed');
// // 	const val = snapshot.val();
// // 	if (val.p1.status === 'online') {
// // 		hasPlayer1 = true;
// // 	} else {
// // 		hasPlayer1 = false;
// // 	}
// // 	if (val.p2.status === 'online') {
// // 		hasPlayer2 = true;
// // 	} else {
// // 		hasPlayer2 = false;
// // 	}

// // 	// startGame();

// // 	if (val.p1.status === 'offline' && !isPlayer2) {
// // 		isPlayer1 = true;
// // 	} else if (val.p2.status === 'offline' && !isPlayer1) {
// // 		isPlayer2 = true;
// // 	}
// // });

// p1.onDisconnect().update({
// 	status: 'offline'
// });

// p2.onDisconnect().update({
// 	status: 'offline'
// });

// function startGame() {
// 	console.log('1', isPlayer1);
// 	console.log('2', isPlayer2);
// 	let text = 'Welcome Player ';
// 	if (isPlayer1) {
// 		text += '1';
// 	} else {
// 		text += '2';
// 	}

// 	if (!hasPlayer1 || !hasPlayer2) {
// 		console.log('waiting for players');
// 	}

// 	if (hasPlayer1 && hasPlayer2) {
// 		play();
// 	}

// 	// document.getElementById('app').innerText = text;
// }

// function play() {
// 	console.log('play');
// }

// class Game {
// 	constructor() {
// 		this.dom = document.getElementById('app');
// 		this.state = {
// 			isLoaded: false,
// 			hasP1: false,
// 			hasP2: false,
// 			isP1: false,
// 			isP2: false,
// 			p1: {
// 				name: 'Trey'
// 			},
// 			p2: {
// 				name: 'eve'
// 			}
// 		};
// 		this.getPlayerEle = this.getPlayerEle.bind(this);
// 		this.setUpFirebaseListeners();
// 	}

// 	setUpFirebaseListeners() {
// 		const database = firebase.database();
// 		const playersRef = database.ref('/players');
// 		this.p1Ref = database.ref('/players/p1');
// 		this.p2Ref = database.ref('/players/p2');

// 		playersRef.on('value', snapshot => {
// 			this.state.hasP1 = snapshot.val().p1.status === 'online';
// 			this.state.hasP2 = snapshot.val().p2.status === 'online';
// 			this.state.p1 = {
// 				name: snapshot.val().p1.name
// 			};
// 			this.state.p2 = {
// 				name: snapshot.val().p2.name
// 			};
// 			this.state.isLoaded = true;
// 			this.render();
// 		});

// 		this.p1Ref.onDisconnect().update({
// 			name: '',
// 			status: 'offline'
// 		});

// 		this.p2Ref.onDisconnect().update({
// 			name: '',
// 			status: 'offline'
// 		});
// 	}

// 	getTopBar() {
// 		const topBarEle = document.createElement('div');
// 		let innerHTML;
// 		if (!this.state.hasP1 || !this.state.hasP2) {
// 			innerHTML = `
//       <div id="start">
//             <label for="name">
//                 Enter your Name
//             </label>
//             <input id="nameInput" type="text" value="" placeholder="Name" />
//             <button id="submit">Enter Game</button>
//         </div>
//     `;
// 		} else {
// 			innerHTML = `
//       <p>This is the top bar</p>
//     `;
// 		}

// 		topBarEle.innerHTML = innerHTML;
// 		const submitEle = topBarEle.querySelector('#submit');
// 		if (submitEle) {
// 			submitEle.addEventListener('click', evt => {
// 				const nameInput = topBarEle.querySelector('#nameInput');
// 				this.addUser(nameInput.value);
// 			});
// 		}
// 		return topBarEle;
// 	}

// 	addUser(name) {
// 		// no player 1 && no player 2
// 		if (!this.state.hasP1 && !this.state.hasP2) {
// 			this.state.isP1 = true;
// 			this.p1Ref.update({
// 				status: 'online',
// 				name
// 			});
// 		}
// 		// I am player 1 && no player 2
// 		if (this.state.isP1 && !this.state.hasP2) {
// 			// add player 2
// 			this.state.isP2 = true;
// 			this.p2Ref.update({
// 				status: 'online',
// 				name
// 			});
// 		}
// 		// I am player 2 && no player 1
// 		if (this.state.isP2 && !this.state.hasP1) {
// 			this.state.isP1 = true;
// 			this.p1Ref.update({
// 				status: 'online',
// 				name
// 			});
// 		}
// 	}

// 	getPlayerEle() {
// 		const ele = document.createElement('div');
// 		debugger;
// 		let innerHTML;
// 		if (this.state.isP1) {
// 			innerHTML = this.state.p1.name;
// 		} else if (this.state.isP2) {
// 			innerHTML = this.state.p2.name;
// 		}

// 		ele.innerHTML = innerHTML;

// 		return ele;
// 	}

// 	render() {
// 		this.dom.innerHTML = '';
// 		const gameBoardEle = document.createElement('div');
// 		if (!this.state.isLoaded) {
// 			gameBoardEle.innerText = 'Loading...';
// 		} else {
// 			const topBar = this.getTopBar();
// 			const playerEle = this.getPlayerEle();
// 			gameBoardEle.appendChild(topBar);
// 			gameBoardEle.appendChild(playerEle);
// 		}
// 		this.dom.appendChild(gameBoardEle);
// 	}
// }

// const game = new Game();
