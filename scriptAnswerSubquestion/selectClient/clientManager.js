//clientManager.js

class ClientManager {
	static chosen = undefined;

	constructor () {

	}

	select() {
		if (ClientManager.chosen==undefined) {
			return;
		}
		ClientManager.chosen.deselect();
	}

	deselect() {}

	static selectClient(chosen) {
		chosen.select();
		ClientManager.chosen = chosen;
	}
}
