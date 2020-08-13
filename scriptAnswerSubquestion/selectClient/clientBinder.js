//clientBidner.js

class ClientBinder extends ClientManager {
	constructor () {
		super();
	}

	select() {
		ClientManager.chosen.deselect();
		document.getElementById(probeForSubquestions).style.display = "block";
	}

	deselect() {
		document.getElementById(probeForSubquestions).style.display = "none";
		TextArrayProbe.value = "";
	}
}
