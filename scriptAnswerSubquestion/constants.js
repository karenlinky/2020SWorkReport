//constant.js

const DropDownClient = document.getElementById("client");
const Output = document.getElementById("textOutput");
const TextSubquestion = document.getElementById("textSubquestion");
const TextArrayProbe = document.getElementById("textArrayProbe");
const EMCFavorability = document.getElementById("EMCFavorability");



const value = {
	none: "none",
	ALG: "ALG",
	Binder: "Binder",
	DFM: "DFM",
	EMC: "EMC",
	FM3: "FM3",
	GSG: "GSG",
	Lake: "Lake",
	McL: "McL",
	Ragnar: "Ragnar",
	Tarrance: "Tarrance",
	yes: "Y",
	no: "N"
}


const type = {
	answer: "answer",
	subquestion: "subquestion",
}

const probeForSubquestions = "probeInputSection";
const EMCFavor = "EMCFavorability";

const OLType = {
	basic: "basic",
	arrayWithProbe: "arrayWithProbe",
	EMCFav: "EMCFav"
}

let Warnings = new WarningList();
