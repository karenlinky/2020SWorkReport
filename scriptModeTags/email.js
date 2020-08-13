// email.js

class Email extends Mode{
	constructor(Option) {
		super (Option);
	}

	getOutput(showTags) {
		return showTags ? "<e-o>" + this.Option.getOutput() + "</e-o>" : this.Option.getOutput();
	}
}
