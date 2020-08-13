//clientEMC.js

class ClientEMC extends ClientManager {
	constructor () {
		super();
	}

	select() {
		ClientManager.chosen.deselect();
		document.getElementById(probeForSubquestions).style.display = "block";
		document.getElementById(EMCFavor).style.display = "inline";
	}

	deselect() {
		document.getElementById(probeForSubquestions).style.display = "none";
		document.getElementById(EMCFavor).style.display = "none";
		TextArrayProbe.value = "";
		EMCFavorability.value = value.none;
	}
}
