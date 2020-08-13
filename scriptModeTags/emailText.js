// emailText.js

class EmailText extends Mode{
	constructor(Option) {
		super (Option);
	}

	getOutput(showTags) {
		return showTags ? "<e-t>" + this.Option.getOutput() + "</e-t>" : this.Option.getOutput();
	}
}
