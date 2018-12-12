var database = firebase.database();
var inPlay = database.ref('/inPlay');
var players = database.ref('/players');
var p1 = database.ref('/players/p1');
var p2 = database.ref('/players/p2');
var hasPlayer1 = false;
var hasPlayer2 = false;
var isPlayer1 = false;
var isPlayer2 = false;

players.on('value', snapshot => {
	const val = snapshot.val();
	if (val.p1.status === 'offline' && !isPlayer2) {
		isPlayer1 = true;
		p1.update({
			status: 'online'
		});
		startGame();
	} else if (val.p2.status === 'offline' && !isPlayer1) {
		isPlayer2 = true;
		p2.update({
			status: 'online'
		});
		startGame();
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
	const text = isPlayer1
		? 'Welcome Player 1'
		: isPlayer2
			? 'Welcome Player 2'
			: 'Waiting for more players...';
	document.getElementById('app').innerText = text;
}
