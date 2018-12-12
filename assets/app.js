var database = firebase.database();
var inPlay = database.ref('/inPlay');
var players = database.ref('/players');
var p1 = database.ref('/players/p1');
var p2 = database.ref('/players/p2');
var hasPlayer1 = false;
var hasPlayer2 = false;
var isPlayer1 = false;
var isPlayer2 = false;
var numPlayers = 0;

players.on('value', snapshot => {
	console.log('players changed');
	const val = snapshot.val();
	if (val.p1.status === 'online') {
		hasPlayer1 = true;
	}
	if (val.p2.status === 'online') {
		hasPlayer2 = true;
	}

	if (val.p1.status === 'offline') {
		hasPlayer1 = false;
	}

	if (val.p2.status === 'offline') {
		hasPlayer2 = false;
	}

	startGame();

	if (val.p1.status === 'offline' && !isPlayer2) {
		isPlayer1 = true;
		p1.update({
			status: 'online'
		});
	} else if (val.p2.status === 'offline' && !isPlayer1) {
		isPlayer2 = true;
		p2.update({
			status: 'online'
		});
	}
});

p1.onDisconnect().update({
	status: 'offline'
});

p2.onDisconnect().update({
	status: 'offline'
});

function startGame() {
	console.log('1', isPlayer1);
	console.log('2', isPlayer2);
	let text = 'Welcome Player ';
	if (isPlayer1) {
		text += '1';
	} else {
		text += '2';
	}

	if (!hasPlayer1 || !hasPlayer2) {
		console.log('waiting for players');
	}

	if (hasPlayer1 && hasPlayer2) {
		play();
	}

	document.getElementById('app').innerText = text;
}

function play() {
	console.log('play');
}
