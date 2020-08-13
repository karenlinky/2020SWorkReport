//selectClient.js

let Generic;
let FM3;
let EMC;

function initClient() {
	Generic = new ClientGeneric();
	Binder = new ClientBinder();
	EMC = new ClientEMC();
	Ragnar = new ClientRagnar();
	ClientManager.selectClient(Generic);
}


function clientChange() {
	let c = getClient();
	switch (c) {
		case value.Binder:
		ClientManager.selectClient(Binder);
		break;
		case value.EMC:
		ClientManager.selectClient(EMC);
		break;
		case value.Ragnar:
		ClientManager.selectClient(Ragnar);
		break;
		default:
		ClientManager.selectClient(Generic);
		break;
	}
}
